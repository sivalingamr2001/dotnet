<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>React Refactor — Copilot Prompt Reference</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@400;600;800&display=swap');

  :root {
    --bg: #0a0c10;
    --surface: #111318;
    --surface2: #181c24;
    --border: #1f2535;
    --accent: #4fffb0;
    --accent2: #4f9fff;
    --accent3: #ff6b6b;
    --accent4: #ffd166;
    --text: #e2e8f0;
    --muted: #64748b;
    --mono: 'JetBrains Mono', monospace;
    --sans: 'Syne', sans-serif;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    min-height: 100vh;
    padding: 2rem 1.5rem 4rem;
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79,255,176,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(79,159,255,0.05) 0%, transparent 60%);
  }

  header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .tag {
    display: inline-block;
    font-family: var(--mono);
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    border: 1px solid rgba(79,255,176,0.25);
    padding: 0.3rem 0.9rem;
    border-radius: 2px;
    margin-bottom: 1.2rem;
  }

  h1 {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 0.7rem;
  }

  h1 span { color: var(--accent); }

  .subtitle {
    color: var(--muted);
    font-size: 0.9rem;
    font-family: var(--mono);
  }

  .grid {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    gap: 1.2rem;
  }

  /* ── RULE CARD ── */
  .rule-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .rule-card:hover { border-color: rgba(79,255,176,0.3); }

  .rule-header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 0.9rem 1.2rem;
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    user-select: none;
  }

  .rule-num {
    font-family: var(--mono);
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--accent);
    min-width: 2rem;
    letter-spacing: 0.1em;
  }

  .rule-title {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .pill {
    font-family: var(--mono);
    font-size: 0.6rem;
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    font-weight: 600;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }
  .pill-green  { background: rgba(79,255,176,0.12); color: var(--accent); }
  .pill-blue   { background: rgba(79,159,255,0.12); color: var(--accent2); }
  .pill-red    { background: rgba(255,107,107,0.12); color: var(--accent3); }
  .pill-yellow { background: rgba(255,209,102,0.12); color: var(--accent4); }

  .chevron {
    color: var(--muted);
    font-size: 0.75rem;
    transition: transform 0.25s;
  }
  .rule-card.open .chevron { transform: rotate(90deg); }

  .rule-body {
    display: none;
    padding: 1.2rem;
    gap: 1rem;
  }
  .rule-card.open .rule-body { display: grid; }

  /* ── PROMPT BOX ── */
  .prompt-box {
    position: relative;
    background: #0d1117;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 1rem 1.2rem;
    font-family: var(--mono);
    font-size: 0.78rem;
    line-height: 1.7;
    color: #c9d1d9;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .prompt-box .comment { color: #6e7681; }
  .prompt-box .kw      { color: var(--accent); font-weight: 600; }
  .prompt-box .str     { color: var(--accent4); }
  .prompt-box .num     { color: var(--accent2); }
  .prompt-box .rule    { color: var(--accent3); }

  .copy-btn {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--muted);
    font-family: var(--mono);
    font-size: 0.6rem;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 0.05em;
    transition: color 0.2s, border-color 0.2s;
  }
  .copy-btn:hover { color: var(--accent); border-color: var(--accent); }
  .copy-btn.copied { color: var(--accent); border-color: var(--accent); }

  /* ── EXAMPLE BLOCK ── */
  .example-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
  }
  @media (max-width: 640px) { .example-row { grid-template-columns: 1fr; } }

  .ex-label {
    font-family: var(--mono);
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
    font-weight: 700;
  }
  .ex-label.bad  { color: var(--accent3); }
  .ex-label.good { color: var(--accent); }

  /* ── MASTER PROMPT SECTION ── */
  .master-section {
    max-width: 1000px;
    margin: 2.5rem auto 0;
  }

  .master-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .master-title {
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .divider {
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .master-prompt {
    position: relative;
    background: #0d1117;
    border: 1px solid rgba(79,255,176,0.25);
    border-radius: 8px;
    padding: 1.4rem 1.6rem;
    font-family: var(--mono);
    font-size: 0.8rem;
    line-height: 1.9;
    color: #c9d1d9;
    white-space: pre-wrap;
    box-shadow: 0 0 40px rgba(79,255,176,0.04);
  }
  .master-prompt .comment { color: #6e7681; }
  .master-prompt .kw      { color: var(--accent); font-weight: 700; }
  .master-prompt .rule    { color: var(--accent3); }
  .master-prompt .num     { color: var(--accent2); }
  .master-prompt .str     { color: var(--accent4); }

  footer {
    text-align: center;
    margin-top: 3rem;
    font-family: var(--mono);
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.08em;
  }

  .info-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--muted);
    margin-top: 0.1rem;
  }
  .info-row span { color: var(--text); }
</style>
</head>
<body>

<header>
  <div class="tag">GitHub Copilot Prompt Reference</div>
  <h1>React Component <span>Refactoring</span></h1>
  <p class="subtitle">3 rules · copy-paste prompts · before/after examples</p>
</header>

<div class="grid" id="cards"></div>

<div class="master-section">
  <div class="master-header">
    <span class="master-title">★ Master Refactor Prompt</span>
    <div class="divider"></div>
    <button class="copy-btn" id="masterCopyBtn" onclick="copyMaster()">COPY ALL</button>
  </div>
  <div class="master-prompt" id="masterBlock"></div>
</div>

<footer>JANATICS · REACT BEST PRACTICES · 2025</footer>

<script>
const RULES = [
  {
    num: "R-01",
    title: "Keep each component under 100 lines",
    pill: ["100 LOC LIMIT", "pill-red"],
    prompt: `// Copilot: Refactor this component so that each component file
// stays STRICTLY under 100 lines of code (excluding imports).
//
// Rules:
//  • Extract every logical UI section into its own sub-component
//  • Extract every custom hook into a separate hooks/ file
//  • Extract every helper/util function into a separate utils/ file
//  • The parent component must only compose, never implement detail
//  • Use named exports for all extracted pieces
//
// Target structure:
//   ComponentName/
//     index.tsx          ← ≤ 100 lines, composes sub-components
//     ComponentName.tsx  ← same as index if preferred
//     hooks/
//       useComponentName.ts
//     components/
//       SubComponentA.tsx
//       SubComponentB.tsx
//     utils/
//       helpers.ts`,
    bad: `// ❌ BEFORE — 200-line monolith
export default function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => { fetch('/api/data')
    .then(r => r.json())
    .then(setData); }, []);

  // ... 150 more lines of JSX + logic
}`,
    good: `// ✅ AFTER — parent ≤ 100 lines
export default function Dashboard() {
  const { data, loading } = useDashboardData();
  return (
    <DashboardLayout>
      <StatsRow data={data} />
      <ChartPanel data={data} />
    </DashboardLayout>
  );
}`,
  },
  {
    num: "R-02",
    title: "Group related components into a folder",
    pill: ["FOLDER COLOCATION", "pill-blue"],
    prompt: `// Copilot: Reorganise related components into a colocated folder.
//
// Rules:
//  • Each feature/widget gets its OWN folder: FeatureName/
//  • Folder contains: index.tsx, sub-components, hooks/, types.ts, utils/
//  • index.tsx re-exports the public API — nothing else imports internals
//  • Shared primitives stay in src/components/ui/
//  • Page-level components stay in src/pages/ or src/routes/
//
// Example target layout:
//   src/
//     components/
//       UserCard/
//         index.tsx
//         UserCard.tsx
//         UserAvatar.tsx
//         hooks/
//           useUserCard.ts
//         types.ts
//       ui/
//         Button.tsx
//         Input.tsx
//     pages/
//       Dashboard.tsx`,
    bad: `// ❌ BEFORE — flat dump
src/components/
  UserCard.tsx
  UserCardAvatar.tsx
  UserCardFooter.tsx
  useUserCard.ts
  userCardHelpers.ts`,
    good: `// ✅ AFTER — colocated folder
src/components/
  UserCard/
    index.tsx          ← public export
    UserCard.tsx
    UserAvatar.tsx
    UserCardFooter.tsx
    hooks/
      useUserCard.ts
    utils/
      helpers.ts`,
  },
  {
    num: "R-03",
    title: "Maintain readability in every component",
    pill: ["READABILITY", "pill-green"],
    prompt: `// Copilot: Refactor this component for maximum readability.
//
// Rules — structure every component in this ORDER:
//   1. Type/interface declarations (Props, State)
//   2. Constants & static config (outside component)
//   3. Component function signature
//   4. Hook calls (useState, useEffect, custom hooks)
//   5. Derived state / memoised values
//   6. Event handler functions (handleXxx naming)
//   7. Early returns (loading, error, empty states)
//   8. Single return JSX — max 1 level of nesting per expression
//
// Additional rules:
//  • Props interface always named <ComponentName>Props
//  • No inline arrow functions in JSX (extract to handleXxx)
//  • No ternaries deeper than 1 level — extract to variable
//  • Boolean props: isXxx, hasXxx, canXxx
//  • Add a blank line between each section listed above`,
    bad: `// ❌ BEFORE — unstructured
function Card({ data, onSave, flag }) {
  const [x, setX] = useState(null);
  const handle = () => { if(flag){ onSave(data) } };
  useEffect(()=>{fetch('/x').then(r=>r.json()).then(setX)},[]);
  return <div onClick={()=>onSave(data)}>{x?.name}</div>;
}`,
    good: `// ✅ AFTER — readable structure
interface CardProps {
  data: CardData;
  onSave: (d: CardData) => void;
  isDisabled?: boolean;
}

function Card({ data, onSave, isDisabled }: CardProps) {
  const { cardDetail, isLoading } = useCardDetail(data.id);

  const handleSave = () => onSave(data);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <CardBody detail={cardDetail} />
      <SaveButton onClick={handleSave} disabled={isDisabled} />
    </div>
  );
}`,
  },
];

const MASTER_PROMPT_RAW = `// ═══════════════════════════════════════════════════════
// COPILOT · REACT COMPONENT REFACTOR — MASTER PROMPT
// Apply all three rules in a single pass
// ═══════════════════════════════════════════════════════

// [R-01] SIZE LIMIT
// Refactor so every component file is STRICTLY under 100 lines.
// Extract sub-components, custom hooks, and helper functions.

// [R-02] FOLDER COLOCATION
// Group all related files into a FeatureName/ folder.
// Expose only index.tsx as the public entry point.
// Layout: index.tsx | SubComponent.tsx | hooks/ | utils/ | types.ts

// [R-03] READABILITY ORDER
// Structure every component in this exact order:
//   1. Types / Interfaces
//   2. Static constants (outside function)
//   3. Component signature
//   4. Hook calls (useState → useEffect → custom)
//   5. Derived / memoised values
//   6. Event handlers  (handleXxx)
//   7. Early returns   (loading | error | empty)
//   8. Single JSX return

// NAMING CONVENTIONS
// Props interface  → <ComponentName>Props
// Event handlers   → handleXxx
// Boolean props    → isXxx | hasXxx | canXxx
// Custom hooks     → useXxx

// WHAT TO AVOID
// ✗ Inline arrow functions in JSX
// ✗ Ternaries deeper than 1 level
// ✗ Mixed logic and JSX in the same block
// ✗ Any file exceeding 100 lines

// Apply these rules to the component below and output
// the refactored files with their full folder structure.`;

function hl(str) {
  return str
    .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
    .replace(/\b(const|let|function|return|export|default|import|from|if|interface|type)\b/g, '<span class="kw">$1</span>')
    .replace(/(\[R-\d+\])/g, '<span class="rule">$1</span>')
    .replace(/(✗|✓|✅|❌)/g, '<span class="rule">$1</span>');
}

function buildCards() {
  const container = document.getElementById('cards');
  RULES.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'rule-card';
    if (i === 0) card.classList.add('open');

    const promptText = r.prompt;

    card.innerHTML = `
      <div class="rule-header" onclick="toggle(this.parentElement)">
        <span class="rule-num">${r.num}</span>
        <span class="rule-title">${r.title}</span>
        <span class="pill ${r.pill[1]}">${r.pill[0]}</span>
        <span class="chevron">▶</span>
      </div>
      <div class="rule-body">
        <div class="prompt-box">
          <button class="copy-btn" onclick="copyText(this, ${JSON.stringify(promptText)})">COPY</button>
          ${hl(r.prompt)}
        </div>
        <div class="example-row">
          <div>
            <div class="ex-label bad">✗ Before</div>
            <div class="prompt-box">${hl(r.bad)}</div>
          </div>
          <div>
            <div class="ex-label good">✓ After</div>
            <div class="prompt-box">${hl(r.good)}</div>
          </div>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

function buildMaster() {
  document.getElementById('masterBlock').innerHTML = hl(MASTER_PROMPT_RAW);
}

function toggle(card) {
  card.classList.toggle('open');
}

async function copyText(btn, text) {
  await navigator.clipboard.writeText(text);
  btn.textContent = 'COPIED!';
  btn.classList.add('copied');
  setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('copied'); }, 1800);
}

async function copyMaster() {
  await navigator.clipboard.writeText(MASTER_PROMPT_RAW);
  const btn = document.getElementById('masterCopyBtn');
  btn.textContent = 'COPIED!';
  btn.classList.add('copied');
  setTimeout(() => { btn.textContent = 'COPY ALL'; btn.classList.remove('copied'); }, 1800);
}

buildCards();
buildMaster();
</script>
</body>
</html>
