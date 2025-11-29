import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bot, Zap, BarChart, Settings, Database } from 'lucide-react';
import { Service } from '../types';

const servicesData: Service[] = [
  {
    id: 'seo',
    title: 'SEO Optimization',
    description: 'Dominate search rankings and drive organic traffic with data-driven strategies.',
    icon: 'search',
    features: ['Technical SEO Audit', 'Keyword Strategy', 'On-Page Optimization', 'Content Roadmap']
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    description: 'Eliminate repetitive tasks. I build custom bots and integrations to run your business on autopilot.',
    icon: 'bot',
    features: ['Zapier/Make Integrations', 'Custom Python Bots', 'CRM Automation', 'Email Sequences']
  },
  {
    id: 'analytics',
    title: 'Data Analytics',
    description: 'Turn raw data into actionable insights. Visual dashboards that help you make better decisions.',
    icon: 'zap',
    features: ['Google Analytics 4', 'Looker Studio', 'Conversion Tracking', 'User Behavior Analysis']
  }
];

const getIcon = (name: string) => {
  switch (name) {
    case 'search': return <Search className="w-8 h-8 text-orange-400" />;
    case 'bot': return <Bot className="w-8 h-8 text-blue-400" />;
    case 'zap': return <BarChart className="w-8 h-8 text-cyan-400" />;
    default: return <Settings className="w-8 h-8" />;
  }
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Expertise That <span className="text-orange-500">Delivers</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            I don't just complete tasks; I engineer solutions that provide long-term value and efficiency for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-orange-500/50 transition-colors group"
            >
              <div className="mb-6 p-4 bg-slate-950 rounded-xl inline-block border border-slate-800 group-hover:border-orange-500/30 transition-colors">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-300 text-sm">
                    <Zap className="w-4 h-4 mr-2 text-orange-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;