import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, BarChart2, Globe, Database, Zap, 
  Workflow, Layers, MessageSquare, LayoutTemplate, 
  Cpu, Activity, Box, Mail, CheckSquare, DollarSign,
  TrendingUp, Monitor, Shield, HardDrive, Linkedin, Facebook
} from 'lucide-react';

const tools = [
  // Automation & Low Code
  { name: 'n8n', icon: <Workflow className="w-5 h-5" />, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { name: 'Make.com', icon: <Zap className="w-5 h-5" />, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { name: 'Zapier', icon: <Activity className="w-5 h-5" />, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { name: 'GoHighLevel', icon: <Layers className="w-5 h-5" />, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { name: 'Pipedream', icon: <Cpu className="w-5 h-5" />, color: 'text-lime-400', bg: 'bg-lime-500/10', border: 'border-lime-500/20' },
  
  // SEO & Analytics
  { name: 'Ahrefs', icon: <BarChart2 className="w-5 h-5" />, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { name: 'SEMrush', icon: <Search className="w-5 h-5" />, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { name: 'Screaming Frog', icon: <MessageSquare className="w-5 h-5" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { name: 'SE Ranking', icon: <TrendingUp className="w-5 h-5" />, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { name: 'Google Search Console', icon: <Globe className="w-5 h-5" />, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { name: 'Google Analytics 4', icon: <Activity className="w-5 h-5" />, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  
  // Platforms & CRM & Security
  { name: 'WordPress', icon: <LayoutTemplate className="w-5 h-5" />, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { name: 'Salesforce', icon: <Database className="w-5 h-5" />, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { name: 'Apollo.io', icon: <Database className="w-5 h-5" />, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  { name: 'Okta', icon: <Shield className="w-5 h-5" />, color: 'text-slate-200', bg: 'bg-slate-700/50', border: 'border-slate-500/50' },
  
  // Project & Finance
  { name: 'Asana', icon: <CheckSquare className="w-5 h-5" />, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { name: 'Xero', icon: <DollarSign className="w-5 h-5" />, color: 'text-blue-300', bg: 'bg-blue-300/10', border: 'border-blue-300/20' },
  { name: 'Trello', icon: <Monitor className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-600/10', border: 'border-blue-600/20' },
  { name: 'Slack', icon: <MessageSquare className="w-5 h-5" />, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20' },
  { name: 'Google Drive', icon: <HardDrive className="w-5 h-5" />, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  
  // Marketing & AI
  { name: 'OpenAI', icon: <Box className="w-5 h-5" />, color: 'text-white', bg: 'bg-slate-700/30', border: 'border-slate-600' },
  { name: 'ActiveCampaign', icon: <Mail className="w-5 h-5" />, color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { name: 'SendGrid', icon: <Mail className="w-5 h-5" />, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { name: 'Mailchimp', icon: <Mail className="w-5 h-5" />, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-600/10', border: 'border-blue-600/20' },
  { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
];

const TechStack: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 border-y border-slate-900 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
          The <span className="text-orange-500">Modern Stack</span> I Use
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Leveraging industry-leading tools for Technical SEO audits, CRM management, and full-cycle workflow automation.
        </p>
      </div>

      <div className="flex relative mask-linear-gradient">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: [0, -1500] }}
          transition={{
            repeat: Infinity,
            duration: 45,
            ease: "linear",
          }}
        >
          {[...tools, ...tools, ...tools].map((tool, index) => (
            <div
              key={index}
              className={`
                inline-flex items-center gap-3 px-6 py-4 rounded-xl border backdrop-blur-sm
                ${tool.bg} ${tool.border} transition-transform hover:scale-105 shrink-0
              `}
            >
              <div className={`${tool.color}`}>
                {tool.icon}
              </div>
              <span className="text-slate-200 font-medium">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default TechStack;