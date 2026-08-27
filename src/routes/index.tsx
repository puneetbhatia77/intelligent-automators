import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  Cpu,
  MessagesSquare,
  Workflow,
  Zap,
} from "lucide-react";
import heroNetwork from "../assets/hero-network.jpg";
import LeadChat, { type LeadAnswers } from "../components/LeadChat";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexflow AI — Automate Your Business with AI Agents & Intelligent Workflows" },
      {
        name: "description",
        content:
          "We build AI-powered workflows, intelligent agents, and custom chatbots that save time, reduce operational costs, and improve customer experience. Book a free automation consultation.",
      },
      { property: "og:title", content: "Nexflow AI — Automate Your Business with AI Agents" },
      {
        property: "og:description",
        content:
          "AI-powered workflows, intelligent agents, and custom chatbots that save time, cut costs, and improve customer experience.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    icon: Workflow,
    num: "01",
    title: "AI-Powered Workflows",
    desc: "Multi-step automations that read, decide, and act across your tools — approvals, handoffs, and data sync that run themselves.",
    chip: "bg-violet-brand/10 text-violet-brand",
    bar: "bg-violet-brand",
  },
  {
    icon: Cpu,
    num: "02",
    title: "Intelligent Agents",
    desc: "Autonomous agents that research, draft, and execute tasks with your data — escalating only what genuinely needs a human.",
    chip: "bg-cyan-brand/15 text-cyan-600",
    bar: "bg-cyan-brand",
  },
  {
    icon: MessagesSquare,
    num: "03",
    title: "Custom Chatbots",
    desc: "Support and sales assistants trained on your docs and tone of voice, resolving the routine 70% of conversations instantly.",
    chip: "bg-coral-brand/10 text-coral-brand",
    bar: "bg-coral-brand",
  },
  {
    icon: Zap,
    num: "04",
    title: "Process Automation",
    desc: "End-to-end integration of your CRM, inbox, and internal tools so nothing gets re-keyed, copied, or forgotten again.",
    chip: "bg-lime-brand/25 text-lime-700",
    bar: "bg-lime-brand",
  },
];

const useCases = [
  {
    tag: "Operations",
    color: "border-violet-brand/30",
    dot: "bg-violet-brand",
    title: "Order intake on autopilot",
    desc: "Inbound orders are read, validated, and routed automatically — anomalies flagged before a human ever opens the inbox.",
  },
  {
    tag: "Customer Support",
    color: "border-cyan-brand/40",
    dot: "bg-cyan-brand",
    title: "Tier-one tickets, resolved",
    desc: "A chatbot grounded in your knowledge base answers instantly and hands complex cases to your team with a full summary.",
  },
  {
    tag: "Sales & Growth",
    color: "border-coral-brand/40",
    dot: "bg-coral-brand",
    title: "Leads qualified while you sleep",
    desc: "Agents enrich inbound leads, score them against your ICP, and draft personalized outreach that adapts to every reply.",
  },
  {
    tag: "Finance & Admin",
    color: "border-lime-brand/50",
    dot: "bg-lime-brand",
    title: "Paperwork without the paper",
    desc: "Invoices matched, expenses categorized, and reports compiled — with audit trails on every automated decision.",
  },
];

const stats = [
  { value: "70%", label: "of repetitive tasks offloaded to AI on average" },
  { value: "38%", label: "average reduction in operational cost within two quarters" },
  { value: "3.4×", label: "faster cycle times on automated workflows" },
  { value: "+22", label: "NPS points gained from faster, consistent responses" },
];

const process = [
  {
    step: "01",
    title: "Audit",
    desc: "A working session to map your workflows and pinpoint the highest-leverage automation targets.",
    accent: "text-violet-brand",
  },
  {
    step: "02",
    title: "Design",
    desc: "A scoped blueprint: agents, integrations, guardrails, and a clear ROI estimate before we build.",
    accent: "text-cyan-600",
  },
  {
    step: "03",
    title: "Build",
    desc: "We ship in weekly increments, tested against your real data, with logging and rollback baked in.",
    accent: "text-coral-brand",
  },
  {
    step: "04",
    title: "Operate & Scale",
    desc: "We monitor, refine, and hand over a system your team owns outright — then find the next win.",
    accent: "text-lime-600",
  },
];

