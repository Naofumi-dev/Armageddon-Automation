import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Bot, Zap, Database, Globe, Calendar, Cpu } from 'lucide-react';

// Declare Calendly on window to avoid TS errors
declare global {
  interface Window {
    Calendly: any;
  }
}

// --- DEFINE FLOATING CARD COMPONENT FIRST ---
const FloatingCard = ({ x, label, icon: Icon, color, progress, status, bars, code }: any) => {
  const colorClasses: Record<string, string> = {
    orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    purple: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  };

  return (
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className={`absolute ${x} bg-[#0f172a]/90 backdrop-blur-md p-4 rounded-lg border border-slate-800 shadow-2xl z-20 w-44`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-1.5 rounded-md ${colorClasses[color]?.split(' ')[1] || ''}`}>
          <Icon className={`w-3.5 h-3.5 ${colorClasses[color]?.split(' ')[0] || ''}`} />
        </div>
        <span className="font-mono font-bold text-white text-[10px] tracking-wider">{label}</span>
      </div>
      
      {progress && (
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <motion.div className="h-full bg-orange-500" initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ duration: 1.5, delay: 1 }} />
        </div>
      )}
      
      {status && status.map((s: string, i: number) => (
        <div key={i} className="flex items-center gap-2 text-[10px] text-slate-400 bg-slate-900/50 p-1 mb-1 rounded border border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {s}
        </div>
      ))}

      {bars && (
        <div className="flex justify-between items-end h-6 gap-1">
          {bars.map((h: number, i: number) => (
            <motion.div key={i} className="w-full bg-cyan-500/50 rounded-t-[2px]" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: 1 + (i * 0.1) }} />
          ))}
        </div>
      )}

      {code && (
        <div className="text-[9px] font-mono text-slate-400 bg-black/40 p-2 rounded border border-white/5">
          {code}
        </div>
      )}
    </motion.div>
  );
};

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
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 500" overflow="visible">
                {/* Lines connecting the central hub to floating cards */}
                <motion.path 
                  d="M250 250 L100 120" 
                  stroke="url(#grad1)" 
                  strokeWidth="1" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <motion.path 
                  d="M250 250 L400 120" 
                  stroke="url(#grad2)" 
                  strokeWidth="1" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
                <motion.path 
                  d="M250 250 L120 380" 
                  stroke="url(#grad3)" 
                  strokeWidth="1" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1.5, delay: 0.9 }}
                />
                <motion.path 
                  d="M250 250 L380 380" 
                  stroke="url(#grad4)" 
                  strokeWidth="1" 
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1.5, delay: 1.1 }}
                />
                
                {/* Data Packets (Mini CPUs traveling) */}
                <motion.g>
                  <circle r="14" fill="#09090b" stroke="#f97316" strokeWidth="1" strokeDasharray="3 2">
                     <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <path d="M-6 -6 H6 V6 H-6 Z M-4 -8 V-6 M4 -8 V-6 M-4 6 V8 M4 6 V8 M-8 -4 H-6 M-8 4 H-6 M6 -4 H8 M6 4 H8" fill="#f97316" transform="scale(0.8)"/>
                  <animateMotion dur="3s" repeatCount="indefinite" path="M250 250 L100 120" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" repeatCount="indefinite" />
                </motion.g>

                <motion.g>
                  <circle r="14" fill="#09090b" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2">
                     <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <path d="M-6 -6 H6 V6 H-6 Z M-4 -8 V-6 M4 -8 V-6 M-4 6 V8 M4 6 V8 M-8 -4 H-6 M-8 4 H-6 M6 -4 H8 M6 4 H8" fill="#3b82f6" transform="scale(0.8)"/>
                  <animateMotion dur="4s" repeatCount="indefinite" path="M250 250 L400 120" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="4s" repeatCount="indefinite" />
                </motion.g>

                <motion.g>
                  <circle r="14" fill="#09090b" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 2">
                     <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <path d="M-6 -6 H6 V6 H-6 Z M-4 -8 V-6 M4 -8 V-6 M-4 6 V8 M4 6 V8 M-8 -4 H-6 M-8 4 H-6 M6 -4 H8 M6 4 H8" fill="#06b6d4" transform="scale(0.8)"/>
                  <animateMotion dur="3.5s" repeatCount="indefinite" path="M250 250 L120 380" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3.5s" repeatCount="indefinite" />
                </motion.g>

                <motion.g>
                  <circle r="14" fill="#09090b" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2">
                     <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <path d="M-6 -6 H6 V6 H-6 Z M-4 -8 V-6 M4 -8 V-6 M-4 6 V8 M4 6 V8 M-8 -4 H-6 M-8 4 H-6 M6 -4 H8 M6 4 H8" fill="#8b5cf6" transform="scale(0.8)"/>
                  <animateMotion dur="4.5s" repeatCount="indefinite" path="M250 250 L380 380" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="4.5s" repeatCount="indefinite" />
                </motion.g>

                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f97316" stopOpacity="0" /><stop offset="100%" stopColor="#f97316" /></linearGradient>
                  <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
                  <linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#06b6d4" stopOpacity="0" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient>
                  <linearGradient id="grad4" x1="100%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient>
                </defs>
              </svg>

              {/* Central Initialize Button */}
              <motion.button onClick={scrollToProjects} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-[#09090b] rounded-full border border-slate-800 z-10 flex flex-col items-center justify-center group cursor-pointer hover:border-orange-500/50 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="absolute inset-0 rounded-full border border-dashed border-slate-700 animate-spin-slow group-hover:border-orange-500/30"></div>
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15),transparent_70%)] absolute top-0 left-0 animate-pulse"></div>
                <Cpu className="w-8 h-8 text-slate-400 group-hover:text-orange-500 transition-colors mb-2" />
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-orange-400 tracking-wider">INITIALIZE</span>
              </motion.button>

              {/* Orbiting Cards */}
              <FloatingCard x="left-[5%] top-[10%]" label="SEO AUDIT" icon={Search} color="orange" progress={98} />
              <FloatingCard x="right-[5%] top-[15%]" label="AUTOMATION" icon={Bot} color="blue" status={['Lead Captured', 'CRM Updated']} />
              <FloatingCard x="left-[10%] bottom-[15%]" label="WEBHOOKS" icon={Database} color="cyan" bars={[40, 70, 50, 90, 60]} />
              <FloatingCard x="right-[5%] bottom-[10%]" label="HTTP_REQ" icon={Globe} color="purple" code="POST /api/v1 200 OK" />

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;