import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Scale,
  Search,
  BarChart3,
  Settings,
  Plus,
  Bell,
  Menu,
  X,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Info,
} from 'lucide-react';
import { checkServerHealth, resetWorkspaceDemo } from '../../lib/api';
import { HealthStatus } from '../../types';
import { CreateMeetingModal } from '../meetings/CreateMeetingModal';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    checkServerHealth().then(setHealth);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { name: 'Meetings', path: '/app/meetings', icon: Calendar },
    { name: 'Action Items', path: '/app/actions', icon: CheckSquare },
    { name: 'Decisions', path: '/app/decisions', icon: Scale },
    { name: 'Search', path: '/app/search', icon: Search },
    { name: 'Analytics', path: '/app/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/app/settings', icon: Settings },
  ];

  const handleResetDemo = async () => {
    await resetWorkspaceDemo();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#08090a] text-[#ededed] flex flex-col md:flex-row font-sans">
      {/* Create Meeting Modal */}
      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMeetingCreated={(id) => {
          setIsModalOpen(false);
          navigate(`/app/meetings/${id}`);
        }}
      />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#0d0e12] shrink-0 p-4 justify-between h-screen sticky top-0">
        <div>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 px-3 py-3 mb-6 group">
            <span
              className="text-xl font-medium tracking-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Copilot<sup className="text-xs">®</sup>
            </span>
            <span className="text-xl select-none text-white/70 group-hover:text-white">
              ✳︎
            </span>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-gray-300 ml-auto">
              PRO
            </span>
          </Link>

          {/* New Meeting Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mb-6 py-2.5 px-4 rounded-xl bg-white text-black font-medium text-xs flex items-center justify-center gap-2 hover:bg-gray-200 transition-all cursor-pointer shadow-md hover:shadow-white/10"
          >
            <Plus className="w-4 h-4" />
            New Meeting
          </button>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/app'
                  ? location.pathname === '/app'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/10 shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom AI Status & Reset Demo */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px]">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    health?.aiConfigured ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                AI Engine
              </span>
              <span className="font-mono text-[10px]">
                {health?.aiConfigured ? 'OpenAI' : 'Demo Local'}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 leading-tight">
              {health?.aiConfigured
                ? 'Cloud neural analysis enabled'
                : 'Deterministic local parsing active'}
            </p>
          </div>

          <button
            onClick={handleResetDemo}
            className="w-full py-2 px-3 rounded-lg border border-white/10 text-[11px] text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            Reload Demo Data
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-[#08090a]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          {/* Left: Mobile hamburger & Search trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate('/app/search')}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all cursor-pointer w-48 sm:w-72"
            >
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span className="truncate">Search meetings & actions...</span>
              <kbd className="hidden sm:inline-block ml-auto text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400 font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: AI Badge, Notifications, New Meeting, Avatar */}
          <div className="flex items-center gap-3">
            {/* Status pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-gray-400">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  health?.aiConfigured ? 'bg-emerald-400' : 'bg-emerald-400/80'
                }`}
              />
              <span>
                {health?.aiConfigured
                  ? 'AI Provider: OpenAI Active'
                  : 'AI provider not configured — demo intelligence enabled'}
              </span>
            </div>

            {/* Quick New Meeting button on tablet */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex md:hidden items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-medium cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              New
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all relative focus:outline-none cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#111215] border border-white/15 p-4 shadow-2xl z-30 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-medium text-white">
                    <span>Notifications</span>
                    <span className="text-[10px] text-gray-400">2 Unread</span>
                  </div>
                  <div className="space-y-2 mt-3 text-xs">
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="font-medium text-white text-[11px]">
                        Action item due Friday
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        Arjun: Finalize backend API migration
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="font-medium text-white text-[11px]">
                        New decision recorded
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        Q4 website redesign approved for launch
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/[0.05] transition-all focus:outline-none cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 border border-white/20 flex items-center justify-center text-xs font-semibold text-white">
                  JD
                </div>
                <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#111215] border border-white/15 p-2 shadow-2xl z-30 animate-fade-in text-xs">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <div className="font-medium text-white">Jordan Davis</div>
                    <div className="text-[10px] text-gray-400">lead@mainframe.co</div>
                  </div>
                  <Link
                    to="/app/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-3 py-1.5 rounded-lg hover:bg-white/[0.05] text-gray-300 hover:text-white"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-3 py-1.5 rounded-lg hover:bg-white/[0.05] text-gray-300 hover:text-white"
                  >
                    Landing Page
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 bg-[#0d0e12] border-r border-white/10 p-5 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <Link
                  to="/"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-2"
                >
                  <span
                    className="text-xl font-medium text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Copilot<sup className="text-xs">®</sup>
                  </span>
                  <span className="text-xl text-white/70">✳︎</span>
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full mb-6 py-2.5 px-4 rounded-xl bg-white text-black font-medium text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Meeting
              </button>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.path === '/app'
                      ? location.pathname === '/app'
                      : location.pathname.startsWith(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={() => {
                setMobileSidebarOpen(false);
                handleResetDemo();
              }}
              className="w-full py-2 px-3 rounded-lg border border-white/10 text-[11px] text-gray-400 hover:text-white flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3 h-3" />
              Reload Demo Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