const faqs = [
  {
    q: "Do we need engineers on our team to maintain this?",
    a: "No. We build on a simple, documented stack, train your team, and hand over a system you fully own. Optional care plans cover ongoing tuning if you'd rather not touch it.",
  },
  {
    q: "How long until we see results?",
    a: "Most clients see measurable time savings within 30–60 days of the first workflow going live. The initial audit takes about two weeks.",
  },
  {
    q: "How secure is our data?",
    a: "We work with private model instances and your existing access controls. Nothing is used to train public models, and every automated action is logged and auditable.",
  },
  {
    q: "Which tools and data do you work with?",
    a: "Your existing stack — CRMs, inboxes, spreadsheets, ERPs, and databases. We integrate where you already operate rather than forcing a migration.",
  },
  {
    q: "What does it cost?",
    a: "Fixed-scope builds priced per workflow, not per hour, plus an optional monthly care plan. The consultation includes a concrete ROI estimate before you commit to anything.",
  },
];

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

function Index() {
  const [submitted, setSubmitted] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", details: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleQualified = (a: LeadAnswers) => {
    setLead({
      name: a.name,
      email: a.email,
      details: `Business: ${a.business}\nAutomation goal: ${a.goal}\nCurrent challenge: ${a.challenge}`,
    });
  };


  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2.5">
            <span className="gradient-brand flex size-9 items-center justify-center rounded-xl text-white">
              <Bot className="size-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Nexflow<span className="text-violet-brand"> AI</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#consultation"
            className="gradient-brand inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-brand/25 transition-transform hover:scale-105"
          >
            Book a free consult
            <ArrowRight className="size-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-violet-brand/15 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -right-24 size-80 rounded-full bg-cyan-brand/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 size-72 rounded-full bg-coral-brand/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pt-16 pb-20 sm:pt-24 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-brand/25 bg-violet-brand/5 px-4 py-1.5 text-xs font-bold tracking-widest text-violet-brand uppercase">
              <span className="size-2 animate-pulse rounded-full bg-lime-brand" />
              AI Automation Consultancy
            </span>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold text-balance sm:text-5xl lg:text-6xl">
              Automate your business with{" "}
              <span className="gradient-text">AI agents</span> &amp; intelligent{" "}
              <span className="gradient-text">workflows</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We design and deploy AI systems that handle your repetitive operations end to end —
              saving time, cutting costs, and delighting customers while your team focuses on the
              work only humans can do.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#consultation"
                className="gradient-brand inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-brand/30 transition-transform hover:scale-105"
              >
                Book your free consultation
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#process"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-bold transition-colors hover:bg-accent"
              >
                See how it works
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {[
                ["40+", "operations automated"],
                ["2 wks", "to first live agent"],
                ["4.9/5", "client rating"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-bold">{v}</div>
                  <div className="mt-1 text-xs font-semibold text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="gradient-brand absolute -inset-3 rounded-[2rem] opacity-25 blur-2xl" />
              <img
                src={heroNetwork}
                alt="Network of connected AI agents and workflow nodes glowing in violet, cyan, and coral"
                width={1280}
                height={1024}
                className="relative w-full rounded-[2rem] border border-white/40 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-bold tracking-widest text-violet-brand uppercase">What we build</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
            Systems that run themselves, built around your operations
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.num}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <span className={`absolute inset-x-0 top-0 h-1.5 ${s.bar}`} />
              <div className="flex items-center justify-between">
                <span
                  className={`flex size-12 items-center justify-center rounded-xl font-bold ${s.chip}`}
                >
                  <s.icon className="size-6" />
                </span>
                <span className="font-display text-sm font-bold text-muted-foreground/50">
                  {s.num}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section id="use-cases" className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold tracking-widest text-coral-brand uppercase">
              Where teams deploy us
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
              Practical use cases, real hours saved
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {useCases.map((u) => (
              <div
                key={u.title}
                className={`rounded-2xl border-2 ${u.color} bg-card p-7 transition-shadow hover:shadow-lg`}
              >
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                  <span className={`size-2 rounded-full ${u.dot}`} />
                  {u.tag}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="relative overflow-hidden bg-ink-deep text-white">
        <div className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-violet-brand/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-24 size-80 rounded-full bg-cyan-brand/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-xs font-bold tracking-widest text-cyan-brand uppercase">
            The measurable outcome
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-balance sm:text-4xl">
            Time and money back, every single week
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.value} className="border-t-2 border-white/20 pt-6">
                <p className="gradient-text font-display text-5xl font-bold">{s.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-bold tracking-widest text-violet-brand uppercase">How we work</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
            Four steps from audit to a running system
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="border-t-2 border-border pt-6">
              <span className={`font-display text-3xl font-bold ${p.accent}`}>{p.step}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
        <div className="grid items-center gap-10 rounded-3xl bg-secondary/60 p-8 sm:p-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="font-display text-5xl leading-none text-coral-brand">&ldquo;</span>
            <blockquote className="mt-2 font-display text-2xl leading-snug font-semibold text-balance sm:text-3xl">
              Nexflow rebuilt our intake pipeline in six weeks. What took our team three days now
              runs overnight — and the quality is actually higher.
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span className="gradient-brand flex size-11 items-center justify-center rounded-full font-display text-sm font-bold text-white">
                DO
              </span>
              <div>
                <p className="text-sm font-bold">Dana Okafor</p>
                <p className="text-xs text-muted-foreground">COO, Vantage Logistics</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Trusted by teams at
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-muted-foreground">
              <span>Vantage Logistics</span>
              <span>Northwind SaaS</span>
              <span>Corvus Finance</span>
              <span>Halcyon Retail</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-bold tracking-widest text-cyan-600 uppercase">Questions</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance">
              The practical details
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Everything teams usually ask before their first automation. Something else on your
              mind? Bring it to the consultation.
            </p>
          </div>
          <div className="space-y-3 lg:col-span-8">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group rounded-2xl border border-border bg-card px-6 transition-shadow open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm font-bold">
                  {f.q}
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-brand/10 text-violet-brand transition-transform group-open:rotate-180">
                    <ChevronDown className="size-4" />
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section id="consultation" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-ink-deep p-8 text-white sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-violet-brand/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-coral-brand/30 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold tracking-widest text-lime-brand uppercase">
                Free consultation
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-balance sm:text-4xl">
                Book a working session to map your first automation
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-white/70">
                Thirty focused minutes. You'll leave with a concrete list of what we can automate
                for you, what it would save, and a clear ROI estimate.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/80">
                {[
                  "No obligation, no sales deck — just a working session",
                  "A concrete automation roadmap you keep either way",
                  "Fixed-scope pricing, agreed before any build starts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lime-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="gradient-brand flex size-14 items-center justify-center rounded-full">
                    <CheckCircle2 className="size-7 text-white" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold">Request received</h3>
                  <p className="mt-2 max-w-xs text-sm text-white/70">
                    Thanks — we'll reply within one business day to schedule your consultation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="font-display text-sm font-bold">Request your consultation</p>
                  {lead.name && (
                    <p className="rounded-xl border border-lime-brand/30 bg-lime-brand/10 px-4 py-2.5 text-xs font-semibold text-lime-brand">
                      Pre-filled from your chat with Nova — edit anything before sending.
                    </p>
                  )}
                  <input
                    required
                    type="text"
                    value={lead.name}
                    onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
                    placeholder="Full name"
                    aria-label="Full name"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-brand focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    value={lead.email}
                    onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))}
                    placeholder="Work email"
                    aria-label="Work email"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-brand focus:outline-none"
                  />
                  <textarea
                    rows={4}
                    value={lead.details}
                    onChange={(e) => setLead((l) => ({ ...l, details: e.target.value }))}
                    placeholder="What would you love to automate?"
                    aria-label="What would you love to automate?"
                    className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-brand focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="gradient-brand inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-brand/40 transition-transform hover:scale-[1.02]"
                  >
                    Book my free consultation
                    <ArrowRight className="size-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="flex items-center gap-2.5">
              <span className="gradient-brand flex size-9 items-center justify-center rounded-xl text-white">
                <Bot className="size-5" />
              </span>
              <div>
                <p className="font-display text-sm font-bold">
                  Nexflow<span className="text-violet-brand"> AI</span>
                </p>
                <p className="text-xs text-muted-foreground">AI automation consultancy</p>
              </div>
            </div>
            <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-muted-foreground">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                  {l.label}
                </a>
              ))}
              <a href="mailto:hello@nexflow.ai" className="transition-colors hover:text-foreground">
                hello@nexflow.ai
              </a>
            </nav>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>&copy; 2026 Nexflow AI. All rights reserved.</p>
            <p>Built for teams who ship.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
