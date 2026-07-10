"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const SUGGESTED_QUESTIONS = [
  "Why does Anthropic's approach to AI safety, specifically Constitutional AI, resonate with Christian? Why does he feel this approach is important?",
  "What type of technical and API-based products has Christian sold to engineering teams, and what specific steps has he taken to be outstanding at this type of sale?",
  "How does Christian's experience as an entrepreneur help him break into new accounts and target new verticals?",
  "BitGo wasn't looking for Taxbit's solution when Christian brought it to them — how did he open that account with no expressed need and no RFP?",
  "Christian grew Gemini from $120K to $1.3M in a year — how did he do so, and what does that tell Anthropic about how he will grow accounts?",
  "How does Christian use AI in his own sales process, and what does \"AI-native\" mean for him in practice?",
];

type DisplayMessage = { role: "user" | "assistant"; content: string };

export default function Home() {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const latestQuestionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (messages[messages.length - 1]?.role === "user") {
      latestQuestionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");

    const nextMessages: DisplayMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "" },
      ]);
    } catch {
      setError("Something went wrong reaching the AI Cover Letter. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:py-20">
      <h1 className="mb-8 text-3xl font-bold text-stone-900 sm:text-4xl">
        Christian Vavuris, Candidate for Account Executive, Anthropic
      </h1>

      <div className="text-[17px] leading-[1.75] text-stone-800">
        <p className="mb-[18px]">
          I&apos;m{" "}
          <a
            href="https://www.linkedin.com/in/cvavuris/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 underline underline-offset-2 hover:text-amber-900"
          >
            Christian Vavuris
          </a>
          , an account executive with 10+ years selling usage-based
          technology products to businesses of all sizes.
        </p>
        <p className="mb-[18px]">
          This AI Cover Letter is built to help the Anthropic team quickly
          understand why I&apos;m an outstanding fit for the Account
          Executive role. It&apos;s designed to provide a faster, more
          complete signal than a cover letter alone — so you can evaluate my
          candidacy efficiently.
        </p>
        <p>
          Here are copies of my{" "}
          <a
            href="https://drive.google.com/file/d/17aqhXB_IlUYaFLx5ViFmASxEpRx0b1aj/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 underline underline-offset-2 hover:text-amber-900"
          >
            resume
          </a>{" "}
          and{" "}
          <a
            href="https://drive.google.com/file/d/1143cOofgZAISgAaY6LUR31T7vbinjDM2/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 underline underline-offset-2 hover:text-amber-900"
          >
            cover letter
          </a>
          , and at the bottom of the page are some example questions you can
          use to get started.
        </p>
      </div>

      <div className="mt-8 rounded-md border border-stone-300 bg-[#fdfbf6]">
        {(messages.length > 0 || loading) && (
          <div className="max-h-[420px] overflow-y-auto p-5 sm:p-6">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <p
                  key={i}
                  ref={i === messages.length - 1 ? latestQuestionRef : undefined}
                  className={`scroll-mt-4 text-[16px] font-bold text-stone-900 ${
                    i === 0 ? "" : "mt-6 border-t border-stone-200 pt-6"
                  }`}
                >
                  {m.content}
                </p>
              ) : (
                <div
                  key={i}
                  className="mt-3 space-y-3 text-[16px] leading-[1.75] text-stone-700 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_strong]:font-bold [&_strong]:text-stone-900 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
                >
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              )
            )}
            {loading && (
              <p className="mt-3 text-[16px] text-stone-400">Thinking…</p>
            )}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className={`flex items-center gap-3 p-4 ${
            messages.length > 0 || loading ? "border-t border-stone-300" : ""
          }`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about Christian…"
            disabled={loading}
            className="flex-1 bg-transparent text-[16px] text-stone-900 placeholder:text-stone-400 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="text-[15px] font-bold text-amber-800 hover:text-amber-900 disabled:text-stone-300"
          >
            Send
          </button>
        </form>
      </div>

      <p className="mt-2.5 text-[12px] text-stone-500">
        AI Cover Letter answering on Christian&apos;s behalf, based on
        information he&apos;s provided.
      </p>

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

      <div className="mt-12 flex flex-col">
        {SUGGESTED_QUESTIONS.map((q, i) => (
          <button
            key={q}
            type="button"
            onClick={() => sendMessage(q)}
            disabled={loading}
            className={`group flex items-start gap-2 border-t border-stone-300 px-2 py-2.5 text-left text-[15px] text-stone-600 transition-colors hover:bg-stone-100/60 hover:text-amber-800 disabled:opacity-50 ${
              i === SUGGESTED_QUESTIONS.length - 1 ? "border-b" : ""
            }`}
          >
            <span
              aria-hidden
              className="mt-0.5 shrink-0 text-stone-400 transition-colors group-hover:text-amber-800"
            >
              →
            </span>
            <span>{q}</span>
          </button>
        ))}
      </div>

      <div className="mt-12 border-t border-stone-300 pt-6 text-[15px] text-stone-600">
        <p>
          <a
            href="mailto:cvavuris@gmail.com"
            className="text-amber-800 underline underline-offset-2 hover:text-amber-900"
          >
            cvavuris@gmail.com
          </a>
        </p>
        <p className="mt-1">
          <a
            href="tel:+14152464384"
            className="text-amber-800 underline underline-offset-2 hover:text-amber-900"
          >
            1-415-246-4384
          </a>
        </p>
        <p className="mt-1">
          <a
            href="https://www.linkedin.com/in/cvavuris/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 underline underline-offset-2 hover:text-amber-900"
          >
            linkedin.com/in/cvavuris
          </a>
        </p>
      </div>
    </main>
  );
}
