import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { BarChart3, Clock, CheckCircle2, Scale, TrendingUp, Calendar } from 'lucide-react';
import { fetchMeetings, fetchActions, fetchDecisions } from '../lib/api';

export const AnalyticsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [meetingCount, setMeetingCount] = useState(3);
  const [actionCount, setActionCount] = useState(8);
  const [completedCount, setCompletedCount] = useState(4);
  const [decisionCount, setDecisionCount] = useState(5);

  useEffect(() => {
    Promise.all([fetchMeetings(), fetchActions(), fetchDecisions()]).then(
      ([meetings, actions, decisions]) => {
        setMeetingCount(meetings.length);
        setActionCount(actions.length);
        setCompletedCount(actions.filter((a) => a.status === 'Completed').length);
        setDecisionCount(decisions.length);
        setLoading(false);
      }
    );
  }, []);

  const weeklyMeetingData = [
    { week: 'W36', meetings: 8, durationAvg: 38 },
    { week: 'W37', meetings: 11, durationAvg: 41 },
    { week: 'W38', meetings: 9, durationAvg: 35 },
    { week: 'W39', meetings: 14, durationAvg: 44 },
    { week: 'W40', meetings: 12, durationAvg: 42 },
    { week: 'Current', meetings: meetingCount + 9, durationAvg: 40 },
  ];

  const actionTrendData = [
    { name: 'Mon', created: 4, completed: 3 },
    { name: 'Tue', created: 6, completed: 5 },
    { name: 'Wed', created: 5, completed: 4 },
    { name: 'Thu', created: 7, completed: 6 },
    { name: 'Fri', created: 4, completed: 5 },
  ];

  const completionRate =
    actionCount > 0 ? Math.round((completedCount / actionCount) * 100) : 58;

  const pieData = [
    { name: 'Completed', value: completedCount, color: '#34d399' },
    { name: 'Open', value: Math.max(1, actionCount - completedCount), color: '#374151' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1
          className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Meeting & Execution Analytics
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 font-light">
          Quantitative visibility into conversation load, deliverable completion, and decision velocity.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="copilot-card rounded-2xl p-5 border border-white/10 bg-[#111215]/80">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Avg Meeting Duration</span>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-white">41 min</div>
          <div className="text-[11px] text-emerald-400 mt-1">-4 min vs Q3 avg</div>
        </div>

        <div className="copilot-card rounded-2xl p-5 border border-white/10 bg-[#111215]/80">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Action Completion Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-white">
            {completionRate}%
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">
            {completedCount} of {actionCount} tasks executed
          </div>
        </div>

        <div className="copilot-card rounded-2xl p-5 border border-white/10 bg-[#111215]/80">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Decisions / Meeting</span>
            <Scale className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-white">
            {meetingCount > 0 ? (decisionCount / meetingCount).toFixed(1) : '2.3'}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">High operational clarity</div>
        </div>

        <div className="copilot-card rounded-2xl p-5 border border-white/10 bg-[#111215]/80">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <span>Weekly Meeting Volume</span>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-white">
            {meetingCount + 9}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">Across 4 departments</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Meetings Volume Bar Chart */}
        <div className="lg:col-span-8 copilot-card rounded-2xl p-6 border border-white/10 bg-[#111215]/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-medium text-white">Weekly Meetings Recorded</h3>
              <p className="text-xs text-gray-400">Total discussions logged by week</p>
            </div>
            <span className="text-xs font-mono text-gray-400">PAST 6 WEEKS</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyMeetingData}>
                <XAxis dataKey="week" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="meetings" fill="#ededed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Completion Ratio Donut */}
        <div className="lg:col-span-4 copilot-card rounded-2xl p-6 border border-white/10 bg-[#111215]/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-medium text-white mb-1">Task Resolution</h3>
            <p className="text-xs text-gray-400">Open vs completed action items</p>
          </div>

          <div className="h-48 w-full my-auto flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-around pt-4 border-t border-white/5 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-gray-300">Done ({completedCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
              <span className="text-gray-300">Open ({Math.max(0, actionCount - completedCount)})</span>
            </div>
          </div>
        </div>

        {/* Action Creation vs Completion Line Chart */}
        <div className="lg:col-span-12 copilot-card rounded-2xl p-6 border border-white/10 bg-[#111215]/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-medium text-white">Daily Execution Velocity</h3>
              <p className="text-xs text-gray-400">Action items assigned vs resolved across the sprint</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-white" />
                Created
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Completed
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={actionTrendData}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="created"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={{ fill: '#ffffff', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#34d399"
                  strokeWidth={2}
                  dot={{ fill: '#34d399', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
