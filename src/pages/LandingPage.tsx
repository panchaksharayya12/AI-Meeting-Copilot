import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MouseScrubVideo } from '../components/common/MouseScrubVideo';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { LandingHero } from '../components/landing/LandingHero';
import { ProblemSection } from '../components/landing/ProblemSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { IntelligencePreviewSection } from '../components/landing/IntelligencePreviewSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { LandingCTASection } from '../components/landing/LandingCTASection';
import { LandingFooter } from '../components/landing/LandingFooter';
import { CreateMeetingModal } from '../components/meetings/CreateMeetingModal';
import { resetWorkspaceDemo } from '../lib/api';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartMeeting = () => {
    setIsModalOpen(true);
  };

  const handleLoadDemo = async () => {
    await resetWorkspaceDemo();
    navigate('/app');
  };

  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#ededed] overflow-x-hidden selection:bg-white selection:text-black">
      {/* 1. Background Video with Mouse-Scrubbing Control */}
      <MouseScrubVideo />

      {/* 2. Top Navigation */}
      <LandingNavbar onOpenWorkspace={() => navigate('/app')} />

      {/* 3. Hero Section */}
      <main className="relative z-10">
        <LandingHero
          onStartMeeting={handleStartMeeting}
          onLoadDemo={handleLoadDemo}
        />

        {/* 4. Problem Section */}
        <ProblemSection />

        {/* 5. How It Works Section */}
        <HowItWorksSection />

        {/* 6. Features Section */}
        <FeaturesSection />

        {/* 7. Meeting Intelligence Interactive Preview */}
        <IntelligencePreviewSection />

        {/* 8. Testimonials / Use Cases */}
        <TestimonialsSection />

        {/* 9. Final Call to Action */}
        <LandingCTASection
          onStartMeeting={handleStartMeeting}
          onLoadDemo={handleLoadDemo}
        />
      </main>

      {/* 10. Footer */}
      <LandingFooter />

      {/* Create Meeting Modal */}
      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMeetingCreated={(id) => {
          setIsModalOpen(false);
          navigate(`/app/meetings/${id}`);
        }}
      />
    </div>
  );
};
