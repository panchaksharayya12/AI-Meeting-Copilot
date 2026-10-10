import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Users,
  Download,
  Trash2,
  Search,
  Sparkles,
  FileText,
  CheckCircle2,
  Scale,
  MessageSquare,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Send,
  User,
  Check,
} from 'lucide-react';
import { fetchMeetingById, deleteMeeting, updateActionStatus, askAIChat } from '../lib/api';
import { Meeting, ActionItem, Decision, TranscriptSegment } from '../types';
import { exportMeetingPDF } from '../utils/pdfExport';

export const MeetingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'actions' | 'decisions' | 'chat'>('overview');
  const [transcriptSearch, setTranscriptSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // In-meeting AI chat state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<
    { role: 'user' | 'assistant'; content: string; cited?: any[] }[]
  >([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchMeetingById(id).then((m) => {
        setMeeting(m);
        setLoading(false);
        // Default initial assistant greeting
        if (m) {
          setChatMessages([
            {
              role: 'assistant',
              content: `Hello! I have fully processed "${m.title}". Ask me about decisions made, action item owners, deadlines, or risks.`,
            },
          ]);
        }
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-xs text-gray-400">
        Loading meeting intelligence...
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="p-8 text-center rounded-2xl border border-white/10 bg-[#111215]/60 max-w-xl mx-auto">
        <h2 className="text-base font-medium text-white">Meeting Not Found</h2>
        <p className="text-xs text-gray-400 mt-2">
          The requested meeting could not be retrieved or was deleted.
        </p>
        <button
          onClick={() => navigate('/app/meetings')}
          className="mt-4 px-4 py-2 rounded-xl bg-white text-black text-xs font-medium cursor-pointer"
        >
          Return to Meetings
        </button>
      </div>
    );
  }

  const handleDeleteMeeting = async () => {
    if (confirm(`Are you sure you want to delete "${meeting.title}"?`)) {
      await deleteMeeting(meeting.id);
      navigate('/app/meetings');
    }
  };

  const handleExportPDF = () => {
    exportMeetingPDF(meeting);
  };

  const handleToggleAction = async (actionId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Completed' ? 'Open' : 'Completed';
    await updateActionStatus(actionId, nextStatus);
    setMeeting((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        actionItems: prev.actionItems.map((a) =>
          a.id === actionId ? { ...a, status: nextStatus } : a
        ),
      };
    });
  };

  const handleSendChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userText = chatInput;
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setIsChatLoading(true);

    try {
      const response = await askAIChat(userText);
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.answer,
          cited: response.citedMeetings,
        },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error answering your question. Please try again.',
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const filteredSegments = meeting.segments.filter(
    (s) =>
      s.text.toLowerCase().includes(transcriptSearch.toLowerCase()) ||
      s.speaker.toLowerCase().includes(transcriptSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Back & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <button
          onClick={() => navigate('/app/meetings')}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all meetings
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportPDF}
            className="px-3.5 py-2 rounded-xl bg-white text-black font-medium text-xs flex items-center gap-2 hover:bg-gray-200 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Export Meeting Report (PDF)
          </button>

          <button
            onClick={handleDeleteMeeting}
            className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer border border-transparent hover:border-red-500/20"
            title="Delete Meeting"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Meeting Header Banner */}
      <div className="liquid-glass rounded-2xl p-6 border border-white/10 bg-[#111215]/80">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
              ANALYZED INTELLIGENCE
            </span>
            <h1 className="text-xl sm:text-2xl font-medium text-white tracking-tight mt-2">
              {meeting.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-2 font-light">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {meeting.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {meeting.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                {meeting.participants.join(', ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
              {meeting.actionItems.length} Actions
            </span>
            <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
              {meeting.decisions.length} Decisions
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-white/10 flex gap-1 sm:gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-4 text-xs font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-white text-white'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Overview
        </button>

        <button
          onClick={() => setActiveTab('transcript')}
          className={`pb-3 px-4 text-xs font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'transcript'
              ? 'border-white text-white'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Transcript ({meeting.segments.length})
        </button>

        <button
          onClick={() => setActiveTab('actions')}
          className={`pb-3 px-4 text-xs font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'actions'
              ? 'border-white text-white'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Actions ({meeting.actionItems.length})
        </button>

        <button
          onClick={() => setActiveTab('decisions')}
          className={`pb-3 px-4 text-xs font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'decisions'
              ? 'border-white text-white'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          Decisions ({meeting.decisions.length})
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`pb-3 px-4 text-xs font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'chat'
              ? 'border-white text-white'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          AI Meeting Chat
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          {/* Left Column: Summary & Key Points */}
          <div className="lg:col-span-8 space-y-6">
            {/* Executive Summary */}
            <div className="copilot-card rounded-2xl p-6 border border-white/10 bg-[#111215]/80">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                Executive Summary
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed font-light">
                {meeting.summary}
              </p>
            </div>

            {/* Key Discussion Points */}
            <div className="copilot-card rounded-2xl p-6 border border-white/10 bg-[#111215]/80">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Key Discussion Points
              </h3>
              <div className="space-y-3">
                {meeting.keyPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300 leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="text-white font-medium">•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            {meeting.nextSteps && meeting.nextSteps.length > 0 && (
              <div className="copilot-card rounded-2xl p-6 border border-white/10 bg-[#111215]/80">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                  Next Steps & Milestones
                </h3>
                <div className="space-y-2">
                  {meeting.nextSteps.map((step, i) => (
                    <div
                      key={i}
                      className="text-xs text-gray-300 flex items-center gap-2"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Risks & Questions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Risks / Concerns */}
            <div className="copilot-card rounded-2xl p-6 border border-white/10 bg-[#111215]/80">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5" />
                Risks & Concerns Flagged
              </h3>
              <div className="space-y-2.5">
                {meeting.risks && meeting.risks.length > 0 ? (
                  meeting.risks.map((risk, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed"
                    >
                      {risk}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">No high-severity risks detected.</p>
                )}
              </div>
            </div>

            {/* Open Questions */}
            <div className="copilot-card rounded-2xl p-6 border border-white/10 bg-[#111215]/80">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-white" />
                Unresolved Questions
              </h3>
              <div className="space-y-2.5">
                {meeting.questions && meeting.questions.length > 0 ? (
                  meeting.questions.map((q, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300 leading-relaxed"
                    >
                      {q}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">All questions addressed during call.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRANSCRIPT */}
      {activeTab === 'transcript' && (
        <div className="space-y-4 animate-fade-in">
          {/* Search within transcript */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={transcriptSearch}
              onChange={(e) => setTranscriptSearch(e.target.value)}
              placeholder="Search phrases or speakers within transcript..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111215] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="space-y-3 font-mono text-xs sm:text-sm">
            {filteredSegments.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-xs">
                No matching lines in transcript.
              </div>
            ) : (
              filteredSegments.map((seg) => (
                <div
                  key={seg.id}
                  className={`p-4 rounded-xl border transition-all ${
                    seg.highlighted
                      ? 'bg-white/[0.06] border-white/20'
                      : 'bg-[#111215]/80 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-gray-500 text-xs">[{seg.timestamp}]</span>
                    <span
                      className={`text-xs font-semibold ${
                        seg.highlighted ? 'text-emerald-400' : 'text-white'
                      }`}
                    >
                      {seg.speaker}
                    </span>
                    {seg.highlighted && (
                      <span className="text-[10px] uppercase font-sans tracking-wide px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                        Key Commitment
                      </span>
                    )}
                  </div>
                  <p className="text-gray-200 font-sans text-xs sm:text-sm leading-relaxed pl-14">
                    "{seg.text}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ACTION ITEMS */}
      {activeTab === 'actions' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 gap-3">
            {meeting.actionItems.map((action) => {
              const isCompleted = action.status === 'Completed';
              return (
                <div
                  key={action.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                    isCompleted
                      ? 'bg-white/[0.02] border-white/5 opacity-60'
                      : 'bg-[#111215]/80 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleAction(action.id, action.status)}
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-all cursor-pointer flex-shrink-0 ${
                        isCompleted
                          ? 'bg-white text-black border-white'
                          : 'border-white/30 hover:border-white text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div>
                      <h4
                        className={`text-sm font-medium ${
                          isCompleted ? 'text-gray-400 line-through' : 'text-white'
                        }`}
                      >
                        {action.task}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-400 mt-1.5">
                        <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-medium">
                          Owner: {action.owner}
                        </span>
                        <span>•</span>
                        <span>Due: {action.dueDate}</span>
                        <span>•</span>
                        <span
                          className={
                            action.priority === 'High' ? 'text-red-400 font-semibold' : 'text-gray-400'
                          }
                        >
                          Priority: {action.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] px-2.5 py-1 rounded-full font-mono uppercase ${
                      isCompleted
                        ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                        : 'bg-white/5 text-gray-300 border border-white/10'
                    }`}
                  >
                    {action.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: DECISIONS */}
      {activeTab === 'decisions' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 gap-4">
            {meeting.decisions.map((dec) => (
              <div
                key={dec.id}
                className="p-5 rounded-2xl bg-[#111215]/80 border border-white/10 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" />
                    RATIFIED DECISION
                  </span>
                  <span className="text-xs text-gray-400">Owner: {dec.owner}</span>
                </div>
                <h4 className="text-base font-medium text-white">{dec.decision}</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Context: {dec.context}
                </p>
                <div className="pt-2 text-[11px] text-gray-500 font-mono">
                  Recorded Date: {dec.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AI MEETING CHAT */}
      {activeTab === 'chat' && (
        <div className="copilot-card rounded-2xl border border-white/10 bg-[#111215]/90 overflow-hidden flex flex-col h-[520px] animate-fade-in">
          {/* Chat Messages */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 text-xs leading-relaxed ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-xl whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-white text-black font-medium'
                      : 'bg-white/[0.04] border border-white/10 text-gray-200 font-light'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex gap-3 text-xs text-gray-400 items-center">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <span>Analyzing meeting context...</span>
              </div>
            )}
          </div>

          {/* Quick Query Suggestions */}
          <div className="px-5 py-2.5 border-t border-white/5 flex gap-2 overflow-x-auto text-[11px] text-gray-400 bg-black/40">
            <span className="text-gray-500 shrink-0">Try asking:</span>
            <button
              onClick={() => {
                setChatInput('Who owns the API migration?');
              }}
              className="hover:text-white underline cursor-pointer shrink-0"
            >
              "Who owns the API migration?"
            </button>
            <button
              onClick={() => {
                setChatInput('What decisions were approved?');
              }}
              className="hover:text-white underline cursor-pointer shrink-0"
            >
              "What decisions were approved?"
            </button>
            <button
              onClick={() => {
                setChatInput('What are the risks flagged?');
              }}
              className="hover:text-white underline cursor-pointer shrink-0"
            >
              "What are the risks flagged?"
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSendChat}
            className="p-3.5 border-t border-white/10 flex items-center gap-2 bg-[#0d0e12]"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Ask anything about "${meeting.title}"...`}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
            />
            <button
              type="submit"
              disabled={isChatLoading || !chatInput.trim()}
              className="p-2.5 rounded-xl bg-white text-black hover:bg-gray-200 disabled:opacity-50 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
