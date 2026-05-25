"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const initAudio = () => {
    // Check if browser supports AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    // Create a lowpass filter for a deep drone
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(140, ctx.currentTime);
    filter.Q.setValueAtTime(2.0, ctx.currentTime);
    filterRef.current = filter;

    // Main gain node (low volume for ambient background)
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0.04, ctx.currentTime);
    gainNodeRef.current = mainGain;

    // Oscillator 1 - Deep drone (55Hz / A1)
    const osc1 = ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(55, ctx.currentTime);
    osc1Ref.current = osc1;

    // Oscillator 2 - Detuned drone (55.4Hz) for chorus/beating effect
    const osc2 = ctx.createOscillator();
    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(55.4, ctx.currentTime);
    osc2Ref.current = osc2;

    // LFO to slowly sweep filter cutoff for motion
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 12 seconds per cycle
    lfoRef.current = lfo;

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(40, ctx.currentTime); // sweep filter frequency +/- 40Hz

    // Connections
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(ctx.destination);

    // Start oscillators
    osc1.start(0);
    osc2.start(0);
    lfo.start(0);
  };

  const handleToggle = () => {
    if (!audioContextRef.current) {
      initAudio();
      setIsPlaying(true);
      return;
    }

    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
      setIsPlaying(true);
    } else if (ctx.state === "running" && isPlaying) {
      ctx.suspend();
      setIsPlaying(false);
    } else if (ctx.state === "running" && !isPlaying) {
      ctx.resume();
      setIsPlaying(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 glass-panel text-xs text-zinc-400 hover:text-white transition-all select-none group"
      aria-label="Toggle ambient background hum"
      data-clickable
    >
      {isPlaying ? (
        <>
          <div className="flex items-end gap-[2px] h-3 w-4 overflow-hidden">
            <span className="w-[2px] h-2 bg-neon-blue rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
            <span className="w-[2px] h-3 bg-neon-blue rounded-full animate-[pulse_0.5s_ease-in-out_infinite_delay-100]" style={{ animationDelay: "0.2s" }} />
            <span className="w-[2px] h-1.5 bg-neon-blue rounded-full animate-[pulse_0.6s_ease-in-out_infinite_delay-200]" style={{ animationDelay: "0.4s" }} />
            <span className="w-[2px] h-2.5 bg-neon-blue rounded-full animate-[pulse_0.7s_ease-in-out_infinite_delay-300]" style={{ animationDelay: "0.1s" }} />
          </div>
          <span className="font-mono text-[9px] tracking-wider text-neon-blue font-semibold uppercase">AMBIENCE_ON</span>
        </>
      ) : (
        <>
          <VolumeX size={12} className="text-zinc-500 group-hover:text-zinc-300" />
          <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">AMBIENCE_OFF</span>
        </>
      )}
    </button>
  );
}
