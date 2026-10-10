import React from 'react';
import { FadeIn } from '../common/FadeIn';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight, Sparkles } from 'lucide-react';

interface LandingCTASectionProps {
  onStartMeeting: () => void;
  onLoadDemo: () => void;
}

export const LandingCTASection: React.FC<LandingCTASectionProps> = ({ onStartMeeting, onLoadDemo }) => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-5 sm:px-8 md:px-12 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-[#08090a]">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn delay={100} duration={600} direction="up">
          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            Immediate Clarity
          </span>
          <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-tight mt-3 mb-6">
            Turn meeting chaos into structured action.
          </h2>
          <p className="text-base text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Start a live recording right now or load our sample workspace to experience the full AI intelligence suite in seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartMeeting}
              className="inline-flex items-center justify-center bg-white text-black px-7 py-3 rounded-xl font-medium text-sm hover:bg-gray-200 transition-all cursor-pointer shadow-lg hover:shadow-white/20"
            >
              <Play className="w-4 h-4 mr-2 fill-current" />
              Start a Meeting Now
            </button>

            <button
              onClick={() => navigate('/app')}
              className="inline-flex items-center justify-center liquid-glass border border-white/20 text-white px-7 py-3 rounded-xl font-medium text-sm hover:bg-white/10 transition-all cursor-pointer"
            >
              Open Workspace
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <button
              onClick={onLoadDemo}
              className="inline-flex items-center justify-center text-xs text-gray-400 hover:text-white px-4 py-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Reset Demo Data
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
