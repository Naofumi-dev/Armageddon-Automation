import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Bot, Zap, Database, Globe, Calendar } from 'lucide-react';

// Declare Calendly on window to avoid TS errors
declare global {
  interface Window {
    Calendly: any;
  }
}

const Hero: React.FC = () => {

  const openScheduling = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/armageddon-automation/seo-audit' }); 
    } else {
      console.error("Calendly script not loaded");
    }
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] pt-20">
      {/* Abstract Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-orange-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Text Content - SEO Optimized */}
          <div className="lg:w-1/2 text-center lg:text-left z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Available for Freelance Projects
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                Scale with <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500">Intelligent Automation</span> <br/>
                & Technical SEO
              </h1>
              
              <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                I help businesses dominate search results and reclaim lost time. 
                Expert in <strong>n8n</strong>, <strong>Zapier</strong>, <strong>Make.com</strong>, and <strong>GoHighLevel</strong> to automate lead nurturing and operations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={scrollToProjects}
                  className="group px-8 py-4 bg-white text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
                >
                  View Featured Workflows
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={openScheduling}
                  className="px-8 py-4 bg-slate-900/50 backdrop-blur-md border border-slate-700 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Discovery Call
                </button>
              </div>
            </motion.div>
          </div>

          {/* Visual Element - Workflow "Cards" */}
          <div className="lg:w-1/2 w-full relative h-[400px] sm:h-[500px] flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-full max-w-[500px]"
            >
              {/* Central Connection Lines (Abstract Node Graph) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" overflow="visible">
                {/* Lines connecting the central hub to floating cards */}
                <motion.path 
                  d="M250 250 L100 150" 
                  stroke="url(#grad1)" 
                  strokeWidth="2" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <motion.path 
                  d="M250 250 L400 150" 
                  stroke="url(#grad2)" 
                  strokeWidth="2" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
                <motion.path 
                  d="M250 250 L120 380" 
                  stroke="url(#grad3)" 
                  strokeWidth="2" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 1.5, delay: 0.9 }}
                />
                <motion.path 
                  d="M250 250 L380 380" 
                  stroke="url(#grad4)" 
                  strokeWidth="2" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 1.5, delay: 1.1 }}
                />
                
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="grad4" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Central Hub */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-slate-900 rounded-2xl border border-orange-500/50 shadow-[0_0_40px_rgba(249,115,22,0.3)] z-10 flex items-center justify-center"
                animate={{ boxShadow: ["0 0 20px rgba(249,115,22,0.3)", "0 0 40px rgba(249,115,22,0.6)", "0 0 20px rgba(249,115,22,0.3)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>

              {/* Floating Cards */}
              
              {/* Card 1: SEO */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute top-[10%] left-[0%] md:-left-[10%] bg-[#0f172a] p-4 rounded-xl border border-slate-700 shadow-xl z-20 w-48"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Search className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="font-bold text-white text-xs">SEO Audit</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-orange-500" 
                    initial={{ width: "0%" }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                  <span>Health Score</span>
                  <span>98/100</span>
                </div>
              </motion.div>

              {/* Card 2: Automation */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                className="absolute top-[15%] right-[0%] md:-right-[10%] bg-[#0f172a] p-4 rounded-xl border border-slate-700 shadow-xl z-20 w-52"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="font-bold text-white text-xs">Auto-Response</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-slate-800/50 p-1.5 rounded">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Lead Captured</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-slate-800/50 p-1.5 rounded">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>CRM Updated</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Data */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-[10%] left-[5%] md:left-[0%] bg-[#0f172a] p-4 rounded-xl border border-slate-700 shadow-xl z-20 w-44"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Database className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="font-bold text-white text-xs">Data Sync</span>
                </div>
                <div className="flex justify-between items-end h-8 gap-1">
                  {[40, 70, 50, 90, 60].map((h, i) => (
                    <motion.div 
                      key={i}
                      className="w-full bg-cyan-500/50 rounded-t-sm"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: 1 + (i * 0.1) }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Card 4: Web */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-[20%] right-[5%] md:right-[0%] bg-[#0f172a] p-4 rounded-xl border border-slate-700 shadow-xl z-20 w-48"
              >
                 <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Globe className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="font-bold text-white text-xs">Webhooks</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 bg-black/40 p-2 rounded border border-white/5">
                  POST /api/v1/lead<br/>
                  Status: <span className="text-green-400">200 OK</span>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;