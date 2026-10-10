import React from 'react';
import { FadeIn } from '../common/FadeIn';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'We eliminated "What did we agree on last Tuesday?" from our engineering vocabulary. Every PR and migration now links directly to the ratified meeting decision.',
      author: 'Marcus Vance',
      role: 'VP of Engineering, ScaleGrid Systems',
    },
    {
      quote:
        'Action item extraction with automated owner tagging cut our post-meeting admin overhead from 30 minutes per client call to literally zero.',
      author: 'Sarah Chen',
      role: 'Partner & Lead Architect, Meridian Venture Studio',
    },
    {
      quote:
        'The ability to search across 6 months of customer discovery calls with semantic queries like "pricing complaints" gave us an unfair product advantage.',
      author: 'Elena Rostova',
      role: 'Head of Product, Omniview',
    },
  ];

  return (
    <section className="py-24 px-5 sm:px-8 md:px-12 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <FadeIn delay={100} duration={600} direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              Proven Impact
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mt-3">
              Built for teams who value execution.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <FadeIn key={idx} delay={200 + idx * 100} duration={500} direction="up">
              <div className="copilot-card rounded-2xl p-7 flex flex-col justify-between h-full bg-[#111215]/60 border border-white/10">
                <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-white/5">
                  <div className="text-sm font-medium text-white">{t.author}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{t.role}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
