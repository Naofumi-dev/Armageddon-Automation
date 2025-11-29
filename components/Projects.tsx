import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Workflow, FileText, Phone, Zap, Share2, Layers, MessageSquare, Briefcase, X, ZoomIn, ArrowRight, ExternalLink, PenTool, Activity } from 'lucide-react';
import { Project } from '../types';

// INSTRUCTIONS FOR IMAGES:
// Images are hosted on GitHub. If you need to change them, push new images to your repo 
// and update the URLs below to use the raw.githubusercontent.com format.

const projects: Project[] = [
  {
    id: '1',
    title: 'Lead Enrichment & Scoring',
    category: 'Zapier Automation',
    description: 'A comprehensive Zapier workflow that catches new leads, enriches them using the Apollo API to gather company data, calculates a priority score, and routes high-value prospects to Sales via Slack.',
    tools: ['Zapier', 'Apollo API', 'Formatter', 'Paths'],
    icon: <Zap className="w-5 h-5 text-orange-400" />,
    image: 'https://raw.githubusercontent.com/Naofumi-dev/website-portfolio/main/zapier-lead-actions.png'
  },
  {
    id: '2',
    title: 'Missed Call Text Back',
    category: 'GoHighLevel',
    description: 'An intelligent GoHighLevel automation that detects missed calls, tags the contact, waits a defined period, and instantly engages the customer via SMS to prevent lead loss.',
    tools: ['GoHighLevel', 'SMS', 'Workflow Builder', 'Tags'],
    icon: <Phone className="w-5 h-5 text-blue-400" />,
    image: 'https://raw.githubusercontent.com/Naofumi-dev/website-portfolio/main/ghl-missed-call.png'
  },
  {
    id: '3',
    title: 'Asana & Xero Sync',
    category: 'Make.com',
    description: 'A complex Make.com scenario bridging Project Management and Finance. It listens for completed Asana tasks, routes data through a flow control router, and creates invoices in Xero.',
    tools: ['Make', 'Asana', 'Xero', 'Router'],
    icon: <FileText className="w-5 h-5 text-purple-400" />,
    image: 'https://raw.githubusercontent.com/Naofumi-dev/website-portfolio/main/make-asana-xero.png'
  },
  {
    id: '4',
    title: 'AI Jobs Scraper',
    category: 'n8n Workflow',
    description: 'Advanced n8n workflow that triggers via Slack, scrapes job boards, uses an AI Agent to analyze descriptions against a resume, and drafts personalized cover letters via Gmail.',
    tools: ['n8n', 'AI Agent', 'Slack', 'Gmail'],
    icon: <Workflow className="w-5 h-5 text-red-400" />,
    image: 'https://raw.githubusercontent.com/Naofumi-dev/website-portfolio/main/n8n-job-scraper.png'
  },
  {
    id: '5',
    title: 'Daily Story Generator',
    category: 'Pipedream',
    description: 'A creative Pipedream workflow that fetches random subjects (like Pokemon), uses an LLM to generate a unique short story, and posts it to a specific Slack channel.',
    tools: ['Pipedream', 'Node.js', 'APIs', 'Slack'],
    icon: <Layers className="w-5 h-5 text-green-400" />,
    image: 'https://raw.githubusercontent.com/Naofumi-dev/website-portfolio/main/pipedream-story.png'
  },
  {
    id: '6',
    title: 'Gemini AI Agent',
    category: 'n8n AI',
    description: 'An autonomous AI agent built in n8n that utilizes Google Gemini to process natural language queries, manage conversation memory, and execute tools via HTTP requests.',
    tools: ['n8n', 'Google Gemini', 'Memory', 'HTTP Request'],
    icon: <Briefcase className="w-5 h-5 text-indigo-400" />,
    image: 'https://raw.githubusercontent.com/Naofumi-dev/website-portfolio/main/n8n-gemini-agent.png'
  },
  {
    id: '7',
    title: 'Lead Actions Automation',
    category: 'Zapier Logic',
    description: 'Multi-path Zapier workflow that segments incoming leads based on intent (Approved, Quoted, Paid). It creates folders in Drive, sends emails, and updates CRM records accordingly.',
    tools: ['Zapier', 'Paths', 'Gmail', 'Google Drive'],
    icon: <Share2 className="w-5 h-5 text-pink-400" />,
    // Updated to ensure URL encoding is safe
    image: 'https://raw.githubusercontent.com/Naofumi-dev/website-portfolio/main/Lead%20Action%20Automation%20-%20Zapier.png'
  },
  {
    id: '8',
    title: 'Google Sheets Integration',
    category: 'Make.com',
    description: 'Data synchronization workflow in Make.com that watches for row updates in Google Sheets, searches for duplicates, updates existing records, and syncs status to Slack.',
    tools: ['Make', 'Google Sheets', 'Slack', 'Search Rows'],
    icon: <MessageSquare className="w-5 h-5 text-yellow-400" />,
    image: 'https://raw.githubusercontent.com/Naofumi-dev/website-portfolio/main/make-google-sheets.png'
  },
  {
    id: '9',
    title: 'Content Repurposing',
    category: 'Zapier AI',
    description: 'Automated content engine that takes an audio file from Google Drive, transcribes it, uses AI to generate blog posts, and distributes them to Facebook and LinkedIn pages.',
    tools: ['Zapier', 'AI by Zapier', 'Facebook', 'LinkedIn'],
    icon: <PenTool className="w-5 h-5 text-cyan-400" />,
    image: 'https://raw.githubusercontent.com/Naofumi-dev/website-portfolio/main/zapier-content-repurposing.png'
  }
];

