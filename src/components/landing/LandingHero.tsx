import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedHeading } from '../common/AnimatedHeading';
import { FadeIn } from '../common/FadeIn';
import { useTypewriter } from '../../hooks/useTypewriter';
import { CheckCircle2, Clock, Sparkles, ArrowRight, Play, Check } from 'lucide-react';

interface LandingHeroProps {
  onStartMeeting: () => void;
  onLoadDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStartMeeting, onLoadDemo }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Typewriter hook
  const { displayed, done } = useTypewriter(
    'Glad you stopped in. Good taste tends to find us. Turn every meeting into clear actions.',
    { speed: 38, startDelay: 600 }
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('copilot@meetingai.co');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-5 sm:px-8 md:px-12 pt-28 pb-16 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography, Typewriter & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl">
          {/* 1. Blurred intro label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6 text-[#ededed]/90 transition-all"
            style={{
              fontSize: 'clamp(18px, 4vw, 24px)',
              lineHeight: 1.3,
              fontWeight: 400,
              filter: 'blur(3px)',
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            AI Meeting Copilot's Adaptive Response Interface Agent
          </div>

          {/* 2. Typewriter text */}
          <p
            className="text-white mb-5 sm:mb-6 font-normal min-h-[58px]"
            style={{
              fontSize: 'clamp(18px, 4vw, 25px)',
              lineHeight: 1.35,
            }}
          >
            {displayed}
            {!done && (
              <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-cursor-blink" />
            )}
          </p>

          {/* Main Hero Animated Heading */}
          <AnimatedHeading
            text={'Every meeting.\nOne intelligent workspace.'}
            className="text-5xl md:text-6xl lg:text-7xl text-white font-medium mb-6 leading-[1.05]"
            charDelay={25}
            initialDelay={200}
            duration={500}
          />

          {/* Subheading */}
          <FadeIn delay={800} duration={600} direction="up">
            <p className="text-base md:text-lg text-gray-300 max-w-xl font-normal leading-relaxed mb-6">
              Capture what was said, understand what matters, and never lose track of what happens next.
              Turn discussions into searchable organizational intelligence in seconds.
            </p>
          </FadeIn>

          {/* 3. Action pill buttons (Fade-in + slide-up at 400ms) */}
          <FadeIn delay={400} duration={400} direction="up">
            <div className="flex flex-wrap items-center gap-y-2.5 gap-x-2 my-2">
              <button
                onClick={onStartMeeting}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] font-medium whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-lg hover:shadow-white/10"
              >
                <Play className="w-3.5 h-3.5 mr-1.5 fill-current" />
                Start a Meeting
              </button>

              <button
                onClick={() => navigate('/app')}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] font-medium whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-lg hover:shadow-white/10"
              >
                Explore Workspace
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>

              <button
                onClick={onLoadDemo}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] font-medium whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-lg hover:shadow-white/10"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Load Demo Workspace
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] font-medium whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-lg hover:shadow-white/10"
              >
                See how we operate
              </button>

              {/* Outline pill button with copy email */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center text-white bg-transparent border border-white/40 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.4em] gap-2 font-normal whitespace-nowrap hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
                title="Click to copy email address"
              >
                <span>
                  Reach us: <span className="underline underline-offset-2">hello@mainframe.co</span>
                </span>
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block flex-shrink-0"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Floating Meeting Intelligence Preview Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <FadeIn delay={600} duration={800} direction="up" className="w-full max-w-md">
            <div className="liquid-glass rounded-2xl p-6 sm:p-7 border border-white/15 shadow-2xl backdrop-blur-xl relative group transition-all duration-300 hover:border-white/30">
              {/* Badge & Meta */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-400">
                    MEETING INSIGHTS
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-400 gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>42 min</span>
                </div>
              </div>

              {/* Title */}
              <div className="mt-4">
                <h3 className="text-xl font-medium text-white tracking-tight">
                  Product Strategy Sync
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Jordan, Arjun, Priya, Daniel
                </p>
              </div>

              {/* AI Summary Highlight */}
              <div className="mt-5 p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-300 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>AI Summary</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light">
                  "Team aligned on Q4 priorities and approved the launch timeline. Arjun confirmed backend API readiness for Friday."
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 block">
                    Action Items
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl font-semibold text-white">3</span>
                    <span className="text-xs text-emerald-400">open</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 block">
                    Decisions
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl font-semibold text-white">4</span>
                    <span className="text-xs text-gray-400">ratified</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Item Preview */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                <div className="flex items-center gap-2 truncate">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">Website redesign approved for Friday</span>
                </div>
                <span className="text-[11px] text-gray-400 flex-shrink-0 ml-2">Jordan</span>
              </div>

              {/* Interactive CTA */}
              <button
                onClick={() => navigate('/app/meetings/meet-001')}
                className="w-full mt-5 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                View Complete Intelligence
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
