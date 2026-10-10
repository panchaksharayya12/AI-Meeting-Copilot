import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { Meeting, ActionItem, Decision } from './types.js';
import { INITIAL_MEETINGS } from './utils/seedData.js';
import {
  isAIConfigured,
  transcribeAudioFile,
  analyzeMeetingTranscript,
  askMeetingIntelligence
} from './services/openaiService.js';
import { isSupabaseConfigured } from './services/supabaseService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25 MB
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// In-Memory Data Store (Initialized with Coherent Demo Data)
let meetingsStore: Meeting[] = JSON.parse(JSON.stringify(INITIAL_MEETINGS));

// --- ROUTES ---

/**
 * GET /api/health
 */
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    aiConfigured: isAIConfigured(),
    supabaseConfigured: isSupabaseConfigured(),
    totalMeetings: meetingsStore.length,
    nodeEnv: process.env.NODE_ENV || 'development'
  });
});

/**
 * POST /api/transcribe
 * Accepts audio file upload, returns transcript and segments
 */
app.post('/api/transcribe', upload.single('audio'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded.' });
    }

    const { transcript, segments } = await transcribeAudioFile(
      req.file.path,
      req.file.originalname
    );

    // Clean up temporary uploaded file if possible
    try {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (cleanupErr) {
      console.warn('Could not clean up temporary file:', cleanupErr);
    }

    return res.json({
      success: true,
      filename: req.file.originalname,
      transcript,
      segments
    });
  } catch (error: any) {
    console.error('Transcription error:', error);
    return res.status(500).json({
      error: 'Failed to transcribe audio',
      details: error.message || String(error)
    });
  }
});

/**
 * POST /api/analyze
 * Analyzes meeting transcript into summary, actions, decisions, risks, etc.
 */
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { transcript, title = 'Meeting Sync', participants = ['Team'] } = req.body;

    if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
      return res.status(400).json({ error: 'Transcript is required for analysis.' });
    }

    const analysis = await analyzeMeetingTranscript(transcript, title, participants);
    return res.json({
      success: true,
      analysis
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      error: 'Failed to analyze meeting transcript',
      details: error.message || String(error)
    });
  }
});

/**
 * GET /api/meetings
 * Returns all meetings
 */
app.get('/api/meetings', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: meetingsStore.length,
    meetings: meetingsStore
  });
});

/**
 * GET /api/meetings/:id
 */
app.get('/api/meetings/:id', (req: Request, res: Response) => {
  const meeting = meetingsStore.find(m => m.id === req.params.id);
  if (!meeting) {
    return res.status(404).json({ error: 'Meeting not found.' });
  }
  return res.json({
    success: true,
    meeting
  });
});

/**
 * POST /api/meetings
 * Creates and stores a new meeting
 */
app.post('/api/meetings', (req: Request, res: Response) => {
  try {
    const {
      title,
      date,
      duration,
      participants = [],
      transcript,
      segments = [],
      summary,
      keyPoints = [],
      decisions = [],
      actionItems = [],
      risks = [],
      questions = [],
      nextSteps = []
    } = req.body;

    if (!title || !transcript) {
      return res.status(400).json({ error: 'Meeting title and transcript are required.' });
    }

    const newMeetingId = `meet-${Date.now()}`;
    const meetingDate = date || new Date().toISOString().split('T')[0];

    // Format decisions with IDs & meetingId
    const formattedDecisions: Decision[] = decisions.map((d: any, idx: number) => ({
      id: d.id || `dec-${Date.now()}-${idx}`,
      meetingId: newMeetingId,
      meetingTitle: title,
      date: d.date || meetingDate,
      decision: d.decision,
      context: d.context || `Agreed during ${title}`,
      owner: d.owner || participants[0] || 'Team Lead',
      participants: d.participants || participants
    }));

    // Format action items with IDs & meetingId
    const formattedActions: ActionItem[] = actionItems.map((a: any, idx: number) => ({
      id: a.id || `act-${Date.now()}-${idx}`,
      meetingId: newMeetingId,
      meetingTitle: title,
      task: a.task,
      owner: a.owner || participants[0] || 'Team Lead',
      dueDate: a.dueDate || 'Friday',
      priority: a.priority || 'Medium',
      status: a.status || 'Open',
      createdAt: new Date().toISOString()
    }));

    const newMeeting: Meeting = {
      id: newMeetingId,
      title,
      date: meetingDate,
      duration: duration || '30 min',
      participants: Array.isArray(participants) ? participants : [participants],
      transcript,
      segments: Array.isArray(segments) && segments.length > 0 ? segments : [
        {
          id: `seg-${Date.now()}-1`,
          speaker: participants[0] || 'Speaker',
          timestamp: '00:00',
          text: transcript.slice(0, 300)
        }
      ],
      summary: summary || 'Meeting recorded and summarized.',
      keyPoints,
      decisions: formattedDecisions,
      actionItems: formattedActions,
      risks,
      questions,
      nextSteps,
      createdAt: new Date().toISOString()
    };

    meetingsStore.unshift(newMeeting);

    return res.status(201).json({
      success: true,
      meeting: newMeeting
    });
  } catch (err: any) {
    console.error('Error creating meeting:', err);
    return res.status(500).json({ error: 'Failed to create meeting', details: err.message });
  }
});

/**
 * DELETE /api/meetings/:id
 */
app.delete('/api/meetings/:id', (req: Request, res: Response) => {
  const index = meetingsStore.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Meeting not found.' });
  }

  const deleted = meetingsStore.splice(index, 1)[0];
  return res.json({
    success: true,
    message: 'Meeting deleted successfully',
    deletedId: deleted.id
  });
});

