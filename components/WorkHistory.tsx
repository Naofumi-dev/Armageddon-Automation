import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ExternalLink, Award, CheckCircle2 } from 'lucide-react';

const history = [
  {
    id: 1,
    role: "Freelance SEO & Automation Specialist",
    company: "Self-Employed",
    period: "September 2025 – Present",
    description: "Actively involved in the TechVA community, transitioning from pure SEO to building robust automation systems.",
    achievements: [
      "Built basic automation workflows using Zapier for tasks such as lead nurturing and email follow-ups.",
      "Developed integrations using n8n to automate chatbots for Facebook page responsiveness.",
      "Automated content publishing workflows with Zapier to improve social media efficiency.",
      "Collaborated with the TechVA community to refine automation skills and best practices."
    ],
    skills: ["Zapier", "n8n", "Lead Nurturing", "Technical SEO"]
  },
  {
    id: 2,
    role: "SEO Specialist",
    company: "Haymitch Digital / Freelance",
    period: "January 2022 – Present",
    description: "Led comprehensive SEO strategies while assisting with CRM integrations to improve customer engagement.",
    achievements: [
      "Led SEO strategies for clients, improving organic traffic and search engine rankings.",
      "Conducted technical SEO audits and implemented on-page optimizations to boost visibility.",
      "Assisted clients in integrating email marketing with CRM systems to streamline communications."
    ],
    skills: ["SEO Strategy", "On-Page Optimization", "Keyword Research", "Reporting", "CRM Integration"]
  }
];

const WorkHistory: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2 hidden md:block" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Professional <span className="text-blue-500">Journey</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From dominating search results to engineering intelligent business systems.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col md:flex-row items-start gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-900 border-4 border-blue-500 rounded-full items-center justify-center z-10 mt-6">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>

              {/* Content Card */}
              <div className="w-full md:w-1/2">
                <div className={`bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors ${
                   index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                }`}>
                  <div className="flex items-center gap-2 text-blue-400 mb-2 text-sm font-bold uppercase tracking-wider">
                    <Briefcase className="w-4 h-4" />
                    {item.company}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                    <Calendar className="w-4 h-4" />
                    {item.period}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  {/* Achievements List */}
                  <div className="mb-6 space-y-2">
                    {item.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-slate-950 text-slate-300 text-xs rounded border border-slate-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Spacer for the other side */}
              <div className="w-full md:w-1/2 hidden md:block" />
            </motion.div>
          ))}
        </div>

        {/* Profile Links */}
        <div className="mt-20 flex flex-wrap justify-center gap-6">
          <a 
            href="https://www.upwork.com/freelancers/~0141404360618d4664" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#14a800] hover:bg-[#14a800]/90 text-white font-bold rounded-xl flex items-center gap-3 transition-transform hover:-translate-y-1 shadow-lg shadow-green-900/20"
          >
            <ExternalLink className="w-5 h-5" />
            View Upwork Profile
          </a>
          <a 
            href="https://www.onlinejobs.ph/jobseekers/info/2232859" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#007bff] hover:bg-[#007bff]/90 text-white font-bold rounded-xl flex items-center gap-3 transition-transform hover:-translate-y-1 shadow-lg shadow-blue-900/20"
          >
            <ExternalLink className="w-5 h-5" />
            View OnlineJobs.ph Profile
          </a>
        </div>

      </div>
    </section>
  );
};

export default WorkHistory;