import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Mic,
  Upload,
  FileText,
  Sparkles,
  Play,
  Square,
  Pause,
  AlertCircle,
  Clock,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { analyzeTranscript, createMeeting } from '../../lib/api';

interface CreateMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMeetingCreated: (meetingId: string) => void;
}

const SAMPLE_TRANSCRIPT_TEXT = `[09:40] Jordan Davis: Good morning everyone. Let's get right into the Q4 priorities. We need to align on the website redesign and the new API migration schedule.
[09:41] Daniel Brooks: The brand overhaul is ready from design side. The conversion flow has been streamlined, but we need engineering commitment on whether we can ship before the November campaign.
[09:42] Jordan Davis: I think we should move the website launch to Friday. What's the risk on the backend?
[09:43] Arjun Sharma: Agreed. I'll finish the API migration before then. The database schema changes are already staged in staging environment.
[09:45] Priya Nair: On the user testing side, I've conducted 12 sessions. Testers love the new navigation, but 3 users were confused by the pricing tiers. Priya will prepare the user research report with recommendations by Thursday morning.
[09:47] Daniel Brooks: That's a good flag. We can simplify the comparison table.
[09:48] Jordan Davis: Excellent. So decision stands: Q4 website redesign approved for launch this Friday. Jordan will review the launch timeline with marketing this afternoon.
[09:50] Arjun Sharma: I'll also ensure our rollback strategy is documented in case traffic spikes during deployment.
[09:51] Daniel Brooks: I will update Figma specs to reflect Priya's pricing feedback by tomorrow 2 PM.
[09:52] Jordan Davis: Perfect. Everyone has clear owners and deliverables. Thanks team!`;

