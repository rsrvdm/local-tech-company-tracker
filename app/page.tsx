'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  Briefcase,
  Check,
  ClipboardCheck,
  Cloud,
  FileText,
  Globe2,
  HeartHandshake,
  Home,
  Menu,
  MessageSquare,
  Plus,
  Rocket,
  Settings2,
  Sparkles,
  Users,
  WandSparkles,
  X,
} from 'lucide-react';
type Stage =
  | 'Prospect'
  | 'Audit'
  | 'Audited'
  | 'Demo'
  | 'Proposal'
  | 'Won'
  | 'Build'
  | 'Review'
  | 'Live'
  | 'Care Plan';
type DemoBrief = {
  hero: string;
  sections: string[];
  servicePages: string[];
  proof: string[];
  ctas: string[];
  seo: string[];
  placeholders: string[];
  createdAt: string;
};
type SiteCheck = {
  checkedAt: string;
  finalUrl: string;
  classification: string;
  signals: {
    pages: number;
    forms: number;
    phone: number;
    serviceTerms: number;
    locationTerms: number;
    proofTerms: number;
    headings: number;
    images: number;
    schema: boolean;
    title: boolean;
    description: boolean;
    quoteFlow: boolean;
  };
  warning: string;
};
type Verification = {
  identityMatched: boolean;
  websiteStatus: 'unverified' | 'active' | 'no-website' | 'offline';
  historyChecked: boolean;
  evidence: string;
  verifiedAt?: string;
};
type AuditResult = SiteCheck & {
  scores: number[];
  issues: string[];
  opportunities: string[];
  salesAngle: string;
  error?: string;
};
type Rec = {
  id: string;
  no?: string;
  name: string;
  industry: string;
  website: string;
  stage: Stage;
  value: number;
  next: string;
  priority?: string;
  opportunity?: number;
  auditBasis?: string;
  scores?: number[];
  issues?: string[];
  opps?: string[];
  architecture?: string[];
  nextActions?: string[];
  salesAngle?: string;
  auditUpdatedAt?: string;
  siteCheck?: SiteCheck;
  verification?: Verification;
  demo?: string[];
  demoBrief?: DemoBrief;
  proposal?: { name: string; price: number; care: number; status: string };
  checks?: boolean[];
  care?: { name: string; mrr: number };
  portal?: { approval: string; revisions: string[]; messages: string[] };
  deploy?: {
    repo: string;
    preview: string;
    production: string;
    status: string;
    versions: string[];
  };
};
const stages: Stage[] = [
  'Prospect',
  'Audited',
  'Demo',
  'Proposal',
  'Won',
  'Build',
  'Review',
  'Live',
  'Care Plan',
];
const labels = [
  'Visual credibility',
  'Trust / social proof',
  'Conversion',
  'SEO structure',
  'Local SEO',
  'Content quality',
  'Technical polish',
];
const tasks = [
  'Scope approved',
  'Content and photos received',
  'Domain confirmed',
  'Forms tested',
  'Analytics configured',
  'On-page SEO complete',
  'Mobile and browser QA',
  'Client approval recorded',
  'Launch backup captured',
];
const dan: Rec = {
  id: 'dan',
  no: '001',
  name: 'Dan Amato Landscaping',
  industry: 'Landscaping',
  website: 'https://danamatolandscapes.com.au/',
  stage: 'Audited',
  value: 3500,
  next: 'Use outreach angle and book a redesign conversation',
  auditBasis: 'Preseeded manual benchmark · verify facts before outreach',
  auditUpdatedAt: '2026-08-31',
  scores: [68, 58, 42, 38, 46, 65, 61],
  issues: [
    'One-page brochure structure and missing dedicated service pages weaken SEO architecture',
    'Reviews are underused and the contact flow does not make quoting easy',
    'Generic homepage positioning, copy consistency issues and an ABN discrepancy require manual confirmation',
    'Project photos are not developed into persuasive case studies',
    'Local SEO coverage is underdeveloped',
  ],
  opps: [
    'Build dedicated pages for each high-value service and location',
    'Turn genuine project photos into proof-rich case studies',
    'Use reviews and a structured photo quote form at key decision points',
    'Position the business clearly around its strongest landscaping outcomes',
  ],
  architecture: [
    'Home',
    'Services',
    'Landscaping',
    'Retaining walls',
    'Paving',
    'Turf & drainage',
    'Projects / case studies',
    'Reviews',
    'Service areas',
    'About',
    'Get a quote',
  ],
  nextActions: [
    'Confirm legal business name and ABN directly with Dan',
    'Verify services, service areas, review count and approved photos',
    'Send concise rebuild outreach and offer a tailored homepage demo',
  ],
  salesAngle:
    'Dan already has the reputation, photography and service range. The opportunity is a full rebuild that brings the website up to the standard of the work and turns more local visits into qualified quote enquiries.',
  proposal: { name: 'Growth Website', price: 3500, care: 199, status: 'Draft' },
  checks: [true, true, false, false, false, false, false, false, false],
  care: { name: 'Growth Care', mrr: 199 },
  portal: {
    approval: 'Awaiting demo review',
    revisions: [],
    messages: ['MWC: Your redesign concept is ready for review.'],
  },
  deploy: {
    repo: 'Not connected',
    preview: 'https://rsrvdm.github.io/dan-amato-landscaping-preview/',
    production: '',
    status: 'Preview live',
    versions: ['v0.1 — Initial redesign preview'],
  },
};
const spruced: Rec = {
  id: 'spruced',
  name: 'Spruced Up Pressure Cleaning',
  industry: 'Pressure cleaning',
  website: '',
  stage: 'Audited',
  value: 2400,
  next: 'Verify website and facts, then use outreach angle',
  auditUpdatedAt: '2026-08-31',
  scores: [44, 72, 35, 31, 48, 40, 45],
  issues: [
    'No strong owned website surfaced',
    'Enquiries appear to rely on directory and social profiles',
    'Services and service areas lack searchable landing pages',
  ],
  opps: [
    'Lead with excellent reviews',
    'Use a before-and-after gallery',
    'Add a fast photo quote flow',
    'Create dedicated service pages',
  ],
  architecture: [
    'Home',
    'Pressure cleaning',
    'Softwashing',
    'Roof cleaning',
    'Commercial',
    'Before & after',
    'Reviews',
    'Service areas',
    'Get a quote',
  ],
  nextActions: [
    'Confirm whether an owned website exists',
    'Verify reviews, services and service areas',
    'Offer a review-led homepage concept',
  ],
  salesAngle:
    'Your customer reputation is already doing the hard work. A simple owned website could turn that trust into more direct photo-quote enquiries and make each service easier to find locally.',
};
const rows: [string, string, number, string, string][] = [
  [
    'Coast Window Cleaning',
    'Window cleaning',
    93,
    'A',
    'Strong reputation; weak standalone-web visibility',
  ],
  [
    'On-The-Go Auto Repairs',
    'Mechanic',
    93,
    'A',
    'Strong demand signal; owned-site opportunity',
  ],
  [
    'Neave Electrical',
    'Electrician',
    72,
    'B',
    'Modern site; growth services fit better',
  ],
  [
    "Allen's Roof SoftWashing",
    'Exterior cleaning',
    93,
    'A',
    'Excellent reviews; potentially large website gap',
  ],
  [
    'Todd Williams Plumbing and Gas Fitting',
    'Plumbing',
    92,
    'A',
    'Exceptional reputation; huge commercial potential',
  ],
  [
    'Bugs Or Us Pest Control - Forster',
    'Pest control',
    91,
    'A',
    'Strong reviews; local SEO opportunity',
  ],
  [
    'Power Made Constructions',
    'Construction',
    91,
    'A',
    'High-value projects and strong reviews',
  ],
  [
    'Forster Tuncurry Removals & Storage',
    'Removals',
    90,
    'A',
    'Existing site has template and contact defects',
  ],
  [
    'Great Lakes Plumbing & Drainage',
    'Plumbing',
    90,
    'A',
    'Great reviews; strong lead-generation prospect',
  ],
  [
    'Superior Electrical & Solar Services',
    'Electrical / solar',
    89,
    'A',
    'High-value jobs and local reputation',
  ],
  [
    'Lakesway Plumbing and Gas',
    'Plumbing',
    89,
    'A',
    'Established reputation; lead-driven trade',
  ],
  [
    'Hunter and Coast Pest Control - Mid North Coast',
    'Pest control',
    88,
    'A',
    'SEO-intensive industry',
  ],
  ['CPAINT', 'Painting', 68, 'B', 'Substantial existing website'],
  [
    'Dans Roof And Guttering',
    'Roofing',
    76,
    'B',
    'Existing site; conversion and SEO opportunity',
  ],
  [
    'Hallidays Point Plumbing',
    'Plumbing',
    88,
    'A',
    'High-value service and good reputation',
  ],
  [
    'Bluebeard Lawn and Gardens',
    'Lawn / gardens',
    87,
    'A',
    'Strong reputation; ideal website prospect',
  ],
  [
    'Nabiac Motors',
    'Automotive',
    87,
    'A',
    'Established shop; booking opportunity',
  ],
  [
    'MKS Mobile Auto Electrics',
    'Auto electrical',
    87,
    'A',
    'Mobile service suits local SEO',
  ],
  [
    'The Leisure Repair Centre',
    'Caravan / RV repair',
    86,
    'A',
    'High-value niche',
  ],
  [
    'Forster Heights Cleaning',
    'Cleaning',
    86,
    'A',
    'Strong starter-site candidate',
  ],
  [
    'Brayden Stewart Building',
    'Construction',
    86,
    'A',
    'Visual portfolio opportunity',
  ],
  [
    'Tuncurry Auto Electricians',
    'Auto electrical',
    84,
    'A',
    'Established workshop; digital upgrade',
  ],
  [
    'Forster Landscaping',
    'Landscaping',
    79,
    'B',
    'Existing site is relatively simple',
  ],
  [
    'MidCoast Tree Solutions',
    'Tree services',
    84,
    'A',
    'High-ticket local SEO prospect',
  ],
  ['All Things Handled', 'Handyman', 84, 'A', 'Owner-operated sales target'],
  [
    'Justice Removals Forster',
    'Removals',
    83,
    'A',
    'Strong demand and lead value',
  ],
  [
    'Barrington Coast Homes',
    'Construction',
    83,
    'A',
    'High-value converted leads',
  ],
  [
    'Hilton Built Construction',
    'Builder / sheds',
    82,
    'A',
    'High-ticket niche',
  ],
  ['McCarthy & Sons Excavating', 'Earthmoving', 82, 'A', 'High contract value'],
  [
    'Nabiac Excavation Services',
    'Excavation',
    82,
    'A',
    'Weak search footprint',
  ],
  [
    'Outboard & Diesel Service',
    'Marine mechanics',
    81,
    'A',
    'Limited owned digital presence',
  ],
  [
    'Micyan building services',
    'Building / fencing',
    81,
    'A',
    'Small local operator',
  ],
  ["Allan's Fencing", 'Fencing', 80, 'A', 'Quote-focused website fit'],
  [
    'Peter King Constructions pty ltd',
    'Carpentry / building',
    80,
    'A',
    'Weak visible search presence',
  ],
  [
    'Great Lakes Decorative Concrete',
    'Concrete',
    80,
    'A',
    'Visual portfolio-site fit',
  ],
  [
    'One mile property services',
    'Lawn / property',
    79,
    'B',
    'Recurring service business',
  ],
  ['Propaint Forster', 'Painting', 79, 'B', 'Strong reviews; visual service'],
  [
    'Clean the Coast Forster Professional cleaning',
    'Cleaning',
    78,
    'B',
    'Local SEO and quote capture',
  ],
  ['Mitch Amato Tiling', 'Tiling', 77, 'B', 'Starter website prospect'],
  [
    'Aquas Pool Equipment and Service',
    'Pool service',
    77,
    'B',
    'Recurring work opportunity',
  ],
  [
    'Harbour City Homes',
    'Home building',
    76,
    'B',
    'High-value sophisticated pitch',
  ],
  [
    'Vital Property Services Pty Ltd',
    'Property maintenance',
    76,
    'B',
    'Managed-web potential',
  ],
  ['Turbo Clean', 'Carpet cleaning', 74, 'B', 'Search and quote opportunity'],
  [
    'Aircon Mid North Coast',
    'Air conditioning',
    73,
    'B',
    'Commercially valuable',
  ],
  [
    'Forster Fishing Charters',
    'Charter',
    67,
    'C',
    'Bookings and UX opportunity',
  ],
  ['Graham Barclay Marine', 'Marine', 61, 'C', 'Capable site and bookings'],
  [
    'Diamond Beach Carpet Cleaning & Pest Control',
    'Cleaning / pest',
    58,
    'C',
    'Strong functioning site',
  ],
  [
    'Forster Air Conditioning and Electrical Pty Ltd',
    'Electrical / HVAC',
    42,
    'D',
    'Excellent modern site; do not chase',
  ],
];
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
function triage(
  name: string,
  industry: string,
  opportunity: number,
  priority: string,
  note: string,
): Rec {
  const strong = opportunity < 70,
    base = Math.max(28, Math.min(82, 108 - opportunity)),
    scores = [
      base + (strong ? 7 : 2),
      Math.min(86, base + 25),
      base - 4,
      base - 7,
      base - 2,
      base,
      base + 3,
    ].map((n) => Math.max(20, Math.min(92, n)));
  return {
    id: slug(name),
    name,
    industry,
    website: '',
    stage: 'Audited',
    value: /Construction|building|Earthmoving|Excavation|Homes|Concrete/i.test(
      industry,
    )
      ? 4500
      : 2800,
    next: strong
      ? 'Review optimisation opportunity'
      : 'Verify website and facts before outreach',
    priority,
    opportunity,
    auditBasis: 'Research-based triage audit · live verification required',
    auditUpdatedAt: '2026-08-31',
    scores,
    issues: [
      note,
      strong
        ? 'Existing digital presence reduces the case for a rebuild'
        : 'Owned website, mobile experience and conversion path require verification',
      'Service and location search coverage needs page-by-page checking',
    ],
    opps: [
      strong
        ? 'Conversion optimisation, SEO and automation'
        : 'Turn reputation into an owned web presence',
      /Construction|building|Earthmoving|Excavation|Homes|Concrete/i.test(
        industry,
      )
        ? 'Use project case studies to sell high-value work'
        : 'Add a fast quote or booking pathway',
      'Build verified service and location pages',
    ],
    architecture: [
      'Home',
      'Services',
      'Featured work',
      'Reviews',
      'Service areas',
      'About',
      'Get a quote',
    ],
    nextActions: [
      'Verify website and business facts',
      'Personalise the outreach angle',
      'Offer a focused homepage concept',
    ],
    salesAngle: `${name} already has a market signal worth building on. MWC can turn it into a clearer, more searchable website with a faster path to enquiry.`,
  };
}
const bulk = rows
  .map((r) => triage(...r))
  .map((r) => ({
    ...r,
    stage: 'Prospect' as Stage,
    next: 'Website URL required before audit',
    scores: undefined,
    issues: undefined,
    opps: undefined,
    salesAngle: undefined,
    auditUpdatedAt: undefined,
    auditBasis: 'Unverified research lead · not yet audited',
  }))
  .map((r) =>
    r.id === slug('Todd Williams Plumbing and Gas Fitting')
      ? {
          ...r,
          website: 'https://www.toddwilliamsplumbingandgasfitting.com.au/',
          stage: 'Prospect' as Stage,
          next: 'Run website check before outreach',
          scores: undefined,
          issues: undefined,
          opps: undefined,
          salesAngle: undefined,
          auditUpdatedAt: undefined,
        }
      : r,
  );
