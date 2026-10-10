import { Meeting } from '../types.js';

export const INITIAL_MEETINGS: Meeting[] = [
  {
    id: 'meet-001',
    title: 'Product Strategy Sync',
    date: '2026-10-06',
    duration: '42 min',
    participants: ['Jordan Davis', 'Arjun Sharma', 'Priya Nair', 'Daniel Brooks'],
    transcript: `[09:40] Jordan Davis: Good morning everyone. Let's get right into the Q4 priorities. We need to align on the website redesign and the new API migration schedule.
[09:41] Daniel Brooks: The brand overhaul is ready from design side. The conversion flow has been streamlined, but we need engineering commitment on whether we can ship before the November campaign.
[09:42] Jordan Davis: I think we should move the website launch to Friday. What's the risk on the backend?
[09:43] Arjun Sharma: Agreed. I'll finish the API migration before then. The database schema changes are already staged in staging environment.
[09:45] Priya Nair: On the user testing side, I've conducted 12 sessions. Testers love the new navigation, but 3 users were confused by the pricing tiers. Priya will prepare the user research report with recommendations by Thursday morning.
[09:47] Daniel Brooks: That's a good flag. We can simplify the comparison table.
[09:48] Jordan Davis: Excellent. So decision stands: Q4 website redesign approved for launch this Friday. Jordan will review the launch timeline with marketing this afternoon.
[09:50] Arjun Sharma: I'll also ensure our rollback strategy is documented in case traffic spikes during deployment.
[09:51] Daniel Brooks: I will update Figma specs to reflect Priya's pricing feedback by tomorrow 2 PM.
[09:52] Jordan Davis: Perfect. Everyone has clear owners and deliverables. Thanks team!`,
    segments: [
      {
        id: 'seg-1',
        speaker: 'Jordan Davis',
        timestamp: '09:40',
        text: "Good morning everyone. Let's get right into the Q4 priorities. We need to align on the website redesign and the new API migration schedule."
      },
      {
        id: 'seg-2',
        speaker: 'Daniel Brooks',
        timestamp: '09:41',
        text: "The brand overhaul is ready from design side. The conversion flow has been streamlined, but we need engineering commitment on whether we can ship before the November campaign."
      },
      {
        id: 'seg-3',
        speaker: 'Jordan Davis',
        timestamp: '09:42',
        text: "I think we should move the website launch to Friday. What's the risk on the backend?",
        highlighted: true
      },
      {
        id: 'seg-4',
        speaker: 'Arjun Sharma',
        timestamp: '09:43',
        text: "Agreed. I'll finish the API migration before then. The database schema changes are already staged in staging environment.",
        highlighted: true
      },
      {
        id: 'seg-5',
        speaker: 'Priya Nair',
        timestamp: '09:45',
        text: "On the user testing side, I've conducted 12 sessions. Testers love the new navigation, but 3 users were confused by the pricing tiers. Priya will prepare the user research report with recommendations by Thursday morning."
      },
      {
        id: 'seg-6',
        speaker: 'Daniel Brooks',
        timestamp: '09:47',
        text: "That's a good flag. We can simplify the comparison table."
      },
      {
        id: 'seg-7',
        speaker: 'Jordan Davis',
        timestamp: '09:48',
        text: "Excellent. So decision stands: Q4 website redesign approved for launch this Friday. Jordan will review the launch timeline with marketing this afternoon.",
        highlighted: true
      },
      {
        id: 'seg-8',
        speaker: 'Arjun Sharma',
        timestamp: '09:50',
        text: "I'll also ensure our rollback strategy is documented in case traffic spikes during deployment."
      },
      {
        id: 'seg-9',
        speaker: 'Daniel Brooks',
        timestamp: '09:51',
        text: "I will update Figma specs to reflect Priya's pricing feedback by tomorrow 2 PM."
      },
      {
        id: 'seg-10',
        speaker: 'Jordan Davis',
        timestamp: '09:52',
        text: "Perfect. Everyone has clear owners and deliverables. Thanks team!"
      }
    ],
    summary: 'The team converged on Q4 product roadmap milestones. Approved the full website redesign launch for Friday following confirmation from engineering on API readiness. Priya highlighted usability feedback on pricing tiers to be addressed prior to final rollout.',
    keyPoints: [
      'Website redesign approved for launch this Friday.',
      'API migration staged and confirmed on schedule by Arjun Sharma.',
      '12 user research sessions completed; navigation validated, pricing table needs simplification.',
      'Rollback strategy being documented to safeguard against deployment traffic spikes.'
    ],
    decisions: [
      {
        id: 'dec-101',
        meetingId: 'meet-001',
        meetingTitle: 'Product Strategy Sync',
        date: '2026-10-06',
        decision: 'Q4 website redesign approved for production launch this Friday.',
        context: 'Brand overhaul and conversion updates validated; launch scheduled before the upcoming November marketing campaign.',
        owner: 'Jordan Davis',
        participants: ['Jordan Davis', 'Arjun Sharma', 'Priya Nair', 'Daniel Brooks']
      },
      {
        id: 'dec-102',
        meetingId: 'meet-001',
        meetingTitle: 'Product Strategy Sync',
        date: '2026-10-06',
        decision: 'Migrate to unified REST/GraphQL backend API endpoints prior to web deploy.',
        context: 'Staged schema changes verified to prevent front-end version divergence.',
        owner: 'Arjun Sharma',
        participants: ['Arjun Sharma', 'Jordan Davis']
      }
    ],
    actionItems: [
      {
        id: 'act-201',
        meetingId: 'meet-001',
        meetingTitle: 'Product Strategy Sync',
        task: 'Finalize backend API migration and document rollback procedure',
        owner: 'Arjun Sharma',
        dueDate: 'Friday, Oct 10',
        priority: 'High',
        status: 'Open',
        createdAt: '2026-10-06T09:55:00Z'
      },
      {
        id: 'act-202',
        meetingId: 'meet-001',
        meetingTitle: 'Product Strategy Sync',
        task: 'Prepare comprehensive user research synthesis on pricing table friction',
        owner: 'Priya Nair',
        dueDate: 'Thursday, Oct 09',
        priority: 'Medium',
        status: 'Open',
        createdAt: '2026-10-06T09:55:00Z'
      },
      {
        id: 'act-203',
        meetingId: 'meet-001',
        meetingTitle: 'Product Strategy Sync',
        task: 'Review Q4 launch timeline with marketing leadership',
        owner: 'Jordan Davis',
        dueDate: 'Today, 5:00 PM',
        priority: 'High',
        status: 'Completed',
        createdAt: '2026-10-06T09:55:00Z'
      },
      {
        id: 'act-204',
        meetingId: 'meet-001',
        meetingTitle: 'Product Strategy Sync',
        task: 'Update Figma component library with simplified pricing tier comparisons',
        owner: 'Daniel Brooks',
        dueDate: 'Wednesday, 2:00 PM',
        priority: 'Medium',
        status: 'Open',
        createdAt: '2026-10-06T09:55:00Z'
      }
    ],
    risks: [
      'Traffic spikes during deployment might exceed baseline connection limits without documented rollback.',
      'Potential customer confusion if pricing table adjustments are not finalized before QA sign-off.'
    ],
    questions: [
      'Will marketing require localized copy variations before Friday launch?',
      'Has the Stripe webhook tested against the new database schema?'
    ],
    nextSteps: [
      'Arjun to run dry-run staging migration on Wednesday.',
      'Priya to distribute synthesized research summary slide deck by Thursday morning.',
      'Go/No-go sync scheduled for Friday 9:00 AM.'
    ],
    createdAt: '2026-10-06T10:00:00Z'
  },
  {
    id: 'meet-002',
    title: 'Client Discovery Call — Enterprise Security & SLA',
    date: '2026-10-05',
    duration: '35 min',
    participants: ['Sarah Chen', 'Marcus Vance', 'Elena Rostova'],
    transcript: `[14:00] Sarah Chen: Welcome Marcus and Elena. Today's goal is reviewing enterprise requirements for your 4,500-seat rollout.
[14:02] Marcus Vance: Thanks Sarah. Our two primary requirements are Okta SAML 2.0 Single Sign-On and a strict 99.95% uptime SLA guarantee with regional data residency.
[14:05] Sarah Chen: Understood. Our Enterprise tier includes SAML SSO with automated SCIM provisioning out of the box. Data residency in EU Central (Frankfurt) is fully supported.
[14:10] Elena Rostova: What about our SOC 2 Type II audit report and third-party penetration test reports? Our compliance committee requires copies under NDA before signing.
[14:12] Sarah Chen: We will furnish the 2026 SOC 2 Type II report and latest pen test summary by tomorrow.
[14:18] Marcus Vance: Excellent. If the SLA penalty clauses reflect standard tiering, we are prepared to proceed with the annual commitment by end of month.
[14:22] Sarah Chen: I will draft the custom SLA addendum and send over the enterprise contract proposal by next Tuesday.`,
    segments: [
      {
        id: 'seg-11',
        speaker: 'Sarah Chen',
        timestamp: '14:00',
        text: "Welcome Marcus and Elena. Today's goal is reviewing enterprise requirements for your 4,500-seat rollout."
      },
      {
        id: 'seg-12',
        speaker: 'Marcus Vance',
        timestamp: '14:02',
        text: "Thanks Sarah. Our two primary requirements are Okta SAML 2.0 Single Sign-On and a strict 99.95% uptime SLA guarantee with regional data residency.",
        highlighted: true
      },
      {
        id: 'seg-13',
        speaker: 'Sarah Chen',
        timestamp: '14:05',
        text: "Understood. Our Enterprise tier includes SAML SSO with automated SCIM provisioning out of the box. Data residency in EU Central (Frankfurt) is fully supported."
      },
      {
        id: 'seg-14',
        speaker: 'Elena Rostova',
        timestamp: '14:10',
        text: "What about our SOC 2 Type II audit report and third-party penetration test reports? Our compliance committee requires copies under NDA before signing."
      },
      {
        id: 'seg-15',
        speaker: 'Sarah Chen',
        timestamp: '14:12',
        text: "We will furnish the 2026 SOC 2 Type II report and latest pen test summary by tomorrow.",
        highlighted: true
      },
      {
        id: 'seg-16',
        speaker: 'Marcus Vance',
        timestamp: '14:18',
        text: "Excellent. If the SLA penalty clauses reflect standard tiering, we are prepared to proceed with the annual commitment by end of month."
      },
      {
        id: 'seg-17',
        speaker: 'Sarah Chen',
        timestamp: '14:22',
        text: "I will draft the custom SLA addendum and send over the enterprise contract proposal by next Tuesday."
      }
    ],
    summary: 'Explored enterprise deployment terms with Client X (4,500 seats). Validated Okta SSO, SCIM provisioning, and EU data residency feasibility. Agreed to share compliance documentation under NDA and deliver an SLA addendum by next Tuesday.',
    keyPoints: [
      'Client requires Okta SAML 2.0 SSO + SCIM provisioning for 4,500 seats.',
      'EU Central data residency confirmed and compliant.',
      'SOC 2 Type II report and pen test results requested under NDA.',
      'Target contract execution by end of month upon SLA addendum approval.'
    ],
    decisions: [
      {
        id: 'dec-103',
        meetingId: 'meet-002',
        meetingTitle: 'Client Discovery Call — Enterprise Security & SLA',
        date: '2026-10-05',
        decision: 'Support custom 99.95% uptime SLA addendum with EU Frankfurt hosting.',
        context: 'Enterprise agreement criteria for 4,500 seats.',
        owner: 'Sarah Chen',
        participants: ['Sarah Chen', 'Marcus Vance', 'Elena Rostova']
      }
    ],
    actionItems: [
      {
        id: 'act-205',
        meetingId: 'meet-002',
        meetingTitle: 'Client Discovery Call — Enterprise Security & SLA',
        task: 'Send 2026 SOC 2 Type II audit report and pen-test findings under mutual NDA',
        owner: 'Sarah Chen',
        dueDate: 'Tomorrow, 12:00 PM',
        priority: 'High',
        status: 'Completed',
        createdAt: '2026-10-05T14:30:00Z'
      },
      {
        id: 'act-206',
        meetingId: 'meet-002',
        meetingTitle: 'Client Discovery Call — Enterprise Security & SLA',
        task: 'Draft custom SLA addendum and submit 4,500-seat enterprise pricing proposal',
        owner: 'Sarah Chen',
        dueDate: 'Next Tuesday, Oct 14',
        priority: 'High',
        status: 'Open',
        createdAt: '2026-10-05T14:30:00Z'
      }
    ],
    risks: [
      'Customer legal council requires non-standard liability cap on data breach indemnity.',
      'Custom SLA uptime credit expectations exceed standard 10% invoice credit.'
    ],
    questions: [
      'Does client require dedicated IP address range for outbound webhooks?',
      'Who is the technical POC for the Okta SAML configuration test?'
    ],
    nextSteps: [
      'Deliver compliance package via secure portal.',
      'Internal legal sync on SLA penalty structure on Friday.'
    ],
    createdAt: '2026-10-05T15:00:00Z'
  },
  {
    id: 'meet-003',
    title: 'Engineering Sprint Review & Performance Architecture',
    date: '2026-10-03',
    duration: '50 min',
    participants: ['Alex', 'Priya', 'Arjun', 'David'],
    transcript: `[11:00] Alex: Team, let's review sprint performance metrics. P99 latency on our core search queries spiked to 840ms last Thursday.
[11:03] Arjun: Root cause was unindexed full-text queries in the PostgreSQL transcript store. We implemented pg_trgm indices and added Redis caching for frequent search terms.
[11:08] David: In load testing yesterday, the Redis cache dropped P99 back down to 68ms under 2,000 concurrent queries.
[11:15] Priya: Mobile responsiveness also showed issues on devices under 390px viewport width. Tables were overflowing horizontally.
[11:20] Alex: Great catch. We approved standardizing responsive card layouts for all mobile tables. David, please own that PR.
[11:25] Arjun: Connection pooling also needs adjustment. We should bump PgBouncer pool size to 60 connections.
[11:32] Alex: Approved. Let's merge both PRs before Friday staging freeze.`,
    segments: [
      {
        id: 'seg-21',
        speaker: 'Alex',
        timestamp: '11:00',
        text: "Team, let's review sprint performance metrics. P99 latency on our core search queries spiked to 840ms last Thursday."
      },
      {
        id: 'seg-22',
        speaker: 'Arjun',
        timestamp: '11:03',
        text: "Root cause was unindexed full-text queries in the PostgreSQL transcript store. We implemented pg_trgm indices and added Redis caching for frequent search terms.",
        highlighted: true
      },
      {
        id: 'seg-23',
        speaker: 'David',
        timestamp: '11:08',
        text: "In load testing yesterday, the Redis cache dropped P99 back down to 68ms under 2,000 concurrent queries.",
        highlighted: true
      },
      {
        id: 'seg-24',
        speaker: 'Priya',
        timestamp: '11:15',
        text: "Mobile responsiveness also showed issues on devices under 390px viewport width. Tables were overflowing horizontally."
      },
      {
        id: 'seg-25',
        speaker: 'Alex',
        timestamp: '11:20',
        text: "Great catch. We approved standardizing responsive card layouts for all mobile tables. David, please own that PR."
      },
      {
        id: 'seg-26',
        speaker: 'Arjun',
        timestamp: '11:25',
        text: "Connection pooling also needs adjustment. We should bump PgBouncer pool size to 60 connections."
      },
      {
        id: 'seg-27',
        speaker: 'Alex',
        timestamp: '11:32',
        text: "Approved. Let's merge both PRs before Friday staging freeze."
      }
    ],
    summary: 'Reviewed sprint metrics and addressed database search latency. Validated Redis caching fix dropping p99 latency from 840ms to 68ms. Approved transition to mobile card-based responsiveness to eliminate horizontal scroll bugs.',
    keyPoints: [
      'Search latency p99 dropped by 92% (840ms -> 68ms) via Redis caching and pg_trgm indices.',
      'Mobile table overflow bug resolved by switching to adaptive card layout for viewports < 390px.',
      'PgBouncer connection pool capacity approved to expand from 25 to 60.'
    ],
    decisions: [
      {
        id: 'dec-104',
        meetingId: 'meet-003',
        meetingTitle: 'Engineering Sprint Review & Performance Architecture',
        date: '2026-10-03',
        decision: 'Standardize on responsive card layouts for all mobile data views.',
        context: 'Fixes horizontal overflow on compact smartphone displays.',
        owner: 'David',
        participants: ['Alex', 'David', 'Priya']
      },
      {
        id: 'dec-105',
        meetingId: 'meet-003',
        meetingTitle: 'Engineering Sprint Review & Performance Architecture',
        date: '2026-10-03',
        decision: 'Adopt Redis key-value cache layer with 15-minute TTL for meeting search queries.',
        context: 'Prevents database connection saturation during peak workday hours.',
        owner: 'Arjun',
        participants: ['Alex', 'Arjun', 'David']
      }
    ],
    actionItems: [
      {
        id: 'act-207',
        meetingId: 'meet-003',
        meetingTitle: 'Engineering Sprint Review & Performance Architecture',
        task: 'Refactor mobile table layouts to adaptive card grid across dashboard views',
        owner: 'David',
        dueDate: 'Friday, Oct 10',
        priority: 'Medium',
        status: 'Open',
        createdAt: '2026-10-03T11:40:00Z'
      },
      {
        id: 'act-208',
        meetingId: 'meet-003',
        meetingTitle: 'Engineering Sprint Review & Performance Architecture',
        task: 'Tune PgBouncer configuration and deploy pool size increase to 60 connections',
        owner: 'Arjun',
        dueDate: 'Tomorrow, 6:00 PM',
        priority: 'High',
        status: 'Completed',
        createdAt: '2026-10-03T11:40:00Z'
      }
    ],
    risks: [
      'Redis memory exhaustion if cache eviction strategy is not configured to allkeys-lru.'
    ],
    questions: [
      'Can we introduce compression for transcripts exceeding 100k tokens?'
    ],
    nextSteps: [
      'Benchmark p99 latency after 48 hours of production traffic.',
      'QA mobile views on iOS Safari and Android Chrome.'
    ],
    createdAt: '2026-10-03T12:00:00Z'
  }
];
