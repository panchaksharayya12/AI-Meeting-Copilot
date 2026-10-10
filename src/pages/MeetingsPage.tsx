import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  Scale,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { fetchMeetings } from '../lib/api';
import { Meeting } from '../types';
import { CreateMeetingModal } from '../components/meetings/CreateMeetingModal';

export const MeetingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<'All' | 'Today' | 'This Week' | 'This Month'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeetings().then((data) => {
      setMeetings(data);
      setLoading(false);
    });
  }, []);

  const filteredMeetings = meetings.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.participants.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (timeFilter === 'Today') {
      const today = new Date().toISOString().split('T')[0];
      return m.date === today;
    }
    // Simple filter tags demonstration
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Create Meeting Modal */}
      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMeetingCreated={(id) => {
          setIsModalOpen(false);
          navigate(`/app/meetings/${id}`);
        }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Meetings
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-light">
            Searchable organizational archive and meeting intelligence history.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white text-black font-medium text-xs flex items-center gap-2 hover:bg-gray-200 transition-all cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          New Meeting
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search meetings by title, participant, or discussion topics..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111215] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#111215] border border-white/10">
          {(['All', 'Today', 'This Week', 'This Month'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                timeFilter === filter
                  ? 'bg-white text-black shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Meetings Grid / List */}
      <div className="space-y-4">
        {filteredMeetings.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-white/10 bg-[#111215]/40">
            <Calendar className="w-8 h-8 text-gray-500 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-white">No meetings found</h3>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search query or start a new recording.
            </p>
          </div>
        ) : (
          filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              onClick={() => navigate(`/app/meetings/${meeting.id}`)}
              className="copilot-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer group bg-[#111215]/80"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-medium text-white group-hover:text-gray-200 transition-colors">
                      {meeting.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {meeting.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {meeting.duration}
                    </span>
                    <span>•</span>
                    <span>Participants: {meeting.participants.join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-400 self-end sm:self-auto">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {meeting.actionItems.length} Actions
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                    <Scale className="w-3.5 h-3.5 text-white" />
                    {meeting.decisions.length} Decisions
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 mt-3 font-light leading-relaxed">
                {meeting.summary}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
