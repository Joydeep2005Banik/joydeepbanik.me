"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CONTACT_API = process.env.NEXT_PUBLIC_CONTACT_API;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorText("");

    if (!CONTACT_API) {
      // Graceful local demo behavior when API is not yet configured
      setTimeout(() => {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      }, 600);
      return;
    }

    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorText(err instanceof Error ? err.message : "Failed to send message");
    }
  }

  return (
    <section className="mt-2">
      <Link href="/" className="btn-ghost">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </Link>

      <div className="mt-16 sm:mt-20">
        <h1 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight text-primary">
          Say hello
        </h1>
        <p className="mt-3 text-base sm:text-lg text-secondary max-w-md leading-relaxed">
          Whether it&apos;s a project inquiry, a question, or just to say hi — I&apos;d love to connect with you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 sm:mt-12 max-w-lg">
        <div className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium uppercase tracking-widest text-tertiary mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="block w-full pb-2 text-lg outline-none transition-all duration-250"
              style={{
                background: "transparent",
                color: "var(--text)",
                borderBottom: "1px solid var(--border)",
              }}
              onFocus={(e) => (e.target.style.borderBottomColor = "var(--text)")}
              onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium uppercase tracking-widest text-tertiary mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="block w-full pb-2 text-lg outline-none transition-all duration-250"
              style={{
                background: "transparent",
                color: "var(--text)",
                borderBottom: "1px solid var(--border)",
              }}
              onFocus={(e) => (e.target.style.borderBottomColor = "var(--text)")}
              onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium uppercase tracking-widest text-tertiary mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="block w-full pb-2 text-lg outline-none resize-none transition-all duration-250"
              style={{
                background: "transparent",
                color: "var(--text)",
                borderBottom: "1px solid var(--border)",
              }}
              onFocus={(e) => (e.target.style.borderBottomColor = "var(--text)")}
              onBlur={(e) => (e.target.style.borderBottomColor = "var(--border)")}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-ghost font-medium disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
          </div>

          {status === "success" && (
            <p className="text-sm font-medium" style={{ color: "var(--green-muted)" }}>
              Thank you! Your message has been sent successfully.
            </p>
          )}

          {status === "error" && (
            <p className="text-sm font-medium text-red-500">
              {errorText || "Something went wrong. Please try again."}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
