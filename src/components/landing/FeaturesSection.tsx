import React from 'react';
import { FadeIn } from '../common/FadeIn';
import {
  Mic,
  Sparkles,
  CheckCircle,
  UserCheck,
  Scale,
  Search,
  Brain,
  MessageSquare,
  BarChart3,
  ClockAlert,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Mic,
      title: 'Live / Uploaded Transcription',
      desc: 'Seamlessly capture microphone audio with real-time waveform feedback or process pre-recorded audio files.',
    },
    {
      icon: Sparkles,
      title: 'AI Meeting Summary',
      desc: 'Instant executive syntheses breaking down high-level themes, critical milestones, and key developments.',
    },
    {
      icon: CheckCircle,
      title: 'Action Item Extraction',
      desc: 'Discovers commitments automatically, tagging priority, delivery target dates, and execution status.',
    },
    {
      icon: UserCheck,
      title: 'Owner Detection',
      desc: 'Identifies which participant volunteered for or was assigned each responsibility directly from spoken context.',
    },
    {
      icon: Scale,
      title: 'Decision Tracking',
      desc: 'Logs binding consensus, agreements, and team votes with full contextual audit trails.',
    },
    {
      icon: Search,
      title: 'Searchable Meeting History',
      desc: 'Lightning-fast keyword and full-text querying across every transcript segment, summary, and action item.',
    },
    {
      icon: Brain,
      title: 'Semantic Meeting Search',
      desc: 'Find concepts even if the exact words differ. Search "budget limits" to find pricing conversations.',
    },
    {
      icon: MessageSquare,
      title: 'Ask Your Meetings',
      desc: 'Conversational assistant answers queries like "Who owns the API migration?" with exact meeting citations.',
    },
    {
      icon: BarChart3,
      title: 'Meeting Analytics',
      desc: 'Action completion rates, weekly meeting volume, duration trends, and decision frequency metrics.',
    },
    {
      icon: ClockAlert,
      title: 'Follow-Up Intelligence',
      desc: 'Instant dashboard highlighting unresolved action items, open decisions needing sign-off, and pending deadlines.',
    },
  ];

  return (
    <section id="features" className="py-24 px-5 sm:px-8 md:px-12 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <FadeIn delay={100} duration={600} direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              Intelligence Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mt-3">
              Engineered for absolute follow-through.
            </h2>
            <p className="text-base text-gray-400 mt-4 leading-relaxed font-light">
              Everything your team needs to transform hours of conversation into high-velocity execution.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <FadeIn key={idx} delay={150 + idx * 60} duration={500} direction="up">
                <div className="copilot-card rounded-2xl p-6 h-full flex flex-col justify-between group hover:border-white/25 transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-4 group-hover:bg-white group-hover:text-black transition-all">
                      <Icon className="w-5 h-5 transition-colors" />
                    </div>
                    <h3 className="text-base font-medium text-white mb-2 tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                    <span>CAPABILITY // 0{idx + 1}</span>
                    <span className="text-white/60">ACTIVE</span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
