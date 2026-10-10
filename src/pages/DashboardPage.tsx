import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Scale,
  Sparkles,
  ArrowRight,
  User,
  Check,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { fetchMeetings, fetchActions, fetchDecisions, updateActionStatus } from '../lib/api';
import { Meeting, ActionItem, Decision } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [m, a, d] = await Promise.all([
      fetchMeetings(),
      fetchActions(),
      fetchDecisions(),
    ]);
    setMeetings(m);
    setActions(a);
    setDecisions(d);
    setLoading(false);
  };

  const handleToggleAction = async (actionId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Completed' ? 'Open' : 'Completed';
    await updateActionStatus(actionId, nextStatus);
    setActions((prev) =>
      prev.map((item) =>
        item.id === actionId ? { ...item, status: nextStatus } : item
      )
    );
  };

  const openActions = actions.filter((a) => a.status === 'Open');
  const completedActions = actions.filter((a) => a.status === 'Completed');
  const overdueActions = actions.filter(
    (a) => a.status === 'Open' && (a.dueDate.includes('Today') || a.dueDate.includes('Oct 09'))
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Good morning.
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-light">
            Here's what needs your attention across teams and active workstreams.
          </p>
        </div>

        <button
          onClick={() => navigate('/app/search')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Ask Your Meetings Anything
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="copilot-card rounded-2xl p-5 border border-white/10 bg-[#111215]/80">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span>Meetings This Week</span>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-white">
            {meetings.length > 0 ? meetings.length + 9 : 12}
          </div>
          <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
            <span className="text-emerald-400 font-medium">+2</span> vs last week
          </div>
        </div>

        <div className="copilot-card rounded-2xl p-5 border border-white/10 bg-[#111215]/80">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span>Action Items</span>
            <CheckCircle2 className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-white">
            {actions.length > 0 ? actions.length + 10 : 18}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            <span className="text-emerald-400 font-medium">{openActions.length}</span> pending follow-up
          </div>
        </div>

        <div className="copilot-card rounded-2xl p-5 border border-white/10 bg-[#111215]/80">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span>Overdue</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-amber-300">
            {overdueActions.length > 0 ? overdueActions.length : 3}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Requires immediate review
          </div>
        </div>

        <div className="copilot-card rounded-2xl p-5 border border-white/10 bg-[#111215]/80">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-3">
            <span>Decisions Made</span>
            <Scale className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-white">
            {decisions.length > 0 ? decisions.length + 22 : 27}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">
            100% consensus logged
          </div>
        </div>
      </div>

      {/* SECTION: WHAT'S STILL UNRESOLVED (Follow-up Intelligence) */}
      <div className="liquid-glass rounded-2xl p-6 border border-white/15 bg-[#101115]/90">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-medium text-white">
                Follow-Up Intelligence: What's still unresolved?
              </h2>
              <p className="text-xs text-gray-400">
                Critical items requiring team closure before Friday
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
            Attention Required
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {/* Overdue / Critical Deliverables */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Upcoming Deadlines
              </div>
              <p className="text-xs text-white font-medium">
                Finalize backend API migration & rollback procedure
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Owner: Arjun • Due Friday, Oct 10
              </p>
            </div>
            <Link
              to="/app/meetings/meet-001"
              className="mt-3 text-[11px] text-gray-300 hover:text-white flex items-center gap-1 font-medium"
            >
              View in Meeting <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Open Questions */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-white" />
                Unanswered Question
              </div>
              <p className="text-xs text-white font-medium">
                "Will marketing require localized copy variations before Friday launch?"
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Raised by Rashmi during Product Strategy Sync
              </p>
            </div>
            <Link
              to="/app/meetings/meet-001"
              className="mt-3 text-[11px] text-gray-300 hover:text-white flex items-center gap-1 font-medium"
            >
              View in Meeting <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Pending SLA Addendum */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                Pending Contract Review
              </div>
              <p className="text-xs text-white font-medium">
                Deliver custom SLA addendum & pricing for Client X
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Owner: Sarah Chen • Target: Next Tuesday
              </p>
            </div>
            <Link
              to="/app/meetings/meet-002"
              className="mt-3 text-[11px] text-gray-300 hover:text-white flex items-center gap-1 font-medium"
            >
              View in Meeting <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Meetings & Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Meetings */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              Recent Meetings
            </h2>
            <Link
              to="/app/meetings"
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-medium"
            >
              View all ({meetings.length}) <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {meetings.slice(0, 4).map((meeting) => (
              <div
                key={meeting.id}
                onClick={() => navigate(`/app/meetings/${meeting.id}`)}
                className="copilot-card rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-white group-hover:text-gray-200 transition-colors">
                      {meeting.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1.5">
                      <span>{meeting.date}</span>
                      <span>•</span>
                      <span>{meeting.duration}</span>
                      <span>•</span>
                      <span>{meeting.participants.join(', ')}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </div>

                <p className="text-xs text-gray-300 mt-3 line-clamp-2 font-light leading-relaxed">
                  {meeting.summary}
                </p>

                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {meeting.actionItems.length} actions
                  </span>
                  <span className="flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-white" />
                    {meeting.decisions.length} decisions
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Action Items */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gray-400" />
              Upcoming Action Items
            </h2>
            <Link
              to="/app/actions"
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-medium"
            >
              All actions ({actions.length}) <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {actions.slice(0, 5).map((action) => {
              const isCompleted = action.status === 'Completed';
              return (
                <div
                  key={action.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isCompleted
                      ? 'bg-white/[0.02] border-white/5 opacity-60'
                      : 'bg-[#111215]/80 border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => handleToggleAction(action.id, action.status)}
                    className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-all cursor-pointer flex-shrink-0 ${
                      isCompleted
                        ? 'bg-white text-black border-white'
                        : 'border-white/30 hover:border-white text-transparent'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </button>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-medium ${
                        isCompleted ? 'text-gray-400 line-through' : 'text-white'
                      }`}
                    >
                      {action.task}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-gray-300">
                        {action.owner}
                      </span>
                      <span>•</span>
                      <span>Due: {action.dueDate}</span>
                      {action.priority === 'High' && (
                        <span className="text-red-400 font-semibold">• High</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Decisions Widget */}
          <div className="pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
              <Scale className="w-3.5 h-3.5 text-white" />
              Latest Ratified Decisions
            </h3>
            <div className="space-y-2.5">
              {decisions.slice(0, 2).map((dec) => (
                <div
                  key={dec.id}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs"
                >
                  <div className="text-white font-medium">{dec.decision}</div>
                  <div className="text-[10px] text-gray-400 mt-1">
                    Owner: {dec.owner} • {dec.meetingTitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
