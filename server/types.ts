export interface TranscriptSegment {
  id: string;
  speaker: string;
  timestamp: string; // e.g. "09:42"
  text: string;
  highlighted?: boolean;
}

export interface ActionItem {
  id: string;
  meetingId: string;
  meetingTitle?: string;
  task: string;
  owner: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Completed';
  createdAt: string;
}

export interface Decision {
  id: string;
  meetingId: string;
  meetingTitle?: string;
  date: string;
  decision: string;
  context: string;
  owner: string;
  participants?: string[];
}

export interface AIAnalysisResult {
  summary: string;
  keyPoints: string[];
  decisions: Omit<Decision, 'id' | 'meetingId'>[];
  actionItems: Omit<ActionItem, 'id' | 'meetingId' | 'createdAt'>[];
  risks: string[];
  questions: string[];
  nextSteps: string[];
  isDemoAnalysis?: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string; // e.g. "42 min"
  participants: string[];
  transcript: string;
  segments: TranscriptSegment[];
  summary: string;
  keyPoints: string[];
  decisions: Decision[];
  actionItems: ActionItem[];
  risks: string[];
  questions: string[];
  nextSteps: string[];
  createdAt: string;
}

export interface SearchResult {
  meetings: Meeting[];
  matchedActions: ActionItem[];
  matchedDecisions: Decision[];
  totalMatches: number;
}
