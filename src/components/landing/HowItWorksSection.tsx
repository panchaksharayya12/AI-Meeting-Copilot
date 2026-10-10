import React from 'react';
import { FadeIn } from '../common/FadeIn';
import { Mic, FileAudio, Cpu, ArrowUpRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Record or Upload',
      desc: 'Capture live meetings directly in your browser with real-time audio visualization, or drop existing audio files (.mp3, .wav, .m4a).',
      icon: Mic,
    },
    {
      num: '02',
      title: 'Transcribe',
      desc: 'High-accuracy Whisper speech-to-text segments dialogue by speaker and attaches millisecond timestamps to every phrase.',
      icon: FileAudio,
    },
    {
      num: '03',
      title: 'Understand',
      desc: 'Our AI engine extracts decisions, assigns action item owners with estimated deadlines, and highlights risks and unanswered questions.',
      icon: Cpu,
    },
    {
      num: '04',
      title: 'Act',
      desc: 'Track pending deliverables, sync to your team workflow, export professional executive PDF summaries, or ask questions in natural language.',
      icon: ArrowUpRight,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-5 sm:px-8 md:px-12 relative z-10 border-t border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto">
        <FadeIn delay={100} duration={600} direction="up">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mt-3">
              From conversation to clarity.
            </h2>
            <p className="text-base text-gray-400 mt-4 leading-relaxed font-light">
              Four streamlined stages transforming raw meeting dialogue into executable momentum.
            </p>
          </div>
        </FadeIn>

        {/* Desktop Horizontal Timeline / Mobile Vertical */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-white/5 via-white/20 to-white/5 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <FadeIn key={idx} delay={200 + idx * 120} duration={500} direction="up">
                  <div className="copilot-card rounded-2xl p-6 flex flex-col justify-between h-full bg-[#111215]/80">
                    <div>
                      {/* Badge / Step number */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shadow-inner">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-3xl font-semibold font-mono text-gray-600">
                          {step.num}
                        </span>
                      </div>

                      <h3 className="text-lg font-medium text-white tracking-tight mb-2.5">
                        {step.title}
                      </h3>

                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                      <span>PHASE // 0{idx + 1}</span>
                      <span className="text-emerald-400/80">AUTOMATED</span>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
