import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Search, Calendar, User, ChevronRight, CheckCircle2 } from 'lucide-react';
import { fetchDecisions } from '../lib/api';
import { Decision } from '../types';

export const DecisionsPage: React.FC = () => {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDecisions().then((data) => {
      setDecisions(data);
      setLoading(false);
    });
  }, []);

  const filteredDecisions = decisions.filter(
    (d) =>
      d.decision.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.meetingTitle || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1
          className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Decisions
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 font-light">
          Audit trail of binding agreements, approvals, and strategic consensus ratified during meetings.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search decisions, owners, or contextual keywords..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111215] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
        />
      </div>

      {/* Decisions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDecisions.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-xs text-gray-500 rounded-2xl border border-white/10 bg-[#111215]/50">
            No decisions match your search criteria.
          </div>
        ) : (
          filteredDecisions.map((dec) => (
            <div
              key={dec.id}
              className="copilot-card rounded-2xl p-6 border border-white/10 bg-[#111215]/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                    RATIFIED CONSENSUS
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {dec.date}
                  </span>
                </div>

                <h3 className="text-base font-medium text-white mb-2 leading-snug">
                  {dec.decision}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed font-light mb-4">
                  <span className="text-gray-400 font-medium">Context: </span>
                  {dec.context}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-400">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span>
                    Decision Owner: <span className="text-white font-medium">{dec.owner}</span>
                  </span>
                </div>

                {dec.meetingId && (
                  <Link
                    to={`/app/meetings/${dec.meetingId}`}
                    className="text-xs text-gray-300 hover:text-white flex items-center gap-1 font-medium hover:underline"
                  >
                    Source Meeting <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
