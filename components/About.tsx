import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Code } from 'lucide-react';

const About: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Visual/Image Side */}
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 bg-slate-900 p-2 rounded-3xl border border-slate-800 shadow-2xl"
            >
              <div className="aspect-[4/3] bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center relative group">
                
                {/* Profile Image Logic */}
                {!imageError ? (
                  <img 
                    src="https://raw.githubusercontent.com/Naofumi-dev/website-portfolio/main/profile.jpg" 
                    alt="Armageddon Vivas" 
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    onError={() => setImageError(true)}
                  />
                ) : (
                   /* Fallback Abstract Design (Shown if image fails to load) */
                  <div id="profile-fallback" className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center z-10">
                    <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 border border-orange-500/30">
                      <Code className="w-10 h-10 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">Armageddon Vivas</h3>
                    <p className="text-orange-400 font-medium">SEO & Automation Specialist</p>
                  </div>
                )}
                
                {/* Floating Badges */}
                <div className="absolute top-6 right-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                  TechVA Community
                </div>
              </div>
            </motion.div>
            
            {/* Decorative Grid */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-orange-500/20 rounded-3xl z-0" />
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Bridging the Gap Between <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500">Traffic & Efficiency</span>
              </h2>
              
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed mb-8">
                <p>
                  With <strong className="text-white">3 years of experience</strong> as an SEO Specialist, I've mastered the art of driving organic growth. But I realized that traffic is only half the battle—capturing and nurturing that traffic efficiently is where the real magic happens.
                </p>
                <p>
                  Now, I combine my SEO roots with advanced <strong className="text-white">Workflow Automation</strong>. As an active member of the <strong className="text-white">TechVA community</strong> (the largest automation community in the Philippines), I build sophisticated systems using n8n, Zapier, Make.com, and GoHighLevel to help businesses scale without the chaos.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-orange-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Award className="w-5 h-5 text-orange-400" />
                    </div>
                    <span className="text-2xl font-bold text-white">3+</span>
                  </div>
                  <p className="text-sm text-slate-500">Years Experience</p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-white">TechVA</span>
                  </div>
                  <p className="text-sm text-slate-500">Community Member</p>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;