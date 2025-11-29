import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, TrendingUp, CheckCircle } from 'lucide-react';

const results = [
  {
    id: 1,
    title: "Lead Enrichment System",
    tech: "Zapier + Apollo API",
    description: "Designed a workflow to automatically enrich raw lead data with company details from Apollo.io. This eliminates the need for manual research before sales outreach.",
    metric: "Automated Data Enrichment",
    icon: <Zap className="w-6 h-6 text-orange-400" />
  },
  {
    id: 2,
    title: "Missed Call Auto-Response",
    tech: "GoHighLevel (GHL)",
    description: "Built a safety net for service businesses that instantly text-backs missed calls. This ensures potential customers are engaged immediately even when staff are busy.",
    metric: "Instant SMS Auto-Response",
    icon: <CheckCircle className="w-6 h-6 text-blue-400" />
  },
  {
    id: 3,
    title: "Financial Data Sync",
    tech: "Make.com (Asana ↔ Xero)",
    description: "Created a bridge between project management and accounting. Completed tasks in Asana automatically generate invoices in Xero, removing double-entry errors.",
    metric: "Automated Invoice Creation",
    icon: <Clock className="w-6 h-6 text-purple-400" />
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-900 relative">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Project <span className="text-blue-500">Capabilities</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            These case studies demonstrate the operational efficiencies and automation architectures I have engineered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all group h-full"
            >
              <div className="mb-6 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 group-hover:border-blue-500/20 transition-colors">
                    {item.icon}
                  </div>
                  <div className="bg-slate-900 px-3 py-1 rounded-full border border-slate-800 text-xs font-mono text-slate-400">
                    {item.tech}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                  {item.description}
                </p>
                
                {/* Impact Badge */}
                <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3 mt-auto">
                  <TrendingUp className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-blue-300 font-semibold uppercase tracking-wider block mb-1">Key Function</span>
                    <span className="text-white font-bold text-sm">{item.metric}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;