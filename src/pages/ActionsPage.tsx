import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Search,
  Filter,
  Check,
  Plus,
  Trash2,
  Calendar,
  Clock,
  User,
  ChevronDown,
} from 'lucide-react';
import { fetchActions, updateActionStatus } from '../lib/api';
import { ActionItem } from '../types';

export const ActionsPage: React.FC = () => {
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'All' | 'Open' | 'Completed' | 'Overdue' | 'High Priority'>('All');
  const [newActionTask, setNewActionTask] = useState('');
  const [newActionOwner, setNewActionOwner] = useState('Jordan Davis');
  const [newActionDue, setNewActionDue] = useState('Friday');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActions().then((data) => {
      setActions(data);
      setLoading(false);
    });
  }, []);

  const handleToggle = async (id: string, currentStatus: 'Open' | 'Completed') => {
    const nextStatus = currentStatus === 'Completed' ? 'Open' : 'Completed';
    await updateActionStatus(id, nextStatus);
    setActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: nextStatus } : a))
    );
  };

  const handleDelete = (id: string) => {
    setActions((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTask.trim()) return;

    const newItem: ActionItem = {
      id: `act-${Date.now()}`,
      meetingId: 'meet-custom',
      meetingTitle: 'Standalone Task',
      task: newActionTask,
      owner: newActionOwner,
      dueDate: newActionDue,
      priority: 'Medium',
      status: 'Open',
      createdAt: new Date().toISOString(),
    };

    setActions((prev) => [newItem, ...prev]);
    setNewActionTask('');
    setShowAddForm(false);
  };

  const filteredActions = actions.filter((action) => {
    const matchesSearch =
      action.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      action.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (action.meetingTitle || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === 'Open') return action.status === 'Open';
    if (filterTab === 'Completed') return action.status === 'Completed';
    if (filterTab === 'High Priority') return action.priority === 'High';
    if (filterTab === 'Overdue') {
      return action.status === 'Open' && (action.dueDate.includes('Today') || action.dueDate.includes('Oct 09'));
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Action Items
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-light">
            All extracted tasks and owners across meetings with live delivery tracking.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white text-black font-medium text-xs flex items-center gap-2 hover:bg-gray-200 transition-all cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          Add Action Item
        </button>
      </div>

      {/* Quick Add Form Drawer */}
      {showAddForm && (
        <form
          onSubmit={handleAddAction}
          className="p-4 rounded-2xl bg-[#111215] border border-white/15 flex flex-wrap gap-3 items-end animate-fade-in"
        >
          <div className="flex-1 min-w-[240px]">
            <label className="block text-xs text-gray-400 mb-1">Task Description</label>
            <input
              type="text"
              value={newActionTask}
              onChange={(e) => setNewActionTask(e.target.value)}
              placeholder="e.g. Schedule design critique sync"
              className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div className="w-40">
            <label className="block text-xs text-gray-400 mb-1">Owner</label>
            <input
              type="text"
              value={newActionOwner}
              onChange={(e) => setNewActionOwner(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none"
            />
          </div>
          <div className="w-36">
            <label className="block text-xs text-gray-400 mb-1">Due Date</label>
            <input
              type="text"
              value={newActionDue}
              onChange={(e) => setNewActionDue(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-white text-black text-xs font-medium hover:bg-gray-200 cursor-pointer"
          >
            Create
          </button>
        </form>
      )}

      {/* Search & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, owners, or meeting source..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111215] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#111215] border border-white/10 overflow-x-auto">
          {(['All', 'Open', 'Completed', 'Overdue', 'High Priority'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                filterTab === tab
                  ? 'bg-white text-black shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Actions Table / List */}
      <div className="copilot-card rounded-2xl border border-white/10 bg-[#111215]/80 overflow-hidden">
        {filteredActions.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-500">
            No action items match the selected filter.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredActions.map((action) => {
              const isCompleted = action.status === 'Completed';
              return (
                <div
                  key={action.id}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-white/[0.02] ${
                    isCompleted ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <button
                      onClick={() => handleToggle(action.id, action.status)}
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-all cursor-pointer flex-shrink-0 ${
                        isCompleted
                          ? 'bg-white text-black border-white'
                          : 'border-white/30 hover:border-white text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div className="min-w-0">
                      <div
                        className={`text-sm font-medium ${
                          isCompleted ? 'line-through text-gray-400' : 'text-white'
                        }`}
                      >
                        {action.task}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-1.5">
                        {action.meetingId && (
                          <Link
                            to={`/app/meetings/${action.meetingId}`}
                            className="hover:underline text-gray-300"
                          >
                            {action.meetingTitle || 'Meeting'}
                          </Link>
                        )}
                        <span>•</span>
                        <span>Due: {action.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-medium">
                      {action.owner}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        action.priority === 'High'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {action.priority}
                    </span>

                    <button
                      onClick={() => handleDelete(action.id)}
                      className="p-1.5 text-gray-500 hover:text-red-400 cursor-pointer transition-colors"
                      title="Delete Task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