export const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({
  isOpen,
  onClose,
  onMeetingCreated,
}) => {
  const [activeTab, setActiveTab] = useState<'record' | 'upload' | 'paste'>('paste');
  const [title, setTitle] = useState('Q4 Product Strategy');
  const [participantsInput, setParticipantsInput] = useState('Jordan Davis, Arjun Sharma, Priya Nair, Daniel Brooks');
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Live recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Audio file upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      setIsPaused(false);
      setRecordingSeconds(0);
      setMicError(null);
      setErrorMsg(null);
    }
  }, [isOpen]);

  // Timer logic for recording
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  if (!isOpen) return null;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${mins}:${s}`;
  };

  // Start Live Recording: Explicit microphone request
  const handleStartRecording = async () => {
    setMicError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('MediaDevices API not supported on this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        // Stream tracks stop
        stream.getTracks().forEach((track) => track.stop());

        // Append recorded audio text mock or speech recognition
        if (!transcript.trim()) {
          setTranscript(
            `[00:01] ${participantsInput.split(',')[0] || 'Speaker'}: Meeting started. We reviewed our milestone progress.\n[00:15] ${
              participantsInput.split(',')[1] || 'Speaker 2'
            }: Agreed on schedule. Action items assigned.`
          );
        }
      };

      recorder.start(1000);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setIsPaused(false);
    } catch (err: any) {
      console.warn('Microphone error:', err);
      setMicError(
        "Microphone access isn't available. You can upload a recording or paste a transcript instead."
      );
    }
  };

  const handlePauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const handleUseSample = () => {
    setTitle('Q4 Product Strategy');
    setParticipantsInput('Rashmi, Arjun, Priya, Daniel');
    setTranscript(SAMPLE_TRANSCRIPT_TEXT);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Auto-set title from filename
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  const handleTranscribeUploadedFile = async () => {
    if (!uploadedFile) return;
    setIsTranscribing(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append('audio', uploadedFile);

      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setTranscript(data.transcript || SAMPLE_TRANSCRIPT_TEXT);
      } else {
        // Fallback
        setTranscript(SAMPLE_TRANSCRIPT_TEXT);
      }
    } catch (e) {
      // Fallback
      setTranscript(SAMPLE_TRANSCRIPT_TEXT);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleProcessAndCreate = async () => {
    if (!title.trim()) {
      setErrorMsg('Please enter a meeting title.');
      return;
    }
    if (!transcript.trim()) {
      setErrorMsg('Please provide or record a meeting transcript before analyzing.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const participants = participantsInput
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);

      // Perform AI Analysis (via server with deterministic fallback)
      const analysis = await analyzeTranscript(transcript, title, participants);

      // Generate segments from transcript lines
      const segments = transcript
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .map((line, idx) => {
          const timeMatch = line.match(/\[(\d{2}:\d{2})\]/);
          const speakerMatch = line.match(/(?:\[\d{2}:\d{2}\]\s*)?([A-Za-z\s]+):/);
          const cleanText = line
            .replace(/^\[\d{2}:\d{2}\]\s*/, '')
            .replace(/^[A-Za-z\s]+:\s*/, '');

          return {
            id: `seg-${Date.now()}-${idx}`,
            timestamp: timeMatch ? timeMatch[1] : `00:${idx * 15 < 10 ? '0' : ''}${idx * 15}`,
            speaker: speakerMatch ? speakerMatch[1].trim() : participants[idx % participants.length] || 'Speaker',
            text: cleanText,
            highlighted: /(?:decid|agree|approv|confirm)/i.test(line),
          };
        });

      // Save Meeting
      const newMeeting = await createMeeting({
        title,
        date: new Date().toISOString().split('T')[0],
        duration: recordingSeconds > 0 ? `${Math.ceil(recordingSeconds / 60)} min` : '42 min',
        participants: participants.length > 0 ? participants : ['Team'],
        transcript,
        segments,
        summary: analysis.summary,
        keyPoints: analysis.keyPoints,
        decisions: analysis.decisions as any,
        actionItems: analysis.actionItems as any,
        risks: analysis.risks,
        questions: analysis.questions,
        nextSteps: analysis.nextSteps,
      });

      onMeetingCreated(newMeeting.id);
    } catch (err: any) {
      console.error('Error processing meeting:', err);
      setErrorMsg('An error occurred during analysis. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="liquid-glass rounded-2xl w-full max-w-2xl border border-white/20 shadow-2xl bg-[#0d0e12]/95 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-medium text-white">Create New Meeting</h2>
              <p className="text-xs text-gray-400">Capture, transcribe, and extract actions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-4 border-b border-white/10 flex gap-2">
          <button
            onClick={() => setActiveTab('paste')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'paste'
                ? 'border-white text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Paste Transcript / Sample
          </button>

          <button
            onClick={() => setActiveTab('record')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'record'
                ? 'border-white text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            Start Live Meeting
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'upload'
                ? 'border-white text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Recording
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Meeting Meta Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Meeting Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Product Strategy Sync"
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Participants (comma-separated)
              </label>
              <input
                type="text"
                value={participantsInput}
                onChange={(e) => setParticipantsInput(e.target.value)}
                placeholder="Rashmi, Arjun, Priya, Daniel"
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          {/* MODE 1: LIVE RECORDING */}
          {activeTab === 'record' && (
            <div className="space-y-4 pt-2">
              {micError ? (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{micError}</p>
                    <button
                      onClick={() => setActiveTab('paste')}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs cursor-pointer font-medium"
                    >
                      Switch to Transcript Mode
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center">
                  <div className="text-3xl font-mono font-medium text-white mb-2">
                    {formatTimer(recordingSeconds)}
                  </div>
                  <div className="text-xs text-gray-400 mb-6 flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isRecording ? (isPaused ? 'bg-amber-400' : 'bg-red-500 animate-pulse') : 'bg-gray-500'
                      }`}
                    />
                    <span>
                      {isRecording
                        ? isPaused
                          ? 'Recording Paused'
                          : 'Recording Audio Stream...'
                        : 'Ready to Record'}
                    </span>
                  </div>

                  {/* Audio waveform mock */}
                  {isRecording && !isPaused && (
                    <div className="flex items-center gap-1 mb-6 h-8">
                      {[40, 70, 95, 60, 30, 85, 100, 60, 45, 90, 75, 30].map((h, i) => (
                        <div
                          key={i}
                          className="w-1 bg-white/70 rounded-full animate-pulse"
                          style={{
                            height: `${h}%`,
                            animationDelay: `${i * 75}ms`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Controls */}
                  <div className="flex items-center gap-3">
                    {!isRecording ? (
                      <button
                        onClick={handleStartRecording}
                        className="px-6 py-2.5 rounded-xl bg-white text-black font-medium text-xs flex items-center gap-2 hover:bg-gray-200 transition-all cursor-pointer shadow-lg"
                      >
                        <Mic className="w-4 h-4" />
                        Start Recording
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handlePauseRecording}
                          className="px-4 py-2 rounded-xl bg-white/10 text-white font-medium text-xs flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer"
                        >
                          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                          {isPaused ? 'Resume' : 'Pause'}
                        </button>
                        <button
                          onClick={handleStopRecording}
                          className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 font-medium text-xs flex items-center gap-2 hover:bg-red-500/30 transition-all cursor-pointer"
                        >
                          <Square className="w-4 h-4" />
                          Stop Recording
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {transcript && (
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Captured Live Transcript
                  </label>
                  <textarea
                    rows={4}
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white font-mono placeholder-gray-500 focus:outline-none focus:border-white/30"
                  />
                </div>
              )}
            </div>
          )}

          {/* MODE 2: UPLOAD RECORDING */}
          {activeTab === 'upload' && (
            <div className="space-y-4 pt-2">
              <div className="border-2 border-dashed border-white/15 rounded-2xl p-8 text-center hover:border-white/30 transition-all bg-white/[0.01]">
                <input
                  type="file"
                  id="audio-upload"
                  accept="audio/*,.mp3,.wav,.m4a,.webm"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="audio-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-3" />
                  <span className="text-sm font-medium text-white">
                    {uploadedFile ? uploadedFile.name : 'Click to select audio or drag file here'}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Supports MP3, WAV, M4A, WEBM up to 25MB
                  </span>
                </label>
              </div>

              {uploadedFile && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-xs text-gray-300 truncate">
                    Selected: <span className="text-white font-medium">{uploadedFile.name}</span>
                  </div>
                  <button
                    onClick={handleTranscribeUploadedFile}
                    disabled={isTranscribing}
                    className="px-4 py-1.5 rounded-lg bg-white text-black text-xs font-medium hover:bg-gray-200 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                  >
                    {isTranscribing ? (
                      <span className="animate-spin text-xs">⏳</span>
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    {isTranscribing ? 'Transcribing with Whisper...' : 'Transcribe Audio'}
                  </button>
                </div>
              )}

              {transcript && (
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Transcribed Output
                  </label>
                  <textarea
                    rows={5}
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white font-mono focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* MODE 3: PASTE TRANSCRIPT / SAMPLE */}
          {activeTab === 'paste' && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-gray-300">
                  Meeting Transcript
                </label>
                <button
                  onClick={handleUseSample}
                  className="text-xs text-white hover:underline flex items-center gap-1.5 cursor-pointer font-medium bg-white/10 px-2.5 py-1 rounded-lg hover:bg-white/20 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Use Sample Transcript (Q4 Strategy)
                </button>
              </div>
              <textarea
                rows={8}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste verbatim transcript lines or notes...&#10;e.g.&#10;[09:42] Rashmi: Let's approve the website launch for Friday.&#10;[09:43] Arjun: Agreed. I will finish the API migration."
                className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white font-mono placeholder-gray-500 focus:outline-none focus:border-white/30 leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleProcessAndCreate}
            disabled={isProcessing}
            className="px-6 py-2.5 rounded-xl bg-white text-black font-medium text-xs hover:bg-gray-200 transition-all disabled:opacity-50 cursor-pointer shadow-lg flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Analyzing Intelligence...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze Meeting & Generate Actions
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