// --- Workflow Visualization Component (Fallback) ---
const WorkflowVisual: React.FC<{ tool: string }> = ({ tool }) => {
  // Determine colors based on tool
  let primaryColor = "#f97316"; // Default Orange
  let secondaryColor = "#3b82f6"; // Default Blue
  
  if (tool.includes('Zapier')) { primaryColor = "#ff4f00"; secondaryColor = "#ff8c00"; }
  else if (tool.includes('n8n')) { primaryColor = "#ff6b6b"; secondaryColor = "#ea4c89"; }
  else if (tool.includes('Make')) { primaryColor = "#6d28d9"; secondaryColor = "#a855f7"; }
  else if (tool.includes('GoHighLevel')) { primaryColor = "#3b82f6"; secondaryColor = "#06b6d4"; }
  else if (tool.includes('Pipedream')) { primaryColor = "#22c55e"; secondaryColor = "#10b981"; }

  return (
    <div className="w-full h-full bg-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Abstract Node Graph SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        <defs>
          <linearGradient id={`grad-${tool}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Connection Lines */}
        <motion.path 
          d="M50 150 C 100 150, 100 80, 150 80" 
          fill="none" stroke={`url(#grad-${tool})`} strokeWidth="3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path 
          d="M50 150 C 100 150, 100 220, 150 220" 
          fill="none" stroke={`url(#grad-${tool})`} strokeWidth="3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.path 
          d="M150 80 L 250 80" 
          fill="none" stroke={`url(#grad-${tool})`} strokeWidth="3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path 
          d="M150 220 L 220 220" 
          fill="none" stroke={`url(#grad-${tool})`} strokeWidth="3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
        />
         <motion.path 
          d="M250 80 C 300 80, 300 150, 350 150" 
          fill="none" stroke={`url(#grad-${tool})`} strokeWidth="3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
        />
         <motion.path 
          d="M220 220 C 280 220, 280 150, 350 150" 
          fill="none" stroke={`url(#grad-${tool})`} strokeWidth="3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
        />

        {/* Nodes */}
        <motion.circle cx="50" cy="150" r="8" fill={primaryColor} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0 }} />
        <motion.circle cx="150" cy="80" r="8" fill={primaryColor} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} />
        <motion.circle cx="150" cy="220" r="8" fill={primaryColor} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
        <motion.circle cx="250" cy="80" r="8" fill={secondaryColor} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 }} />
        <motion.circle cx="220" cy="220" r="8" fill={secondaryColor} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.0 }} />
        <motion.circle cx="350" cy="150" r="10" fill="white" stroke={secondaryColor} strokeWidth="3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }} />
      </svg>
      
      <div className="z-10 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
         <Activity className="w-4 h-4 text-white" />
         <span className="text-white text-xs font-mono">Workflow Visualization</span>
      </div>
    </div>
  );
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" className="py-32 bg-[#F3F4F6] relative overflow-hidden text-slate-900">
       {/* n8n-inspired light background with subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest">
              <Zap className="w-3 h-3" />
              Featured Workflows
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
              Automation <span className="text-orange-600">Architecture</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Explore the blueprints of efficiency. These live workflows power real business operations, 
              connecting disparate apps into unified intelligent systems.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-orange-400 hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
            >
              {/* Card Header */}
              <div className="h-12 bg-white border-b border-slate-100 flex items-center justify-between px-5">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{project.category}</span>
                 </div>
                 {project.icon}
              </div>

              {/* Image Container */}
              <div className="h-56 w-full bg-slate-100 relative overflow-hidden group-hover:shadow-inner transition-shadow">
                {imageErrors[project.id] ? (
                  <WorkflowVisual tool={project.tools[0]} />
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={() => handleImageError(project.id)}
                  />
                )}
                
                <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ZoomIn className="w-4 h-4" /> View Details
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 mt-auto">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span 
                      key={tool} 
                      className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200 group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-700 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="text-[10px] font-semibold text-slate-400 px-1 py-1">
                      +{project.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                    {selectedProject.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedProject.title}</h3>
                    <p className="text-slate-500 text-sm">{selectedProject.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!imageErrors[selectedProject.id] && (
                    <a 
                      href={selectedProject.image} 
                      target="_blank" 
                      rel="noreferrer"
                      className="hidden sm:flex p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 items-center gap-2 text-xs font-medium"
                      title="Open Full Resolution Image"
                    >
                      <ExternalLink className="w-4 h-4" /> Open Full Size
                    </a>
                  )}
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1 p-0 flex flex-col">
                {/* Image Section - Dark Background for better contrast on workflow screenshots */}
                <div className="w-full bg-slate-900 min-h-[400px] flex items-center justify-center p-4 sm:p-8 relative group border-b border-slate-200">
                  {imageErrors[selectedProject.id] ? (
                     <div className="w-full h-[400px]">
                        <WorkflowVisual tool={selectedProject.tools[0]} />
                     </div>
                  ) : (
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full h-auto max-h-[80vh] object-contain shadow-2xl rounded-lg"
                      onError={() => handleImageError(selectedProject.id)}
                    />
                  )}
                  
                  {!imageErrors[selectedProject.id] && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Scroll to see details
                    </div>
                  )}
                </div>
                
                {/* Text Details */}
                <div className="p-6 sm:p-8 bg-white flex-1">
                  <h4 className="font-bold text-lg text-slate-900 mb-3">About this Workflow</h4>
                  <p className="text-slate-600 leading-relaxed mb-8 max-w-4xl">
                    {selectedProject.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h5 className="font-bold text-sm text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-orange-500" /> Tech Stack
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tools.map((tool) => (
                          <span 
                            key={tool} 
                            className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md font-medium text-sm border border-slate-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                       <h5 className="font-bold text-sm text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                         <Zap className="w-4 h-4 text-orange-500" /> Key Features
                       </h5>
                       <ul className="space-y-3">
                         <li className="flex items-start gap-3 text-sm text-slate-600">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                           <span>Automated error handling and conditional routing</span>
                         </li>
                         <li className="flex items-start gap-3 text-sm text-slate-600">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                           <span>Real-time data synchronization between platforms</span>
                         </li>
                         <li className="flex items-start gap-3 text-sm text-slate-600">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                           <span>Scalable architecture designed for high volume</span>
                         </li>
                       </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0 flex justify-end">
                <a 
                  href="#contact" 
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20"
                >
                  Request Similar Workflow <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;