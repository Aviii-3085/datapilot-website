import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BarChart3, BookOpen, Check, ChevronRight, Clipboard, Code2, Copy, ExternalLink, FileCode2, Github, Layers3, Menu, ShieldCheck, Terminal, X, Zap } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const githubUrl = 'https://github.com/Aviii-3085/datapilot';
const pypiUrl = 'https://pypi.org/project/datapilot-kit/';
const installCommand = 'pip install datapilot-kit';
const importCommand = 'from datapilot import analyze';

function CopyButton({ value, label = 'Copy' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement('textarea');
      area.value = value;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button className="copy-button" onClick={copy} data-testid={`button-copy-${label.toLowerCase().replaceAll(' ', '-')}`} aria-label={`Copy ${label}`}>
      {copied ? <Check /> : <Copy />}
      {copied ? 'Copied' : label}
    </button>
  );
}

function Logo() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <BarChart3 />
    </span>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="top-strip">
        <span>Datapilot v0.3.0 is out — deterministic analysis for your next dataset.</span>
        <a href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-release-notes">View release notes <ChevronRight size={12} /></a>
      </div>
      <header className="navbar">
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a className="brand" href="#top" onClick={closeMenu} data-testid="link-brand"><Logo /> datapilot</a>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#workflow" data-testid="link-nav-workflow">How it works</a>
            <a href="#features" data-testid="link-nav-features">Features</a>
            <a href="#report" data-testid="link-nav-report">Report preview</a>
            <a href="#docs" data-testid="link-nav-docs">Docs</a>
          </nav>
          <div className="nav-actions">
            <a className="button button-quiet" href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-nav-github"><Github size={14} /> GitHub</a>
            <a className="button button-primary" href="#docs" data-testid="link-nav-get-started">Get started <ChevronRight size={14} /></a>
            <button className="menu-toggle" onClick={() => setMenuOpen((current) => !current)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>
      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        <a href="#workflow" onClick={closeMenu} data-testid="link-mobile-workflow">How it works</a>
        <a href="#features" onClick={closeMenu} data-testid="link-mobile-features">Features</a>
        <a href="#report" onClick={closeMenu} data-testid="link-mobile-report">Report preview</a>
        <a href="#docs" onClick={closeMenu} data-testid="link-mobile-docs">Docs & get started</a>
      </nav>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container-wide hero-grid">
        <div className="reveal">
          <div className="eyebrow">Open-source exploratory analysis</div>
          <h1>Know your data <em>before</em> you build.</h1>
          <p className="hero-copy">Datapilot analyzes pandas DataFrames and produces structured dataset insights and readable HTML reports.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#docs" data-testid="button-hero-start">Start with three lines <ChevronRight size={15} /></a>
            <a className="button button-quiet" href={githubUrl} target="_blank" rel="noreferrer" data-testid="button-hero-github"><Github size={15} /> View on GitHub</a>
          </div>
          <div className="hero-meta" data-testid="text-hero-meta">
            <span><i className="status-dot" /> MIT licensed</span>
            <span><ShieldCheck size={13} /> No external model required</span>
            <span><Terminal size={13} /> Python 3.10+</span>
          </div>
        </div>
        <div className="hero-visual reveal delay-2">
          <div className="terminal-window" data-testid="display-hero-terminal">
            <div className="terminal-head"><span /><span /><span /><div className="terminal-title">analysis.py</div></div>
            <div className="terminal-body">
              <pre><span className="code-key">import</span> pandas <span className="code-key">as</span> pd{'\n\n'}<span className="code-key">from</span> <span className="code-string">datapilot</span> <span className="code-key">import</span> <span className="code-fn">analyze</span>{'\n\n'}df = pd.read_csv(<span className="code-string">"dataset.csv"</span>){'\n'}report = <span className="code-fn">analyze</span>(df)</pre>
              <div className="terminal-result">
                <strong><span className="good">✓</span> Example analysis complete</strong>
                <span>Sample values · 12 columns · 18,420 rows</span>
              </div>
            </div>
          </div>
          <div className="signal-card" data-testid="display-hero-signal">
            <small>DATASET HEALTH</small>
            <b>92 / 100</b>
            <div className="signal-line" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </div>
      <div className="container-wide hero-rule">
        <div className="proof-row">
          <span className="proof-label">Works alongside</span>
          <div className="proof-tools">
            <span className="tool-chip">pandas</span>
            <span className="tool-chip">NumPy</span>
            <span className="tool-chip">SciPy</span>
            <span className="tool-chip">scikit-learn</span>
            <span className="tool-chip">Matplotlib</span>
            <span className="tool-chip">Plotly</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  const workflowCode = `import pandas as pd

from datapilot import analyze

df = pd.read_csv("dataset.csv")
report = analyze(df)`;

  return (
    <section className="section workflow" id="workflow">
      <div className="container-wide workflow-grid">
        <div>
          <div className="section-heading">
            <div className="eyebrow">A small API with a wide view</div>
            <h2>From DataFrame to a shared point of view.</h2>
            <p>Datapilot gives the first pass a dependable shape. Load your data, run analysis, then decide what deserves a deeper look.</p>
          </div>
          <div className="steps">
            <div className="step">
              <span className="step-number">01</span>
              <div><h3>Load what you already use</h3><p>Pass in any pandas DataFrame. Datapilot does not ask you to change your notebook, pipeline, or habits.</p></div>
            </div>
            <div className="step">
              <span className="step-number">02</span>
              <div><h3>Inspect the whole dataset</h3><p>Missing values, duplicates, data types, statistical summaries, outliers, and correlations are surfaced in one predictable pass.</p></div>
            </div>
            <div className="step">
              <span className="step-number">03</span>
              <div><h3>Read the signals, not a wall of output</h3><p>Health scores and plain-language insights point to anomalies and columns worth your attention.</p></div>
            </div>
            <div className="step">
              <span className="step-number">04</span>
              <div><h3>Export a report that travels</h3><p>Write a self-contained HTML report for a pull request, a research handoff, or a meeting where the dataset needs context.</p></div>
            </div>
          </div>
        </div>
        <div className="workflow-code" data-testid="display-workflow-code">
          <div className="code-head"><span>quickstart.py</span><CopyButton value={workflowCode} label="Copy code" /></div>
          <pre><span className="code-key">import</span> pandas <span className="code-key">as</span> pd{'\n\n'}<span className="code-key">from</span> <span className="code-string">datapilot</span> <span className="code-key">import</span> <span className="code-fn">analyze</span>{'\n\n'}df = pd.read_csv(<span className="code-string">"dataset.csv"</span>){'\n'}report = <span className="code-fn">analyze</span>(df)</pre>
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: BarChart3, title: 'Dataset summary', body: 'Shape, dimensions, data types, and column-level summaries give you the map before the work begins.' },
  { icon: ShieldCheck, title: 'Dataset Health Score', body: 'Missing values, duplicates, outliers, and dataset quality signals are surfaced without alarmism.' },
  { icon: Zap, title: 'Actionable insights', body: 'Readable observations turn descriptive statistics into a short list of useful next questions.' },
  { icon: Layers3, title: 'Correlation analysis', body: 'Explore relationships between numerical variables alongside statistical summaries and column-level inspection.' },
  { icon: FileCode2, title: 'Professional HTML reports', body: 'Generate a clean, readable report that keeps the analysis reviewable and easy to share.' },
];

