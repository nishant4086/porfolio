"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, ShieldAlert, CheckCircle } from "lucide-react";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const simulateTransmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setLogs(["[ERROR] Validation failed. Missing required packet fields."]);
      return;
    }

    setStatus("sending");
    setLogs([
      "INITIALIZING SECURE UPLINK...",
      "PACKAGING PAYLOAD DATA...",
      `TARGET: r.nishant4806@gmail.com`,
    ]);

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
      await delay(600);
      setLogs((prev) => [...prev, "ENCRYPTING PACKET USING SHA-256..."]);
      await delay(700);
      setLogs((prev) => [...prev, "OPENING FIREWALL TUNNEL PORT 443..."]);
      await delay(500);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "81514b19-cc84-48e1-9f3d-70d71a685fb8",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
          from_name: "Nishant Portfolio System",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLogs((prev) => [...prev, "TRANSMITTING: 100% COMPLETE. DISPATCHING..."]);
        await delay(600);
        setStatus("success");
        setLogs((prev) => [...prev, "[SUCCESS] Transmission acknowledged. Email dispatched successfully."]);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Uplink packet rejected by handler.");
      }
    } catch (err: any) {
      setStatus("error");
      setLogs([`[ERROR] Uplink failed: ${err.message || "Network link drop."}`]);
    }
  };

  const socialLinks = [
    { name: "GitHub", icon: <GithubIcon size={18} />, href: "https://github.com/nishant4086", color: "hover:text-[#24292e] hover:border-[#24292e]/40 hover:bg-[#24292e]/5" },
    { name: "LinkedIn", icon: <LinkedinIcon size={18} />, href: "https://www.linkedin.com/in/nishant-rankawat-20501a320/", color: "hover:text-[#0077b5] hover:border-[#0077b5]/40 hover:bg-[#0077b5]/5" },
    { name: "Twitter/X", icon: <TwitterIcon size={18} />, href: "https://x.com/nishant4806", color: "hover:text-[#1da1f2] hover:border-[#1da1f2]/40 hover:bg-[#1da1f2]/5" },
    { name: "Email", icon: <Mail size={18} />, href: "mailto:r.nishant4806@gmail.com", color: "hover:text-neon-blue hover:border-neon-blue/40 hover:bg-neon-blue/5" },
  ];

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden" ref={containerRef}>

      {/* Background neon blurs */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-neon-blue/5 blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        {/* Left Side: Contact details & Socials (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col items-start gap-2">
            <span className="font-mono text-xs tracking-widest text-neon-blue font-semibold uppercase">06 // Connect</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
              Establish Uplink
            </h2>
          </div>

          <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans max-w-md">
            Whether you want to discuss a new AI model deployment, system scale, open opportunities, or just say hello, send a secure transmission packet.
          </p>

          <div className="h-[1px] bg-white/5 w-full" />

          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className={`p-4 rounded-lg border border-white/5 bg-cyber-gray/70 flex items-center gap-3 transition-all duration-300 glass-panel group ${link.color}`}
                data-clickable
              >
                <div className="text-zinc-500 group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
                <span className="font-mono text-xs text-zinc-400 group-hover:text-white transition-colors duration-200">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Cyber Form (7 cols) */}
        <div className="lg:col-span-7 w-full">
          <motion.div
            className="rounded-xl border border-white/5 bg-cyber-gray/80 p-8 glass-panel relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Header indicator */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-semibold flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${status === "sending" ? "bg-yellow-500 animate-pulse" : status === "success" ? "bg-neon-blue" : "bg-zinc-500"}`} />
                UPLINK STATUS: {status.toUpperCase()}
              </span>
              <span className="font-mono text-[9px] text-zinc-600">SECURE_SSL // v2.3</span>
            </div>

            {status !== "success" ? (
              <form onSubmit={simulateTransmission} className="flex flex-col gap-6">

                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5 relative group">
                    <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Guest Agent"
                      className="px-4 py-3 rounded border border-white/5 bg-cyber-black text-xs md:text-sm text-white outline-none focus:border-neon-blue/30 transition-all duration-300"
                      disabled={status === "sending"}
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5 relative group">
                    <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. guest@agency.net"
                      className="px-4 py-3 rounded border border-white/5 bg-cyber-black text-xs md:text-sm text-white outline-none focus:border-neon-blue/30 transition-all duration-300"
                      disabled={status === "sending"}
                      required
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-1.5 relative group">
                  <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Transmission Payload</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter message details..."
                    rows={5}
                    className="px-4 py-3 rounded border border-white/5 bg-cyber-black text-xs md:text-sm text-white outline-none focus:border-neon-blue/30 transition-all duration-300 resize-none"
                    disabled={status === "sending"}
                    required
                  />
                </div>

                {/* Error log readout if validation fails */}
                {status === "error" && (
                  <div className="p-3 bg-red-950/20 border border-red-900/30 rounded text-red-400 font-mono text-xs flex items-center gap-2">
                    <ShieldAlert size={14} />
                    {logs[0]}
                  </div>
                )}

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full md:w-auto md:self-end px-6 py-3 rounded bg-gradient-to-r from-neon-blue to-neon-purple text-xs font-mono font-bold tracking-widest text-white uppercase shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                  data-clickable
                >
                  <Send size={12} />
                  <span>Send Packet</span>
                </button>
              </form>
            ) : (
              /* Success logs screen */
              <div className="flex flex-col gap-6 font-mono text-xs md:text-sm">
                <div className="flex items-center gap-3 text-neon-blue">
                  <CheckCircle size={24} className="animate-pulse" />
                  <span className="font-display font-extrabold uppercase text-base tracking-wide">
                    Transmission Dispatched
                  </span>
                </div>

                {/* Simulated Log Output */}
                <div className="p-4 bg-cyber-black rounded border border-white/5 text-zinc-400 flex flex-col gap-1.5">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-neon-purple select-none">&gt;&gt;</span>
                      <span className={log.startsWith("[SUCCESS]") ? "text-neon-blue font-bold" : ""}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStatus("idle")}
                  className="px-4 py-2 border border-white/10 hover:border-neon-blue/30 bg-white/5 hover:bg-neon-blue/5 rounded text-xs font-mono tracking-widest text-white uppercase self-start transition-all"
                  data-clickable
                >
                  Send Another Transmission
                </button>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