const seed = [
  dan,
  {
    ...spruced,
    stage: 'Prospect' as Stage,
    scores: undefined,
    issues: undefined,
    opps: undefined,
    salesAngle: undefined,
    auditUpdatedAt: undefined,
    next: 'Website URL required before audit',
    priority: 'A',
    opportunity: 94,
    auditBasis: 'Research-based triage audit · live verification required',
  },
  ...bulk,
];
const nav = [
  ['dashboard', 'Dashboard', Home],
  ['pipeline', 'Pipeline', Briefcase],
  ['auditor', 'Auditor', ClipboardCheck],
  ['demo', 'Demo Generator', WandSparkles],
  ['proposal', 'Proposals', FileText],
  ['production', 'Production', Settings2],
  ['care', 'Care Plans', HeartHandshake],
  ['portal', 'Client Portal', Users],
  ['deployment', 'Deployments', Rocket],
] as const;
const money = (n: number) =>
  new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(n);
const average = (a: number[] = []) =>
  Math.round(a.reduce((x, y) => x + y, 0) / (a.length || 1));
const isContactReady = (r: Rec) =>
  Boolean(
    r.scores &&
      r.verification?.identityMatched &&
      r.verification.historyChecked &&
      r.verification.evidence.trim() &&
      r.verification.websiteStatus !== 'unverified' &&
      (r.verification.websiteStatus === 'no-website' || r.siteCheck),
  );
