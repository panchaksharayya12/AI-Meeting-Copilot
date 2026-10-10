import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Send,
  Calendar,
  CheckCircle2,
  Scale,
  FileText,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { askAIChat, fetchMeetings } from '../lib/api';
import { Meeting } from '../types';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<{
    answer: string;
    citedMeetings: { id: string; title: string; date: string }[];
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [matchedMeetings, setMatchedMeetings] = useState<Meeting[]>([]);
  const [searched, setSearched] = useState(false);

  const sampleQueries = [
    'What did we agree on with Client X?',
    'Who owns the API migration?',
    'What did we decide about the website?',
    'What are my unresolved action items?',
    'Which meeting discussed the pricing change?',
  ];

  const handleExecuteSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setQuery(searchTerm);
    setIsSearching(true);
    setSearched(true);

    try {
      // 1. Fetch matching meetings
      const allMeetings = await fetchMeetings();
      const qLower = searchTerm.toLowerCase();

      const filtered = allMeetings.filter(
        (m) =>
          m.title.toLowerCase().includes(qLower) ||
          m.transcript.toLowerCase().includes(qLower) ||
          m.summary.toLowerCase().includes(qLower) ||
          m.actionItems.some(
            (a) =>
              a.task.toLowerCase().includes(qLower) ||
              a.owner.toLowerCase().includes(qLower)
          ) ||
          m.decisions.some(
            (d) =>
              d.decision.toLowerCase().includes(qLower) ||
              d.context.toLowerCase().includes(qLower)
          )
      );

      setMatchedMeetings(filtered.length > 0 ? filtered : allMeetings.slice(0, 1));

      // 2. Query AI Chat
      const aiResponse = await askAIChat(searchTerm);
      setAiAnswer(aiResponse);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1
          className="text-3xl sm:text-4xl font-medium text-white tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Ask Your Meetings Anything
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-2 font-light">
          Global semantic intelligence across transcripts, decisions, tasks, and historical consensus.
        </p>
      </div>

      {/* Main Search Input Form */}
      <div className="liquid-glass rounded-2xl p-2 border border-white/15 shadow-2xl bg-[#111215]/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleExecuteSearch(query);
          }}
          className="flex items-center gap-2"
        >
          <div className="pl-4 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask questions or search keywords (e.g. 'website', 'API', 'Client X')..."
            className="flex-1 py-3 px-2 bg-transparent text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="px-5 py-2.5 rounded-xl bg-white text-black font-medium text-xs hover:bg-gray-200 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            {isSearching ? (
              <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            Search
          </button>
        </form>
      </div>

      {/* Sample Quick Questions */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" />
          Try asking:
        </span>
        {sampleQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleExecuteSearch(q)}
            className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            "{q}"
          </button>
        ))}
      </div>

      {/* Results Area */}
      {searched && (
        <div className="space-y-6 animate-fade-in">
          {/* AI Response Card */}
          {aiAnswer && (
            <div className="copilot-card rounded-2xl p-6 border border-white/15 bg-[#121318]/90">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    AI Copilot Synthesis
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">
                  GROUNDED IN MEETINGS
                </span>
              </div>

              <div className="text-sm text-gray-100 font-light leading-relaxed whitespace-pre-line">
                {aiAnswer.answer}
              </div>

              {/* Cited Meetings Badges */}
              {aiAnswer.citedMeetings && aiAnswer.citedMeetings.length > 0 && (
                <div className="mt-5 pt-4 border-t border-white/10">
                  <span className="text-[11px] text-gray-400 uppercase tracking-wider block mb-2 font-medium">
                    Referenced Sources:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {aiAnswer.citedMeetings.map((source) => (
                      <button
                        key={source.id}
                        onClick={() => navigate(`/app/meetings/${source.id}`)}
                        className="text-xs px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{source.title}</span>
                        <span className="text-gray-500">({source.date})</span>
                        <ChevronRight className="w-3 h-3 text-gray-500 ml-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Matched Meetings Breakdown */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-white" />
              Matching Meetings ({matchedMeetings.length})
            </h3>
            <div className="space-y-3">
              {matchedMeetings.map((m) => (
                <div
                  key={m.id}
                  onClick={() => navigate(`/app/meetings/${m.id}`)}
                  className="p-5 rounded-2xl bg-[#111215]/80 border border-white/10 hover:border-white/20 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-sm font-medium text-white group-hover:text-gray-200">
                      {m.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1 font-light">
                      {m.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 shrink-0">
                    <span>{m.date}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