/**
 * GET /api/actions
 * Returns all action items across all meetings
 */
app.get('/api/actions', (_req: Request, res: Response) => {
  const allActions = meetingsStore.flatMap(m =>
    m.actionItems.map(a => ({
      ...a,
      meetingTitle: a.meetingTitle || m.title
    }))
  );

  res.json({
    success: true,
    count: allActions.length,
    actions: allActions
  });
});

/**
 * PATCH /api/actions/:id
 * Updates action item status or owner
 */
app.patch('/api/actions/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, owner, priority, dueDate } = req.body;

  let foundAction: ActionItem | null = null;

  for (const m of meetingsStore) {
    const action = m.actionItems.find(a => a.id === id);
    if (action) {
      if (status !== undefined) action.status = status;
      if (owner !== undefined) action.owner = owner;
      if (priority !== undefined) action.priority = priority;
      if (dueDate !== undefined) action.dueDate = dueDate;
      foundAction = action;
      break;
    }
  }

  if (!foundAction) {
    return res.status(404).json({ error: 'Action item not found.' });
  }

  return res.json({
    success: true,
    action: foundAction
  });
});

/**
 * GET /api/decisions
 * Returns all decisions across meetings
 */
app.get('/api/decisions', (_req: Request, res: Response) => {
  const allDecisions = meetingsStore.flatMap(m =>
    m.decisions.map(d => ({
      ...d,
      meetingTitle: d.meetingTitle || m.title
    }))
  );

  res.json({
    success: true,
    count: allDecisions.length,
    decisions: allDecisions
  });
});

/**
 * POST /api/search
 * Search across meetings, transcripts, decisions, and action items
 */
app.post('/api/search', (req: Request, res: Response) => {
  const { query = '' } = req.body;
  const qLower = query.toLowerCase().trim();

  if (!qLower) {
    return res.json({
      query: '',
      totalMatches: meetingsStore.length,
      meetings: meetingsStore,
      matchedActions: [],
      matchedDecisions: []
    });
  }

  const matchedMeetings: Meeting[] = [];
  const matchedActions: ActionItem[] = [];
  const matchedDecisions: Decision[] = [];

  meetingsStore.forEach(m => {
    const titleMatch = m.title.toLowerCase().includes(qLower);
    const transcriptMatch = m.transcript.toLowerCase().includes(qLower);
    const summaryMatch = m.summary.toLowerCase().includes(qLower);
    const participantMatch = m.participants.some(p => p.toLowerCase().includes(qLower));

    const actionsInMeeting = m.actionItems.filter(a =>
      a.task.toLowerCase().includes(qLower) ||
      a.owner.toLowerCase().includes(qLower)
    );

    const decisionsInMeeting = m.decisions.filter(d =>
      d.decision.toLowerCase().includes(qLower) ||
      d.context.toLowerCase().includes(qLower) ||
      d.owner.toLowerCase().includes(qLower)
    );

    if (titleMatch || transcriptMatch || summaryMatch || participantMatch || actionsInMeeting.length > 0 || decisionsInMeeting.length > 0) {
      matchedMeetings.push(m);
    }

    matchedActions.push(...actionsInMeeting);
    matchedDecisions.push(...decisionsInMeeting);
  });

  return res.json({
    query,
    totalMatches: matchedMeetings.length + matchedActions.length + matchedDecisions.length,
    meetings: matchedMeetings,
    matchedActions,
    matchedDecisions
  });
});

/**
 * POST /api/ai/chat
 * Ask AI question across meetings
 */
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required.' });
    }

    const { answer, citedMeetings } = await askMeetingIntelligence(query, meetingsStore);

    return res.json({
      success: true,
      query,
      answer,
      citedMeetings,
      isDemoIntelligence: !isAIConfigured()
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: 'Failed to process AI chat query',
      details: error.message || String(error)
    });
  }
});

/**
 * POST /api/report
 * Returns full structured report object for PDF rendering or download
 */
app.post('/api/report', (req: Request, res: Response) => {
  const { meetingId } = req.body;
  const meeting = meetingsStore.find(m => m.id === meetingId);

  if (!meeting) {
    return res.status(404).json({ error: 'Meeting not found for report generation.' });
  }

  res.json({
    success: true,
    report: {
      title: meeting.title,
      date: meeting.date,
      duration: meeting.duration,
      participants: meeting.participants,
      summary: meeting.summary,
      keyPoints: meeting.keyPoints,
      decisions: meeting.decisions,
      actionItems: meeting.actionItems,
      risks: meeting.risks,
      questions: meeting.questions,
      nextSteps: meeting.nextSteps,
      exportedAt: new Date().toISOString()
    }
  });
});

/**
 * POST /api/reset-demo
 * Restores initial coherent demo workspace
 */
app.post('/api/reset-demo', (_req: Request, res: Response) => {
  meetingsStore = JSON.parse(JSON.stringify(INITIAL_MEETINGS));
  res.json({
    success: true,
    message: 'Demo workspace reset to initial state',
    count: meetingsStore.length
  });
});

// Start Express Server (when not running in Vercel Serverless environment)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 AI Meeting Copilot API Server`);
    console.log(`📡 Running on http://localhost:${PORT}`);
    console.log(`🤖 OpenAI: ${isAIConfigured() ? 'Active (API Key loaded)' : 'Local Fallback / Demo Intelligence'}`);
    console.log(`🗄️  Supabase: ${isSupabaseConfigured() ? 'Connected' : 'In-Memory / Local Storage Fallback'}`);
    console.log(`===============================================`);
  });
}

export default app;
export { app };