const routeFor = (s: Stage) =>
  s === 'Prospect' || s === 'Audit' || s === 'Audited'
    ? 'auditor'
    : s.toLowerCase().replace('care plan', 'care');
export default function Page() {
  const [data, setData] = useState<Rec[]>(seed),
    [ready, setReady] = useState(false),
    [view, setView] = useState('dashboard'),
    [id, setId] = useState('dan'),
    [mobile, setMobile] = useState(false),
    [toast, setToast] = useState('');
  useEffect(() => {
    try {
      const v = localStorage.getItem('mwc-os-v1');
      if (v) {
        const saved: Rec[] = JSON.parse(v).map(
            (x: Rec & { stage: 'Audit' | Stage }) => ({
              ...x,
              stage: x.stage === 'Audit' ? 'Audited' : x.stage,
            }),
          ),
          merged = seed.map((fresh) => ({
            ...fresh,
            ...saved.find((x) => x.id === fresh.id),
          })),
          normalized = merged.map((x) =>
            !isContactReady(x) && x.id !== 'dan'
              ? {
                  ...x,
                  stage: 'Prospect' as Stage,
                  scores: undefined,
                  auditUpdatedAt: undefined,
                  next: 'Unverified — do not contact',
                  priority: undefined,
                }
              : x,
          );
        setData([
          ...normalized,
          ...saved.filter(
            (x) => x.id !== 'todd' && !seed.some((y) => y.id === x.id),
          ),
        ]);
      }
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem('mwc-os-v1', JSON.stringify(data));
  }, [data, ready]);
  const rec = data.find((r) => r.id === id) || data[0],
    patch = (p: Partial<Rec>) =>
      setData((d) => d.map((r) => (r.id === rec.id ? { ...r, ...p } : r))),
    say = (s: string) => {
      setToast(s);
      setTimeout(() => setToast(''), 2200);
    },
    advance = () => {
      const next = stages[Math.min(stages.indexOf(rec.stage) + 1, 8)];
      patch({ stage: next });
      say(`${rec.name} moved to ${next}`);
    },
    addProspect = (r: Rec) => {
      setData((d) => [r, ...d]);
      setId(r.id);
      setView('auditor');
      say(`${r.name} added to Pipeline`);
    };
  const stats = useMemo(
    () => ({
      pipeline: data
        .filter((r) => stages.indexOf(r.stage) < 4)
        .reduce((a, r) => a + r.value, 0),
      mrr: data.reduce((a, r) => a + (r.care?.mrr || 0), 0),
      conversion: Math.round(
        (data.filter((r) => stages.indexOf(r.stage) >= 4).length /
          data.length) *
          100,
      ),
      proposals: data.filter((r) => r.proposal?.status === 'Sent').length,
      builds: data.filter((r) => ['Build', 'Review'].includes(r.stage)).length,
      care: data.filter((r) => r.care).length,
    }),
    [data],
  );
  return (
    <main className="os">
      <aside className={mobile ? 'open' : ''}>
        <Brand close={() => setMobile(false)} />
        <nav>
          {nav.map(([v, l, I]) => (
            <button
              className={view === v ? 'on' : ''}
              key={v}
              onClick={() => {
                setView(v);
                setMobile(false);
              }}
            >
              <I />
              {l}
            </button>
          ))}
        </nav>
        <div className="domain">
          <Globe2 />
          <div>
            <b>midcoastweb.au</b>
            <small>Browser-local V1 · manual audit</small>
          </div>
        </div>
      </aside>
      <section className="work">
        <header>
          <button className="hamb" onClick={() => setMobile(true)}>
            <Menu />
          </button>
          <div>
            <small>MIDCOAST WEB CO.</small>
            <h1>{nav.find((n) => n[0] === view)?.[1]}</h1>
          </div>
          <select value={id} onChange={(e) => setId(e.target.value)}>
            {data.map((r) => (
              <option key={r.id} value={r.id}>
                {r.no ? `#${r.no} · ` : ''}
                {r.name}
              </option>
            ))}
          </select>
        </header>
        {view === 'dashboard' && (
          <Dashboard
            data={data}
            stats={stats}
            go={(r, v) => {
              setId(r);
              setView(v);
            }}
          />
        )}
        {view === 'pipeline' && (
          <Pipeline
            data={data}
            go={(r, v) => {
              setId(r);
              setView(v);
            }}
          />
        )}
        {view === 'auditor' && (
          <Auditor
            rec={rec}
            patch={patch}
            add={addProspect}
            all={data}
            updateAll={setData}
            say={say}
            goDemo={() => setView('demo')}
          />
        )}{' '}
        {view === 'demo' && (
          <Demo rec={rec} patch={patch} next={advance} say={say} />
        )}{' '}
        {view === 'proposal' && (
          <Proposal rec={rec} patch={patch} next={advance} say={say} />
        )}{' '}
        {view === 'production' && (
          <Production rec={rec} patch={patch} next={advance} />
        )}{' '}
        {view === 'care' && <Care rec={rec} patch={patch} />}{' '}
        {view === 'portal' && <Portal rec={rec} patch={patch} say={say} />}{' '}
        {view === 'deployment' && (
          <Deploy rec={rec} patch={patch} next={advance} say={say} />
        )}
      </section>
      {toast && (
        <div className="toast">
          <Check />
          {toast}
        </div>
      )}
    </main>
  );
}
function Brand({ close }: { close: () => void }) {
  return (
    <div className="brand">
      <span>MWC</span>
      <div>
        <b>MidCoast Web Co.</b>
        <small>Operating system</small>
      </div>
      <button onClick={close}>
        <X />
      </button>
    </div>
  );
}
function Dashboard({
  data,
  stats,
  go,
}: {
  data: Rec[];
  stats: any;
  go: (a: string, b: string) => void;
}) {
  return (
    <Surface>
      <div className="hero">
        <div>
          <em>COMPANY CONTROL CENTRE</em>
          <h2>One record. Every stage. No lost handovers.</h2>
          <p>Run MWC from first audit through launch and recurring care.</p>
        </div>
        <strong>
          MWC<small>WEBSITES · SEO · AUTOMATION</small>
        </strong>
      </div>
      <div className="metrics">
        {[
          ['Pipeline value', money(stats.pipeline)],
          ['Monthly recurring', money(stats.mrr)],
          ['Conversion rate', `${stats.conversion}%`],
          ['Outstanding proposals', stats.proposals],
          ['Active builds', stats.builds],
          ['Care plan clients', stats.care],
        ].map(([a, b]) => (
          <div key={a}>
            <span>{a}</span>
            <b>{b}</b>
          </div>
        ))}
      </div>
      <section className="panel">
        <h3>Live workflow</h3>
        {data.map((r) => (
          <button
            className="record"
            key={r.id}
            onClick={() => go(r.id, routeFor(r.stage))}
          >
            <i>
              {r.no ||
                r.name
                  .split(' ')
                  .map((x) => x[0])
                  .slice(0, 2)
                  .join('')}
            </i>
            <div>
              <b>{r.name}</b>
              <small>
                {r.industry} · {r.next}
              </small>
            </div>
            <Stage s={r.stage} />
            <strong>{money(r.value)}</strong>
          </button>
        ))}
      </section>
    </Surface>
  );
}
function Pipeline({
  data,
  go,
}: {
  data: Rec[];
  go: (a: string, b: string) => void;
}) {
  return (
    <Surface>
      <Intro
        n="SHARED RECORDS"
        h="Prospect → care plan"
        p="Only evidence-verified prospects can become contact-ready. Unverified research leads remain blocked."
      />
      <div className="kanban">
        {stages.map((s) => (
          <section key={s}>
            <header>
              <b>{s}</b>
              <span>{data.filter((r) => r.stage === s).length}</span>
            </header>
            {data
              .filter((r) => r.stage === s)
              .map((r) => (
                <button
                  key={r.id}
                  onClick={() =>
                    go(r.id, r.scores ? 'auditor' : routeFor(r.stage))
                  }
                >
                  <small>
                    {r.no
                      ? `PROJECT #${r.no} · ${isContactReady(r) ? 'CONTACT READY' : 'MANUAL BENCHMARK'}`
                      : isContactReady(r)
                        ? 'VERIFIED · CONTACT READY'
                        : 'UNVERIFIED · DO NOT CONTACT'}
                  </small>
                  <b>{r.name}</b>
                  {r.scores && (
                    <i className="pipescore">{average(r.scores)}/100</i>
                  )}
                  <span>{r.next}</span>
                  <strong>
                    {r.scores ? 'Open saved audit' : money(r.value)}
                  </strong>
                </button>
              ))}
          </section>
        ))}
      </div>
    </Surface>
  );
}
const makeBrief = (r: Rec): DemoBrief => ({
  hero:
    r.id === 'dan'
      ? 'Landscapes built for life on the MidCoast'
      : `${r.name}: trusted local ${r.industry.toLowerCase()}`,
  sections: [
    'Trust-led homepage hero',
    'Core services overview',
    'Featured work / case studies',
    'Why choose us / process',
    'Reviews and proof',
    'Service areas',
    'Fast quote pathway',
  ],
  servicePages: (r.architecture || []).filter(
    (x) =>
      !['Home', 'About', 'Reviews', 'Service areas', 'Get a quote'].some((y) =>
        x.toLowerCase().includes(y.toLowerCase()),
      ),
  ),
  proof: [
    'Verified Google review rating and count',
    'Approved project or before-and-after photos',
    'Licences, experience and guarantees — only when verified',
    'Named project case studies',
  ],
  ctas: ['Request a quote', 'Call now', 'Upload photos for an estimate'],
  seo: [
    'One clear page per priority service',
    'Verified town and service-area coverage',
    'Unique titles, headings and helpful service copy',
    'LocalBusiness schema and consistent contact details',
  ],
  placeholders: [
    '[VERIFY legal business name and ABN]',
    '[VERIFY phone, email and service areas]',
    '[INSERT approved business photos]',
    '[VERIFY review wording, rating and count]',
    '[CONFIRM services, credentials and guarantees]',
  ],
  createdAt: new Date().toISOString(),
});
function Auditor({
  rec,
  patch,
  add,
  all,
  updateAll,
  say,
  goDemo,
}: {
  rec: Rec;
  patch: (p: Partial<Rec>) => void;
  add: (r: Rec) => void;
  all: Rec[];
  updateAll: React.Dispatch<React.SetStateAction<Rec[]>>;
  say: (s: string) => void;
  goDemo: () => void;
}) {
  const [name, setName] = useState(''),
    [site, setSite] = useState(''),
    [checking, setChecking] = useState(false);
  const verification = rec.verification || {
      identityMatched: false,
      websiteStatus: 'unverified' as const,
      historyChecked: false,
      evidence: '',
    },
    contactReady = isContactReady(rec);
  const scores = rec.scores || [50, 50, 50, 50, 50, 50, 50],
    issues = rec.issues || [
      'Conversion path needs improvement',
      'Search structure needs dedicated service and area pages',
      'Trust signals need stronger placement',
    ],
    opps = rec.opps || [
      'Make the business reputation visible',
      'Create a faster quote pathway',
      'Build service-led search visibility',
    ],
    architecture = rec.architecture || [
      'Home',
      'Services',
      'Projects',
      'Reviews',
      'Service areas',
      'About',
      'Get a quote',
    ],
    nextActions = rec.nextActions || [
      'Verify business facts and website findings',
      'Personalise the sales angle',
      'Contact the prospect with one clear opportunity',
    ],
    salesAngle =
      rec.salesAngle ||
      `${rec.name} has a clear opportunity to turn its reputation and services into a more credible, searchable website with a faster route to enquiry.`;
  const run = () => {
      if (!verification.identityMatched)
        return say('Confirm the business identity before saving an audit');
      if (verification.websiteStatus === 'unverified')
        return say('Confirm the website status before saving an audit');
      if (!verification.historyChecked || !verification.evidence.trim())
        return say('Record the website-history evidence first');
      if (verification.websiteStatus !== 'no-website' && !rec.siteCheck)
        return say('Run the live website check first');
      patch({
        scores,
        issues,
        opps,
        architecture,
        nextActions,
        salesAngle,
        stage: 'Audited',
        auditUpdatedAt: new Date().toISOString(),
        next: 'Use outreach angle and offer a tailored demo',
        verification: {
          ...verification,
          verifiedAt: new Date().toISOString(),
        },
      });
      say('Audit saved to prospect · stage set to Audited');
    },
    checkWebsite = async () => {
      if (!rec.website.trim()) return say('Enter the website URL first');
      setChecking(true);
      try {
        const response = await fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: rec.website }),
        });
        const result = (await response.json()) as AuditResult;
        if (!response.ok)
          throw new Error(result.error || 'Website check failed');
        const established = String(result.classification).startsWith(
          'Established',
        );
        patch({
          website: result.finalUrl,
          siteCheck: result,
          verification: {
            ...verification,
            websiteStatus: 'active',
            verifiedAt: undefined,
          },
          scores: result.scores,
          issues: result.issues,
          opps: result.opportunities,
          salesAngle: result.salesAngle,
          auditBasis:
            'Automated structural website check · manual visual verification required',
          priority: established ? 'C' : rec.priority,
          next: established
            ? 'Deprioritised — established website; optimisation only'
            : 'Confirm business match and evidence before outreach',
        });
        say(
          established
            ? 'Established website detected · rebuild pitch blocked'
            : 'Website evidence captured',
        );
      } catch (error) {
        say(error instanceof Error ? error.message : 'Website check failed');
      } finally {
        setChecking(false);
      }
    },
    checkAll = async () => {
      const targets = all.filter((r) => r.website.trim() && !r.siteCheck);
      if (!targets.length) return say('No unchecked website URLs found');
      setChecking(true);
      say(`Checking ${targets.length} prospect websites…`);
      const checked = await Promise.all(
        targets.map(async (target) => {
          try {
            const response = await fetch('/api/audit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: target.website }),
            });
            const result = (await response.json()) as AuditResult;
            if (!response.ok) throw new Error(result.error || 'Check failed');
            const established = result.classification.startsWith('Established');
            return {
              id: target.id,
              result,
              established,
            };
          } catch {
            return null;
          }
        }),
      );
      updateAll((records) =>
        records.map((record) => {
          const found = checked.find((x) => x?.id === record.id);
          if (!found) return record;
          return {
            ...record,
            website: found.result.finalUrl,
            siteCheck: found.result,
            scores: found.result.scores,
            issues: found.result.issues,
            opps: found.result.opportunities,
            salesAngle: found.result.salesAngle,
            auditBasis:
              'Automated structural website check · manual visual verification required',
            priority: found.established ? 'C' : record.priority,
            next: found.established
              ? 'Deprioritised — established website; optimisation only'
              : 'Review automated evidence before outreach',
          };
        }),
      );
      setChecking(false);
      say(
        `${checked.filter(Boolean).length} websites checked · missing URLs flagged`,
      );
    },
    generate = () => {
      if (!contactReady)
        return say('Prospect is not verified and contact-ready yet');
      if (rec.website && !rec.siteCheck)
        return say('Run the website check before generating a pitch');
      patch({
        demoBrief: makeBrief({
          ...rec,
          scores,
          issues,
          opps,
          architecture,
          nextActions,
          salesAngle,
        }),
        demo: makeBrief(rec).sections,
        stage: 'Demo',
        next: 'Review demo brief and prepare concept',
      });
      say('Structured demo brief saved');
      goDemo();
    },
    copy = async () => {
      await navigator.clipboard.writeText(salesAngle);
      say('Outreach angle copied');
    },
    create = () => {
      if (!name.trim()) return say('Enter a business name first');
      add({
        id: `${slug(name)}-${Date.now().toString().slice(-5)}`,
        name: name.trim(),
        industry: 'Local business',
        website: site.trim(),
        stage: 'Prospect',
        value: 2800,
        next: 'Unverified — do not contact',
      });
    };
  return (
    <Surface>
      <Intro
        n="01 · WEBSITE AUDITOR"
        h={rec.name}
        p="Check the real website first, then review the evidence and save the audit. Structural checks are automatic; visual quality, rankings, reviews and business facts still need confirmation."
      />
      <section className="newprospect">
        <div>
          <b>Add a prospect</b>
          <small>Or select an existing prospect from the menu above.</small>
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Business name"
        />
        <input
          value={site}
          onChange={(e) => setSite(e.target.value)}
          placeholder="https://website.com.au"
        />
        <button onClick={create}>
          <Plus />
          Add & audit
        </button>
        <button onClick={checkAll} disabled={checking}>
          <Globe2 />
          Check all saved URLs
        </button>
      </section>
      <section className="sitecheck">
        <div>
          <b>Website to check</b>
          <small>The audit and sales angle will be based on this URL.</small>
        </div>
        <input
          value={rec.website}
          onChange={(e) =>
            patch({ website: e.target.value, siteCheck: undefined })
          }
          placeholder="https://business-website.com.au"
        />
        <button className="primary" onClick={checkWebsite} disabled={checking}>
          <Globe2 />
          {checking ? 'Checking website…' : 'Check website now'}
        </button>
      </section>
      {rec.siteCheck && (
        <section
          className={
            rec.siteCheck.classification.startsWith('Established')
              ? 'evidence established'
              : 'evidence'
          }
        >
          <div>
            <em>LIVE WEBSITE RESULT</em>
            <h3>{rec.siteCheck.classification}</h3>
            <p>{rec.siteCheck.warning}</p>
          </div>
          <div className="signals">
            <span>
              <b>{rec.siteCheck.signals.pages}</b> pages found
            </span>
            <span>
              <b>{rec.siteCheck.signals.forms}</b> forms found
            </span>
            <span>
              <b>{rec.siteCheck.signals.serviceTerms}</b> service signals
            </span>
            <span>
              <b>{rec.siteCheck.signals.locationTerms}</b> location signals
            </span>
            <span>
              <b>{rec.siteCheck.signals.proofTerms}</b> trust signals
            </span>
            <span>
              <b>{rec.siteCheck.signals.quoteFlow ? 'Yes' : 'No'}</b> quote path
            </span>
          </div>
        </section>
      )}
      <section className="sitecheck">
        <div>
          <b>Contact-readiness gate</b>
          <small>No score or outreach can be saved until every item is proven.</small>
        </div>
        <label>
          <input
            type="checkbox"
            checked={verification.identityMatched}
            onChange={(e) =>
              patch({
                verification: {
                  ...verification,
                  identityMatched: e.target.checked,
                  verifiedAt: undefined,
                },
              })
            }
          />
          Name, location and phone match the same business
        </label>
        <select
          value={verification.websiteStatus}
          onChange={(e) =>
            patch({
              verification: {
                ...verification,
                websiteStatus: e.target.value as Verification['websiteStatus'],
                verifiedAt: undefined,
              },
            })
          }
        >
          <option value="unverified">Website status not verified</option>
          <option value="active">Active website found</option>
          <option value="no-website">No owned website confirmed</option>
          <option value="offline">Previous website is offline</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={verification.historyChecked}
            onChange={(e) =>
              patch({
                verification: {
                  ...verification,
                  historyChecked: e.target.checked,
                  verifiedAt: undefined,
                },
              })
            }
          />
          Current profile and previous website history checked
        </label>
        <input
          value={verification.evidence}
          onChange={(e) =>
            patch({
              verification: {
                ...verification,
                evidence: e.target.value,
                verifiedAt: undefined,
              },
            })
          }
          placeholder="Evidence URL or note (required)"
        />
        <b>{contactReady ? 'Verified · contact ready' : 'Blocked · do not contact'}</b>
      </section>
      {rec.auditBasis && (
        <div className="auditnote">
          <b>{rec.auditBasis}</b>
          <span>
            {rec.opportunity ? `Opportunity ${rec.opportunity}/100 · ` : ''}
            {rec.priority ? `Priority ${rec.priority}` : 'Manual review'}
          </span>
        </div>
      )}
      <div className="top">
        <Score n={average(scores)} />
        <div className="auditmeta">
          <b>{rec.scores ? 'Audit saved' : 'Draft audit'}</b>
          <small>
            {rec.auditUpdatedAt
              ? `Updated ${new Date(rec.auditUpdatedAt).toLocaleDateString('en-AU')}`
              : 'Move the sliders and save when reviewed'}
          </small>
        </div>
        <div className="buttons">
          <button className="primary" onClick={run}>
            <Sparkles />
            Save completed audit
          </button>
          <button onClick={generate}>
            <WandSparkles />
            Generate demo brief
          </button>
        </div>
      </div>
      <div className="scores">
        {labels.map((l, i) => (
          <label key={l}>
            <span>
              {l}
              <b>{scores[i]}</b>
            </span>
            <input
              aria-label={l}
              type="range"
              min="0"
              max="100"
              value={scores[i]}
              onChange={(e) => {
                const a = [...scores];
                a[i] = +e.target.value;
                patch({ scores: a });
              }}
            />
          </label>
        ))}
      </div>
      <div className="three">
        <EditList
          title="Critical issues"
          items={issues}
          change={(v) => patch({ issues: v })}
        />
        <EditList
          title="Growth opportunities"
          items={opps}
          change={(v) => patch({ opps: v })}
        />
        <EditList
          title="Next actions"
          items={nextActions}
          change={(v) => patch({ nextActions: v })}
        />
      </div>
      <EditList
        title="Recommended site architecture"
        items={architecture}
        change={(v) => patch({ architecture: v })}
      />
      <section className="quote">
        <em>CONCISE OUTREACH ANGLE</em>
        <textarea
          value={salesAngle}
          onChange={(e) => patch({ salesAngle: e.target.value })}
        />
        <button
          onClick={() =>
            contactReady ? copy() : say('Outreach is locked until verification is complete')
          }
          disabled={!contactReady}
        >
          {contactReady ? 'Copy outreach angle' : 'Outreach locked — verify first'}
        </button>
      </section>
    </Surface>
  );
}
function Demo({
  rec,
  patch,
  next,
  say,
}: {
  rec: Rec;
  patch: (p: Partial<Rec>) => void;
  next: () => void;
  say: (s: string) => void;
}) {
  const generate = () => {
      const brief = makeBrief(rec);
      patch({
        demoBrief: brief,
        demo: brief.sections,
        stage: 'Demo',
        next: 'Review demo brief and prepare concept',
      });
      say('Demo brief generated and saved');
    },
    b = rec.demoBrief;
  return (
    <Surface>
      <Intro
        n="02 · DEMO BRIEF GENERATOR"
        h="Audit → build-ready content package"
        p="The brief remains on the same prospect record for the future Demo Generator. Every unknown fact and photo stays explicitly marked for verification."
      />
      <div className="buttons">
        <button className="primary" onClick={generate}>
          <WandSparkles />
          {b ? 'Regenerate demo brief' : 'Generate demo brief'}
        </button>
        {b && <button onClick={next}>Prepare proposal</button>}
      </div>
      {b && (
        <section className="demo">
          <div className="browser">
            SAVED BRIEF · {new Date(b.createdAt).toLocaleDateString('en-AU')} ·{' '}
            {rec.website || 'WEBSITE TO VERIFY'}
          </div>
          <div className="demohero">
            <em>{rec.industry.toUpperCase()} · HOMEPAGE HERO</em>
            <h2>{b.hero}</h2>
            <button>{b.ctas[0]}</button>
          </div>
          <div className="briefgrid">
            <List title="Core homepage sections" items={b.sections} />
            <List
              title="Recommended service pages"
              items={
                b.servicePages.length
                  ? b.servicePages
                  : ['Confirm priority services']
              }
            />
            <List title="Proof elements" items={b.proof} />
            <List title="Calls to action" items={b.ctas} />
            <List title="SEO priorities" items={b.seo} />
            <List
              title="Verified facts / photo placeholders"
              items={b.placeholders}
            />
          </div>
        </section>
      )}
    </Surface>
  );
}
function Proposal({
  rec,
  patch,
  next,
  say,
}: {
  rec: Rec;
  patch: (p: Partial<Rec>) => void;
  next: () => void;
  say: (s: string) => void;
}) {
  const p = rec.proposal || {
    name: 'Growth Website',
    price: rec.value,
    care: 199,
    status: 'Draft',
  };
  return (
    <Surface>
      <Intro
        n="03 · PROPOSAL & PRICING"
        h="Client-ready scope and pricing"
        p="One proposal contains the package, scope, optional add-ons and recurring care plan."
      />
      <div className="proposal">
        <section>
          <em>PROPOSAL FOR</em>
          <h2>{rec.name}</h2>
          <p>Prepared by MidCoast Web Co. · midcoastweb.au</p>
          <h3>{p.name}</h3>
          <strong>{money(p.price)}</strong>
          <List
            title="Included scope"
            items={
              rec.demo || [
                'Strategy and architecture',
                'Responsive build',
                'Lead form and analytics',
                'On-page SEO and launch',
              ]
            }
          />
          <div className="carebox">
            <HeartHandshake />
            <div>
              <b>Growth Care</b>
              <small>Hosting, updates, backups and reporting</small>
            </div>
            <strong>{money(p.care)}/mo</strong>
          </div>
        </section>
        <aside>
          <label>
            Package
            <select
              value={p.name}
              onChange={(e) =>
                patch({ proposal: { ...p, name: e.target.value } })
              }
            >
              <option>Starter Website</option>
              <option>Growth Website</option>
              <option>Authority Website</option>
            </select>
          </label>
          <label>
            Project price
            <input
              type="number"
              value={p.price}
              onChange={(e) =>
                patch({ proposal: { ...p, price: +e.target.value } })
              }
            />
          </label>
          <button
            className="primary"
            onClick={() => {
              patch({ proposal: { ...p, status: 'Sent' }, stage: 'Proposal' });
              say('Proposal marked sent');
            }}
          >
            Save & mark sent
          </button>
          <button
            onClick={() => {
              patch({ proposal: { ...p, status: 'Accepted' }, stage: 'Won' });
              next();
              say('Proposal accepted — project won');
            }}
          >
            Mark accepted
          </button>
        </aside>
      </div>
    </Surface>
  );
}
function Production({
  rec,
  patch,
  next,
}: {
  rec: Rec;
  patch: (p: Partial<Rec>) => void;
  next: () => void;
}) {
  const checks = rec.checks || tasks.map(() => false),
    done = Math.round((checks.filter(Boolean).length / checks.length) * 100);
  return (
    <Surface>
      <Intro
        n="04 · PRODUCTION MANAGER"
        h="Build and launch readiness"
        p="Content, domains, forms, analytics, SEO, QA and approvals stay visible."
      />
      <div className="ready">
        <b>{done}%</b>
        <div>
          <i style={{ width: `${done}%` }} />
        </div>
        {done === 100 && <button onClick={next}>Send to review</button>}
      </div>
      <section className="checklist">
        {tasks.map((t, i) => (
          <button
            key={t}
            className={checks[i] ? 'done' : ''}
            onClick={() => {
              const c = [...checks];
              c[i] = !c[i];
              patch({ checks: c, stage: 'Build' });
            }}
          >
            <span>{checks[i] && <Check />}</span>
            <b>{t}</b>
            <small>{checks[i] ? 'Complete' : 'Needs attention'}</small>
          </button>
        ))}
      </section>
    </Surface>
  );
}
function Care({ rec, patch }: { rec: Rec; patch: (p: Partial<Rec>) => void }) {
  const c = rec.care || { name: 'Essential Care', mrr: 99 };
  return (
    <Surface>
      <Intro
        n="05 · CARE PLAN MANAGER"
        h="Recurring revenue and retention"
        p="Track hosting, maintenance, SEO, renewals and MRR."
      />
      <div className="plans">
        {[
          ['Essential Care', 99],
          ['Growth Care', 199],
          ['SEO Care', 449],
        ].map(([n, p]) => (
          <button
            className={c.name === n ? 'selected' : ''}
            key={n}
            onClick={() =>
              patch({
                care: { name: String(n), mrr: Number(p) },
                stage: 'Care Plan',
              })
            }
          >
            <HeartHandshake />
            <b>{n}</b>
            <strong>
              {money(Number(p))}
              <small>/mo</small>
            </strong>
            <span>
              {n === 'Essential Care'
                ? 'Hosting, updates and backups'
                : n === 'Growth Care'
                  ? 'Care plus edits and reporting'
                  : 'Growth care plus local SEO'}
            </span>
          </button>
        ))}
      </div>
      <List
        title={`${c.name} services`}
        items={[
          'Managed hosting and backups',
          'Security and software updates',
          'Content edit allowance',
          'Performance reporting',
        ]}
      />
    </Surface>
  );
}
function Portal({
  rec,
  patch,
  say,
}: {
  rec: Rec;
  patch: (p: Partial<Rec>) => void;
  say: (s: string) => void;
}) {
  const p = rec.portal || {
    approval: 'Not requested',
    revisions: [],
    messages: [],
  };
  return (
    <Surface>
      <Intro
        n="07 · CLIENT PORTAL"
        h={`${rec.name} portal`}
        p="Simple V1 status, approvals, revision requests, content checklist and messages."
      />
      <div className="portal">
        <div>
          <span>Project status</span>
          <b>{rec.stage}</b>
        </div>
        <div>
          <span>Approval</span>
          <b>{p.approval}</b>
        </div>
        <button
          className="primary"
          onClick={() => patch({ portal: { ...p, approval: 'Approved' } })}
        >
          <Check />
          Record approval
        </button>
      </div>
      <div className="two">
        <List
          title="Content checklist"
          items={[
            'Logo received',
            'Approved photos required',
            'Service list to verify',
            'Business details to confirm',
          ]}
        />
        <List
          title="Revision requests"
          items={p.revisions.length ? p.revisions : ['No revision requests']}
        />
      </div>
      <Entry
        placeholder="Add revision request"
        action={(v) => {
          patch({ portal: { ...p, revisions: [...p.revisions, v] } });
          say('Revision request added');
        }}
      />
      <section className="messages">
        <h3>Project messages</h3>
        {p.messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
        <Entry
          placeholder="Add message"
          action={(v) =>
            patch({ portal: { ...p, messages: [...p.messages, v] } })
          }
        />
      </section>
    </Surface>
  );
}
function Deploy({
  rec,
  patch,
  next,
  say,
}: {
  rec: Rec;
  patch: (p: Partial<Rec>) => void;
  next: () => void;
  say: (s: string) => void;
}) {
  const d = rec.deploy || {
      repo: '',
      preview: '',
      production: '',
      status: 'Not configured',
      versions: [],
    },
    field = (k: string, v: any) => patch({ deploy: { ...d, [k]: v } });
  return (
    <Surface>
      <Intro
        n="08 · DEPLOYMENT SYSTEM"
        h="Preview, production and launch history"
        p="Record deployment state without touching Dan’s separate preview or the public MWC website."
      />
      <div className="deploy">
        {[
          ['repo', 'Repository', Cloud],
          ['preview', 'Preview URL', Globe2],
          ['production', 'Production URL / domain', Rocket],
        ].map(([k, l, I]: any) => (
          <section key={k}>
            <I />
            <h3>{l}</h3>
            <input
              value={(d as any)[k]}
              onChange={(e) => field(k, e.target.value)}
            />
            <small>{(d as any)[k] || 'Not recorded'}</small>
          </section>
        ))}
      </div>
      <Entry
        placeholder="Add version note"
        action={(v) => {
          field('versions', [...d.versions, v]);
          say('Version note added');
        }}
      />
      <List
        title="Version history"
        items={d.versions.length ? d.versions : ['No versions recorded']}
      />
      <div className="buttons">
        <button
          className="primary"
          onClick={() => {
            field('status', 'Live');
            next();
            say('Deployment marked live');
          }}
        >
          <Rocket />
          Mark production live
        </button>
      </div>
    </Surface>
  );
}
function Surface({ children }: { children: any }) {
  return <div className="content">{children}</div>;
}
function Intro({ n, h, p }: { n: string; h: string; p: string }) {
  return (
    <div className="intro">
      <em>{n}</em>
      <h2>{h}</h2>
      <p>{p}</p>
    </div>
  );
}
function Stage({ s }: { s: Stage }) {
  return <span className="stage">{s}</span>;
}
function Score({ n }: { n: number }) {
  return (
    <div className="score" style={{ '--n': `${n * 3.6}deg` } as any}>
      <span>
        <b>{n}</b>
        <small>/100</small>
      </span>
    </div>
  );
}
function List({
  title,
  items,
  chips = false,
}: {
  title: string;
  items: string[];
  chips?: boolean;
}) {
  return (
    <section className={chips ? 'list chips' : 'list'}>
      <h3>{title}</h3>
      <div>
        {items.map((x, i) => (
          <p key={i}>
            <span>{chips ? String(i + 1).padStart(2, '0') : <Check />}</span>
            {x}
          </p>
        ))}
      </div>
    </section>
  );
}
function EditList({
  title,
  items,
  change,
}: {
  title: string;
  items: string[];
  change: (v: string[]) => void;
}) {
  return (
    <label className="editlist">
      <b>{title}</b>
      <small>
        One item per line · top three appear first for outbound prep
      </small>
      <textarea
        value={items.join('\n')}
        onChange={(e) => change(e.target.value.split('\n').filter(Boolean))}
      />
    </label>
  );
}
function Entry({
  placeholder,
  action,
}: {
  placeholder: string;
  action: (v: string) => void;
}) {
  const [v, setV] = useState('');
  return (
    <div className="entry">
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder={placeholder}
      />
      <button
        onClick={() => {
          if (v.trim()) action(v);
          setV('');
        }}
      >
        <Plus />
        Add
      </button>
    </div>
  );
}

