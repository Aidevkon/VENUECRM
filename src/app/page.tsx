"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Chatbot } from "@/components/chatbot";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-orange-500 selection:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-zinc-950/60 to-zinc-950" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl space-y-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-orange-500 font-medium tracking-[0.2em] uppercase text-sm md:text-base mb-4">
              Est. 2025 • Lagonisi, Greece
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
              WIZZ <span className="text-orange-500">LAGONISI</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full px-4"
          >
            {/* The Chatbot is now the Hero Interface */}
            <Chatbot />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/50 animate-bounce" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-zinc-950 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { title: "Exquisite Flavors", desc: "Locally sourced ingredients, globally inspired recipes." },
            { title: "Seaside Ambience", desc: "Breathtaking views of the Saronic Gulf." },
            { title: "Private Events", desc: "The perfect venue for your special moments." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="space-y-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/30 transition-colors"
            >
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              <p className="text-zinc-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