function Features() {
  return (
    <section className="section" id="features">
      <div className="container-wide feature-layout">
        <div className="feature-intro">
          <div className="eyebrow">What it checks</div>
          <h2>The useful parts of EDA, in one deliberate pass.</h2>
          <p>Datapilot is intentionally opinionated about the first look. It handles the repetitive checks so your attention can move to the questions that matter.</p>
          <a className="button button-quiet" href="#report" style={{ marginTop: 24 }} data-testid="link-features-report">See a report preview <ChevronRight size={14} /></a>
        </div>
        <div className="feature-list" data-testid="list-features">
          {features.map(({ icon: Icon, title, body }, index) => (
            <article className={`feature ${index === features.length - 1 ? 'feature-wide' : ''}`} key={title} data-testid={`card-feature-${index}`}>
              <div className="feature-icon"><Icon /></div>
              <div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportPreview() {
  return (
    <section className="section report-section" id="report">
      <div className="container-wide">
        <div className="report-top">
           <div><div className="eyebrow">Example report preview</div><h2>Evidence first. Conclusions second.</h2></div>
           <p>This illustrative report preview shows the kinds of summaries and signals Datapilot can surface. Actual sections and values vary by dataset.</p>
        </div>
        <div className="report-window" data-testid="display-report-preview">
          <div className="report-bar">
             <div className="report-brand"><Logo /> <span>datapilot <b>/</b> example_report</span></div>
            <div className="report-tabs"><span className="report-tab-active">Overview</span><span>Columns</span><span>Signals</span></div>
          </div>
          <div className="report-content">
            <aside className="report-sidebar">
              <small>Analysis</small>
              <p>Overview</p><p>Data quality</p><p>Distributions</p><p>Relationships</p><p>Insights</p>
              <small style={{ marginTop: 28 }}>Generated</small>
               <p>Sample dataset</p><p>Illustrative values</p>
            </aside>
            <div className="report-main">
               <div className="report-title"><div><h3>Example dataset</h3><p>18,420 rows · 12 columns · pandas DataFrame</p></div><span>EXAMPLE</span></div>
              <div className="report-summary">
                 <div className="summary-cell"><small>Completeness</small><b>97.8%</b><em>sample value</em></div>
                 <div className="summary-cell"><small>Duplicate rows</small><b>0.4%</b><em>sample value</em></div>
                 <div className="summary-cell"><small>Numeric columns</small><b>8 / 12</b><em>sample count</em></div>
                 <div className="summary-cell"><small>Signals</small><b>03</b><em>sample count</em></div>
              </div>
              <div className="report-panels">
                <div className="report-panel"><h4>Rows by month</h4><div className="bar-chart" aria-label="Rows by month chart"><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="chart-axis"><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span></div></div>
                <div className="report-panel"><h4>Target distribution</h4><div className="donut-wrap"><div className="donut" aria-label="Target distribution 62 percent retained" /><div className="legend"><span><i />Retained 62%</span><span><i />Churned 20%</span><span><i />Unknown 18%</span></div></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Docs() {
  const docsCode = `import pandas as pd

${importCommand}

df = pd.read_csv("dataset.csv")
report = analyze(df)`;

  return (
    <section className="section docs-section" id="docs">
      <div className="container-wide docs-layout">
        <aside className="docs-nav" aria-label="Documentation navigation">
          <h4>Get started</h4>
          <a href="#docs" data-testid="link-docs-install">Installation</a>
          <a href="#docs-api" data-testid="link-docs-api">Python API</a>
          <a href="#docs-output" data-testid="link-docs-output">Output & reports</a>
          <a href="#contribute" data-testid="link-docs-contribute">Contributing</a>
        </aside>
        <div className="docs-content">
          <div className="eyebrow">Documentation / 01</div>
          <h2>Start with the shape of your data.</h2>
           <p>Install the Python package, pass in a DataFrame, and keep the analysis close to your existing workflow. No hosted service or configuration file is required.</p>
          <div className="install-box" data-testid="display-install-command"><code>{installCommand}</code><CopyButton value={installCommand} label="Copy install" /></div>
          <div className="docs-code" id="docs-api">
            <div className="code-head"><span>minimal_analysis.py</span><CopyButton value={docsCode} label="Copy code" /></div>
             <pre><span className="code-key">import</span> pandas <span className="code-key">as</span> pd{'\n\n'}<span className="code-key">from</span> <span className="code-string">datapilot</span> <span className="code-key">import</span> <span className="code-fn">analyze</span>{'\n\n'}df = pd.read_csv(<span className="code-string">"dataset.csv"</span>){'\n'}report = <span className="code-fn">analyze</span>(df)</pre>
          </div>
          <div className="docs-note" id="docs-output" data-testid="display-docs-note"><strong>Designed to be inspectable.</strong> Analysis results are deterministic for the same input and configuration. The report is an artifact you can diff, archive, and hand to someone who was not in the notebook.</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 27 }}>
            <a className="button button-primary" href={pypiUrl} target="_blank" rel="noreferrer" data-testid="link-docs-pypi">Read the PyPI page <ExternalLink size={13} /></a>
            <a className="button button-quiet" href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-docs-github">Browse source <Github size={13} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function OpenSource() {
  return (
    <section className="open-source" id="contribute">
      <div className="container-wide oss-grid">
        <div>
          <div className="eyebrow">Built in the open</div>
          <h2>A useful first pass is a community project.</h2>
          <p>Datapilot is MIT licensed and shaped by the people who work with imperfect datasets every day. Read the issues, suggest a signal, improve the report, or bring a use case we have not considered yet.</p>
          <div className="oss-links">
            <a className="button button-primary" href={githubUrl} target="_blank" rel="noreferrer" data-testid="button-contribute"><Github size={15} /> Contribute on GitHub</a>
            <a className="button button-quiet" href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-project">Browse the project <ExternalLink size={13} /></a>
          </div>
        </div>
        <div className="roadmap" data-testid="display-roadmap">
          <div className="roadmap-head"><h3>Project status</h3><span>v0.3.0 / MIT</span></div>
          <div className="roadmap-item"><span className="roadmap-status done" /><b>stable</b><strong>Datapilot v0.3.0</strong><small>current release</small></div>
          <div className="roadmap-item"><span className="roadmap-status next" /><b>package</b><strong>datapilot-kit</strong><small>distributed on PyPI</small></div>
          <div className="roadmap-item"><span className="roadmap-status" /><b>source</b><strong>MIT licensed</strong><small>open on GitHub</small></div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-top">
          <div><a className="brand" href="#top" data-testid="link-footer-brand"><Logo /> datapilot</a><p className="footer-note">Understand first. Build with evidence.</p></div>
          <div className="footer-links">
            <a href={githubUrl} target="_blank" rel="noreferrer" data-testid="link-footer-github">GitHub</a>
            <a href={pypiUrl} target="_blank" rel="noreferrer" data-testid="link-footer-pypi">PyPI</a>
            <a href="#docs" data-testid="link-footer-docs">Docs</a>
            <a href="#contribute" data-testid="link-footer-contribute">Contributing</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Datapilot contributors</span><span>MIT License · Open source Python tooling</span></div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main className="site-shell">
      <Header />
      <Hero />
      <Workflow />
      <Features />
      <ReportPreview />
      <Docs />
      <OpenSource />
      <Footer />
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;