import React from 'react';
import { FadeIn } from '../common/FadeIn';
import { AlertCircle, FileSearch, CheckSquare, Layers } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: AlertCircle,
      title: 'Lost Decisions',
      description:
        'Key commitments vanish inside hours-long recordings. Without documented consensus, teams re-debate previous choices.',
    },
    {
      icon: CheckSquare,
      title: 'Missed Action Items',
      description:
        'Tasks assigned casually in conversation get forgotten. Deadlines slip because no one tracks verbal handoffs.',
    },
    {
      icon: Layers,
      title: 'Scattered Notes',
      description:
        'Participants maintain fragmented, contradictory notes across Google Docs, Slack, and memory.',
    },
    {
      icon: FileSearch,
      title: 'Unsearchable Conversations',
      description:
        'Finding what a client requested three weeks ago takes 45 minutes of scrubbed video instead of 2 seconds of semantic search.',
    },
  ];

  return (
    <section id="problem" className="py-24 px-5 sm:px-8 md:px-12 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <FadeIn delay={100} duration={600} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              The Reality of Remote & Hybrid Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mt-3">
              Meetings create information.
              <br />
              <span className="text-gray-400">Your team needs intelligence.</span>
            </h2>
            <p className="text-base text-gray-400 mt-4 leading-relaxed font-light">
              Every day, organizations generate gigabytes of spoken dialogue.
              Yet critical momentum is squandered in the disconnect between talking and executing.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn key={idx} delay={200 + idx * 100} duration={500} direction="up">
                <div className="copilot-card rounded-2xl p-6 h-full flex flex-col justify-between group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 group-hover:scale-105 group-hover:border-white/30 transition-all">
                      <Icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-gray-500 font-mono">
                    0{idx + 1} // FRICTION
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
