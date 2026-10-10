import React, { useState } from 'react';
import { FadeIn } from '../common/FadeIn';
import { Sparkles, FileText, CheckCircle2, Scale, MessageSquare, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const IntelligencePreviewSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript' | 'actions' | 'decisions' | 'qa'>('summary');
  const navigate = useNavigate();

  return (
    <section id="preview" className="py-24 px-5 sm:px-8 md:px-12 relative z-10 border-t border-white/5 bg-black/60">
      <div className="max-w-7xl mx-auto">
        <FadeIn delay={100} duration={600} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              Interactive Workspace Preview
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mt-3">
              Experience the Intelligence Layer.
            </h2>
            <p className="text-base text-gray-400 mt-4 leading-relaxed font-light">
              See how a 42-minute Product Strategy Sync is instantly synthesized into actionable clarity.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={250} duration={600} direction="up">
          <div className="liquid-glass rounded-3xl border border-white/15 overflow-hidden shadow-2xl backdrop-blur-2xl max-w-5xl mx-auto">
            {/* Top Workspace Header */}
            <div className="p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <h3 className="text-lg font-medium text-white">Product Strategy Sync</h3>
                  <p className="text-xs text-gray-400">Oct 06, 2026 • 42 min • 4 participants (Jordan, Arjun, Priya, Daniel)</p>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.05] border border-white/10">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'summary' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Summary
                </button>
                <button
                  onClick={() => setActiveTab('transcript')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'transcript' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Transcript
                </button>
                <button
                  onClick={() => setActiveTab('actions')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'actions' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Actions (3)
                </button>
                <button
                  onClick={() => setActiveTab('decisions')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'decisions' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  Decisions (2)
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'qa' ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Ask AI
                </button>
              </div>
            </div>

            {/* Tab Body */}
            <div className="p-6 sm:p-8 min-h-[380px] bg-black/40">
              {activeTab === 'summary' && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                      Executive Summary
                    </h4>
                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light bg-white/[0.03] p-4 rounded-xl border border-white/5">
                      The team converged on Q4 product roadmap milestones. Approved the full website redesign launch for Friday following confirmation from engineering on API readiness. Priya highlighted usability feedback on pricing tiers to be addressed prior to final rollout.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                      Key Discussion Points
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300">
                        • Website redesign approved for launch this Friday.
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300">
                        • API migration staged and confirmed on schedule by Arjun.
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300">
                        • 12 user research sessions completed; pricing table needs simplification.
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300">
                        • Rollback strategy being documented for traffic safeguard.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'transcript' && (
                <div className="space-y-3.5 font-mono text-xs sm:text-sm animate-fade-in max-h-[340px] overflow-y-auto pr-2">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-gray-500 mr-3">[09:40]</span>
                    <span className="text-white font-medium mr-2">Jordan:</span>
                    <span className="text-gray-300">Good morning everyone. Let's get right into the Q4 priorities. We need to align on the website redesign and the new API migration schedule.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-gray-500 mr-3">[09:41]</span>
                    <span className="text-white font-medium mr-2">Daniel:</span>
                    <span className="text-gray-300">The brand overhaul is ready from design side. The conversion flow has been streamlined, but we need engineering commitment on whether we can ship before the November campaign.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.06] border border-white/15">
                    <span className="text-gray-500 mr-3">[09:42]</span>
                    <span className="text-emerald-400 font-medium mr-2">Jordan:</span>
                    <span className="text-white">I think we should move the website launch to Friday. What's the risk on the backend?</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.06] border border-white/15">
                    <span className="text-gray-500 mr-3">[09:43]</span>
                    <span className="text-emerald-400 font-medium mr-2">Arjun:</span>
                    <span className="text-white">Agreed. I'll finish the API migration before then. The database schema changes are already staged in staging environment.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-gray-500 mr-3">[09:45]</span>
                    <span className="text-white font-medium mr-2">Priya:</span>
                    <span className="text-gray-300">On the user testing side, I've conducted 12 sessions. Testers love the new navigation, but 3 users were confused by the pricing tiers. Priya will prepare the user research report with recommendations by Thursday morning.</span>
                  </div>
                </div>
              )}

              {activeTab === 'actions' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md border border-white/30 flex items-center justify-center text-transparent hover:text-white cursor-pointer">
                        ✓
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Finalize backend API migration and document rollback procedure</div>
                        <div className="text-xs text-gray-400 mt-0.5">Due: Friday, Oct 10 • Priority: High</div>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white font-medium">
                      Arjun
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md border border-white/30 flex items-center justify-center text-transparent hover:text-white cursor-pointer">
                        ✓
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Prepare comprehensive user research synthesis on pricing table friction</div>
                        <div className="text-xs text-gray-400 mt-0.5">Due: Thursday, Oct 09 • Priority: Medium</div>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white font-medium">
                      Priya
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md border border-white/30 flex items-center justify-center text-transparent hover:text-white cursor-pointer">
                        ✓
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Update Figma component library with simplified pricing tier comparisons</div>
                        <div className="text-xs text-gray-400 mt-0.5">Due: Wednesday, 2:00 PM • Priority: Medium</div>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white font-medium">
                      Daniel
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'decisions' && (
                <div className="space-y-3.5 animate-fade-in">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">RATIFIED DECISION</span>
                      <span className="text-xs text-gray-400">Owner: Jordan Davis</span>
                    </div>
                    <h5 className="text-sm font-medium text-white mt-1">
                      Q4 website redesign approved for production launch this Friday.
                    </h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Context: Brand overhaul and conversion updates validated; launch scheduled before the upcoming November marketing campaign.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">RATIFIED DECISION</span>
                      <span className="text-xs text-gray-400">Owner: Arjun Sharma</span>
                    </div>
                    <h5 className="text-sm font-medium text-white mt-1">
                      Migrate to unified REST/GraphQL backend API endpoints prior to web deploy.
                    </h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Context: Staged schema changes verified to prevent front-end version divergence.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'qa' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-gray-300">
                    <span className="text-white font-medium block mb-1">Q: "Who owns the website redesign and when is it shipping?"</span>
                    <p className="text-gray-300 leading-relaxed font-light">
                      A: Jordan Davis owns the launch schedule for the website redesign, approved for deployment this Friday. Arjun Sharma owns the accompanying API migration and rollback documentation.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-gray-300">
                    <span className="text-white font-medium block mb-1">Q: "What were the user research findings?"</span>
                    <p className="text-gray-300 leading-relaxed font-light">
                      A: Priya completed 12 user testing sessions. Navigation was validated positively, but 3 users reported confusion with pricing tier comparisons. Priya is preparing recommendations by Thursday.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Bar */}
            <div className="p-5 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <User className="w-3.5 h-3.5 text-gray-500" />
                <span>4 participants verified • 100% transcript retention</span>
              </div>
              <button
                onClick={() => navigate('/app/meetings/meet-001')}
                className="inline-flex items-center gap-2 text-xs font-medium text-white hover:underline underline-offset-4 cursor-pointer"
              >
                Open in Full Meeting Studio
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
