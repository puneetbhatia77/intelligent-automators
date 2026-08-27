import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Bot, MessageSquareText, Send, X } from "lucide-react";

export type LeadAnswers = {
  business: string;
  goal: string;
  challenge: string;
  name: string;
  email: string;
};

type Step = {
  key: keyof LeadAnswers;
  prompt: string;
  placeholder: string;
  type?: "email";
  chips?: string[];
};

const steps: Step[] = [
  {
    key: "business",
    prompt: "Great to meet you. What does your business do, and roughly how big is the team?",
    placeholder: "e.g. B2B logistics, 40 people",
  },
  {
    key: "goal",
    prompt: "What would you most like to automate first?",
    placeholder: "Tell me your automation goal…",
    chips: ["Customer support", "Lead qualification", "Order & data intake", "Reporting & admin"],
  },
  {
    key: "challenge",
    prompt: "What's slowing you down today — volume, manual handoffs, response times, something else?",
    placeholder: "Describe the current challenge or scale…",
  },
  {
    key: "name",
    prompt: "Makes sense. Who am I speaking with?",
    placeholder: "Your full name",
  },
  {
    key: "email",
    prompt: "And the best work email to send your automation roadmap to?",
    placeholder: "you@company.com",
    type: "email",
  },
];

type Msg = { from: "bot" | "user"; text: string };

const intro: Msg[] = [
  {
    from: "bot",
    text: "Hi! I'm Nova, Nexflow's automated assistant. I'll ask a few quick questions to scope your automation opportunity — takes about 60 seconds.",
  },
  { from: "bot", text: steps[0].prompt },
];

export default function LeadChat({ onQualified }: { onQualified: (a: LeadAnswers) => void }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(intro);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<LeadAnswers>>({});
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, done]);

  useEffect(() => {
    if (open && !done) inputRef.current?.focus();
  }, [open, done, index]);

  const submitAnswer = (raw: string) => {
    const text = raw.trim();
    if (!text || done) return;
    const step = steps[index];
    if (step.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      setMessages((m) => [
        ...m,
        { from: "user", text },
        { from: "bot", text: "That email doesn't look quite right — mind trying again?" },
      ]);
      setValue("");
      return;
    }
    const next = { ...answers, [step.key]: text };
    setAnswers(next);
    setValue("");

    const isLast = index === steps.length - 1;
    setMessages((m) => [
      ...m,
      { from: "user", text },
      ...(isLast
        ? [
            {
              from: "bot" as const,
              text: `Thanks, ${next.name}! Here's what I've got: ${next.business} — looking to automate ${next.goal?.toLowerCase()}, with the main challenge being ${next.challenge?.toLowerCase()}. That's a strong fit for our workflow and agent builds.`,
            },
            {
              from: "bot" as const,
              text: "I've pre-filled the consultation form with your answers — just hit the button below to review and book your free 30-minute session.",
            },
          ]
        : [{ from: "bot" as const, text: steps[index + 1].prompt }]),
    ]);

    if (isLast) {
      setDone(true);
      onQualified(next as LeadAnswers);
    } else {
      setIndex(index + 1);
    }
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    submitAnswer(value);
  };

  const goToForm = () => {
    setOpen(false);
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="lead-chat-panel"
        aria-label={open ? "Close the automation assistant" : "Open the automation assistant"}
        className="gradient-brand fixed right-5 bottom-5 z-[60] flex items-center gap-2.5 rounded-full px-5 py-4 text-sm font-bold text-white shadow-2xl shadow-violet-brand/40 transition-transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-violet-brand/40 focus-visible:outline-none sm:bottom-6 sm:right-6"
      >
        {open ? <X className="size-5" /> : <MessageSquareText className="size-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Scope my automation"}</span>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 size-3 animate-pulse rounded-full bg-lime-brand ring-2 ring-white" />
        )}
      </button>

      {open && (
        <div
          id="lead-chat-panel"
          role="dialog"
          aria-label="Automation assistant"
          className="fixed inset-x-3 bottom-24 z-[60] flex max-h-[70vh] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-28 sm:w-[24rem]"
        >
          <div className="gradient-brand flex items-center gap-3 px-5 py-4 text-white">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/20">
              <Bot className="size-5" />
            </span>
            <div>
              <p className="font-display text-sm font-bold">Nova · Automation assistant</p>
              <p className="text-xs text-white/75">Automated guide — not a live agent</p>
            </div>
          </div>

          <div
            ref={scrollRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto bg-secondary/30 px-4 py-5"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "bg-violet-brand text-white"
                      : "border border-border bg-card text-foreground"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}

            {!done && steps[index].chips && (
              <div className="flex flex-wrap gap-2 pt-1">
                {steps[index].chips!.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => submitAnswer(c)}
                    className="rounded-full border border-violet-brand/30 bg-violet-brand/5 px-3 py-1.5 text-xs font-semibold text-violet-brand transition-colors hover:bg-violet-brand/15"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {done && (
              <button
                type="button"
                onClick={goToForm}
                className="gradient-brand mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                Go to my consultation form
                <ArrowRight className="size-4" />
              </button>
            )}
          </div>

          {!done && (
            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type={steps[index].type === "email" ? "email" : "text"}
                placeholder={steps[index].placeholder}
                aria-label={steps[index].prompt}
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm focus:border-violet-brand focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="gradient-brand flex size-10 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
              >
                <Send className="size-4" />
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
