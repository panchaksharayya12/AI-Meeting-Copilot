import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LandingNavbarProps {
  onOpenWorkspace?: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onOpenWorkspace }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToApp = () => {
    setMobileMenuOpen(false);
    if (onOpenWorkspace) {
      onOpenWorkspace();
    } else {
      navigate('/app');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center transition-all bg-gradient-to-b from-[#08090a]/80 via-[#08090a]/40 to-transparent backdrop-blur-[2px]">
        {/* Logo Left */}
        <Link
          to="/"
          className="flex items-center gap-3 text-white focus:outline-none group"
        >
          <span
            className="text-[21px] sm:text-[26px] tracking-tight font-medium"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Copilot<sup className="text-[14px]">®</sup>
          </span>
          <span
            className="text-[25px] sm:text-[30px] select-none text-white/80 group-hover:text-white transition-colors"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </Link>

        {/* Desktop nav links (center, hidden below md) */}
        <div className="hidden md:flex items-center text-[20px] lg:text-[23px] text-white font-normal">
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="hover:opacity-60 transition-opacity focus:outline-none"
          >
            How It Works
          </button>
          <span className="select-none mx-1 text-white/40">,</span>
          <button
            onClick={() => handleNavClick('features')}
            className="hover:opacity-60 transition-opacity focus:outline-none"
          >
            Features
          </button>
          <span className="select-none mx-1 text-white/40">,</span>
          <button
            onClick={() => handleNavClick('preview')}
            className="hover:opacity-60 transition-opacity focus:outline-none"
          >
            Intelligence
          </button>
          <span className="select-none mx-1 text-white/40">,</span>
          <button
            onClick={() => handleNavClick('problem')}
            className="hover:opacity-60 transition-opacity focus:outline-none"
          >
            Principles
          </button>
        </div>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={goToApp}
            className="text-[20px] lg:text-[23px] text-white underline underline-offset-4 hover:opacity-60 transition-opacity cursor-pointer font-normal"
          >
            Open Workspace
          </button>
        </div>

        {/* Mobile Hamburger (visible below md) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden z-40 p-2 flex flex-col justify-center items-center gap-[5px] focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-20 bg-[#08090a]/95 backdrop-blur-xl flex flex-col justify-center px-8 gap-8 md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 text-[30px] sm:text-[34px] font-medium text-white">
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="text-left hover:text-gray-400 transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="text-left hover:text-gray-400 transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('preview')}
            className="text-left hover:text-gray-400 transition-colors"
          >
            Intelligence Preview
          </button>
          <button
            onClick={() => handleNavClick('problem')}
            className="text-left hover:text-gray-400 transition-colors"
          >
            Principles
          </button>
          <div className="h-[1px] bg-white/10 my-2" />
          <button
            onClick={goToApp}
            className="text-left underline underline-offset-4 text-white hover:text-gray-300 transition-colors"
          >
            Open Workspace →
          </button>
        </div>
      </div>
    </>
  );
};
