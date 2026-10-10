# AI Meeting Copilot

> "Turn every meeting into clear actions."

AI Meeting Copilot is an end-to-end full-stack web application that transforms meeting audio and transcripts into structured organizational intelligence. It captures spoken dialogue, generates executive summaries, extracts action items with owner detection and deadlines, ratifies binding decisions, provides semantic search, and answers questions across all meetings in natural language.

---

## Project Links and Deliverables

| Deliverable | Direct Link | Description |
| :--- | :--- | :--- |
| **Live Production Website** | https://ai-meeting-copilot-neon.vercel.app | Deployed live web application on Vercel |
| **Workspace Application** | https://ai-meeting-copilot-neon.vercel.app/app | Direct link to workspace dashboard |
| **GitHub Repository** | https://github.com/panchaksharayya12/AI-Meeting-Copilot | Source code repository |
| **Project Report (.docx)** | [Direct Download (.docx)](https://ai-meeting-copilot-neon.vercel.app/downloads/AI_Meeting_Copilot_Project_Report.docx) • [GitHub Raw](https://raw.githubusercontent.com/panchaksharayya12/AI-Meeting-Copilot/main/docs/AI_Meeting_Copilot_Project_Report.docx) | Comprehensive, human-crafted academic and technical report |
| **Presentation Slides (.pptx)** | [Direct Download (.pptx)](https://ai-meeting-copilot-neon.vercel.app/downloads/AI_Meeting_Copilot_Presentation.pptx) • [GitHub Raw](https://raw.githubusercontent.com/panchaksharayya12/AI-Meeting-Copilot/main/docs/AI_Meeting_Copilot_Presentation.pptx) | 16:9 Widescreen slide deck for evaluation |

---

## Key Capabilities

- **Cinematic Landing Page**:
  - Interactive mouse-scrub controlled background video.
  - Character-by-character animated typography (`AnimatedHeading`).
  - Terminal typewriter effect with blinking cursor (`useTypewriter`).
  - Action pills with clipboard copying.
  - Interactive meeting intelligence preview with real-time tab switching.
  - Minimalist monochrome and liquid-glass aesthetic.
- **Intelligent Workspace (/app)**:
  - **Live Meeting Recording**: Browser microphone stream with audio visualization, elapsed timer, and non-blocking fallback if microphone permissions are denied.
  - **Audio File Upload**: Drag-and-drop support for .mp3, .wav, .m4a, and .webm files with server-side processing.
  - **High-Accuracy Transcription**: Powered by OpenAI Whisper when configured, with instant realistic transcript generation in demo mode.
  - **AI Analysis & Executive Summaries**: Structured breakdown into Executive Summary, Key Discussion Points, Ratified Decisions, Action Items, Risks & Concerns, Unanswered Questions, and Next Steps.
  - **Action Item Extraction & Ownership**: Discovers commitments, tags owners and due dates, allows filtering (All, Open, Completed, Overdue, High Priority), and status toggling.
  - **Decision Tracking**: Maintains a persistent audit trail of binding team approvals and context.
  - **Ask Your Meetings Anything**: Conversational AI assistant grounded in meeting context, providing precise answers with cited meeting badges.
  - **Meeting Execution Analytics**: Recharts-powered metrics for weekly meeting load, action resolution rates, and sprint velocity.
  - **PDF Export via jsPDF**: One-click download of formal executive meeting reports.
  - **Coherent Demo Workspace**: Pre-seeded with 3 interconnected meetings (Product Strategy Sync, Client Discovery Call, Engineering Sprint Review).
  - **Zero-Crash Offline Fallback**: Fully operable locally with deterministic rule parsing and LocalStorage sync even if OpenAI or Supabase keys are missing.

---

## Tech Stack

- **Frontend**:
  - React 18, TypeScript, Vite
  - Tailwind CSS, Liquid Glass utilities
  - Lucide React
  - Recharts
  - jsPDF, jsPDF-AutoTable
  - React Router v6
- **Backend**:
  - Node.js, Express, TypeScript (tsx)
  - Multer
  - OpenAI API (Whisper audio transcription & GPT-4o-mini structured analysis)
  - Deterministic Rule-Based Fallback Parser

---

## Project Structure

```
ai-meeting-copilot/
|
|-- src/
|   |-- components/
|   |   |-- common/
|   |   |   |-- AnimatedHeading.tsx
|   |   |   |-- FadeIn.tsx
|   |   |   `-- MouseScrubVideo.tsx
|   |   |-- landing/
|   |   |   |-- LandingNavbar.tsx
|   |   |   |-- LandingHero.tsx
|   |   |   |-- ProblemSection.tsx
|   |   |   |-- HowItWorksSection.tsx
|   |   |   |-- FeaturesSection.tsx
|   |   |   |-- IntelligencePreviewSection.tsx
|   |   |   |-- TestimonialsSection.tsx
|   |   |   |-- LandingCTASection.tsx
|   |   |   `-- LandingFooter.tsx
|   |   |-- layout/
|   |   |   `-- AppLayout.tsx
|   |   `-- meetings/
|   |       `-- CreateMeetingModal.tsx
|   |-- hooks/
|   |   `-- useTypewriter.ts
|   |-- lib/
|   |   `-- api.ts
|   |-- pages/
|   |   |-- LandingPage.tsx
|   |   |-- DashboardPage.tsx
|   |   |-- MeetingsPage.tsx
|   |   |-- MeetingDetailPage.tsx
|   |   |-- ActionsPage.tsx
|   |   |-- DecisionsPage.tsx
|   |   |-- SearchPage.tsx
|   |   |-- AnalyticsPage.tsx
|   |   `-- SettingsPage.tsx
|   |-- types/
|   |   `-- index.ts
|   |-- utils/
|   |   `-- pdfExport.ts
|   |-- App.tsx
|   |-- main.tsx
|   `-- index.css
|
|-- server/
|   |-- services/
|   |   |-- openaiService.ts
|   |   `-- supabaseService.ts
|   |-- utils/
|   |   `-- seedData.ts
|   |-- types.ts
|   `-- index.ts
|
|-- docs/
|   |-- AI_Meeting_Copilot_Project_Report.docx
|   `-- AI_Meeting_Copilot_Presentation.pptx
|
|-- public/
|   `-- downloads/
|       |-- AI_Meeting_Copilot_Project_Report.docx
|       `-- AI_Meeting_Copilot_Presentation.pptx
|
|-- .env.example
|-- package.json
|-- tailwind.config.js
|-- vite.config.ts
|-- vercel.json
`-- README.md
```

---

## Quickstart Guide

### 1. Installation

Clone or open the project folder in VS Code, then install dependencies:

```bash
npm install
```

### 2. Configure Environment (Optional)

The application includes an `.env.example` file. Copy it to `.env`:

```bash
cp .env.example .env
```

Default contents:
```env
PORT=5000
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
NODE_ENV=development
```

Note: An OpenAI API key is NOT required for the application to function. If omitted, the system activates the built-in Deterministic Local Engine which extracts decisions, owners, deadlines, and answers questions using pattern recognition.

### 3. Run the Full Application

Start both the Vite frontend (http://localhost:5173) and Express backend (http://localhost:5000) simultaneously with a single command:

```bash
npm run dev
```

Visit http://localhost:5173 in your browser.

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /api/health | Server health, OpenAI status and Supabase status |
| POST | /api/transcribe | Uploads audio and returns Whisper transcript |
| POST | /api/analyze | Analyzes transcript into summary, tasks, decisions |
| GET | /api/meetings | Retrieves all stored meetings |
| POST | /api/meetings | Creates and saves a new meeting |
| GET | /api/meetings/:id | Fetches single meeting details |
| DELETE | /api/meetings/:id | Deletes meeting by ID |
| GET | /api/actions | Retrieves all action items across meetings |
| PATCH | /api/actions/:id | Updates action status (Open / Completed) |
| GET | /api/decisions | Retrieves all ratified decisions |
| POST | /api/search | Full-text keyword and topic search |
| POST | /api/ai/chat | AI query answering with cited meeting sources |
| POST | /api/report | Returns formatted meeting report payload |
| POST | /api/reset-demo | Resets workspace to the initial seed state |

---

## Optional Supabase Schema

If you wish to attach a persistent Supabase database in the future, create a table named `meetings`:

```sql
create table meetings (
  id text primary key,
  title text not null,
  date date not null,
  duration text,
  participants text[],
  transcript text not null,
  segments jsonb default '[]'::jsonb,
  summary text,
  key_points text[],
  decisions jsonb default '[]'::jsonb,
  action_items jsonb default '[]'::jsonb,
  risks text[],
  questions text[],
  next_steps text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

---

## Demo Scenarios to Try

1. **Test Meeting Creation and Sample Transcript**:
   - Click "New Meeting" in the top bar or sidebar.
   - Click "Use Sample Transcript (Q4 Strategy)".
   - Click "Analyze Meeting & Generate Actions".
   - Watch the AI parse decisions, assign tasks, and generate the meeting view.
2. **Export Executive PDF**:
   - In any meeting detail view (e.g., Product Strategy Sync), click "Export Meeting Report (PDF)".
   - An executive-formatted .pdf document with tables and key points is generated and downloaded via jsPDF.
3. **Ask Your Meetings Anything**:
   - Navigate to /app/search.
   - Click one of the suggested prompts or type:
     - "Who owns the API migration?"
     - "What did we agree on with Client X?"
     - "What did we decide about the website?"
   - See direct answers accompanied by clickable badges linking to the source meeting.
4. **Follow-Up Intelligence**:
   - On the Dashboard (/app), inspect the "What's still unresolved?" card to see overdue deliverables, open contract reviews, and unanswered questions.
5. **Interactive Video Mouse Scrubbing**:
   - Move your mouse horizontally on the landing page to scrub through the video timeline in real time.

---

## License

MIT - 2026 AI Meeting Copilot. All rights reserved.
