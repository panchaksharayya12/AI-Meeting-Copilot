import React from 'react';
import { Link } from 'react-router-dom';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="py-12 px-5 sm:px-8 md:px-12 border-t border-white/10 relative z-10 bg-[#08090a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <span
              className="text-lg font-medium text-white tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              AI Meeting Copilot
            </span>
            <span className="text-xs text-white/50">✳︎</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            "Turn every meeting into clear actions."
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-gray-400">
          <a
            href="/downloads/AI_Meeting_Copilot_Project_Report.docx"
            download
            className="text-white bg-white/10 hover:bg-white hover:text-black px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-medium"
            title="Download Word Document Report"
          >
            Report (.docx)
          </a>
          <a
            href="/downloads/AI_Meeting_Copilot_Presentation.pptx"
            download
            className="text-white bg-white/10 hover:bg-white hover:text-black px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-medium"
            title="Download PowerPoint Slide Deck"
          >
            Slides (.pptx)
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <Link to="/app" className="hover:text-white transition-colors">
            Workspace
          </Link>
          <a
            href="https://github.com/panchaksharayya12/AI-Meeting-Copilot"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>

        <div className="text-xs text-gray-500 font-mono">
          © 2026 AI Meeting Copilot. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
