import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { analyzeProjectInquiry } from '../services/geminiService.ts';
import { ContactFormState, AIAnalysisResult } from '../types.ts';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    projectDetails: '',
    serviceType: 'SEO Optimization'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleAIAnalysis = async () => {
    if (formState.projectDetails.length < 10) return;
    
    setIsAnalyzing(true);
    setAiResult(null);
    try {
      const result = await analyzeProjectInquiry(formState.projectDetails, formState.serviceType);
      setAiResult(result);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("https://formspree.io/f/xvgjeplv", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("There was a problem sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was a problem sending your message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
       {/* Decorative Elements */}
       <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-900/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Let's Build Something <br/>
              <span className="text-blue-500">Extraordinary</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Ready to automate your workflow or skyrocket your search rankings? 
              Fill out the form, and let's discuss how I can help you achieve your goals.
            </p>
            
            <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-500/10 rounded-lg">
                  <Sparkles className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">AI-Powered Inquiry</h4>
                  <p className="text-slate-400 text-sm">
                    Not sure exactly what you need? Describe your problem in the "Project Details" field and click 
                    <span className="text-orange-400 font-medium mx-1">Refine with AI</span> 
                    to get a professional project scope instantly.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
                <span>armageddonvivas@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
                <span>Available Mon-Fri, 9am - 6pm EST</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400">Thanks {formState.name}, I'll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 px-6 py-2 text-sm text-orange-400 hover:text-orange-300"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Service Interest</label>
                    <select
                      name="serviceType"
                      value={formState.serviceType}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                    >
                      <option>SEO Optimization</option>
                      <option>Workflow Automation</option>
                      <option>Data Analytics</option>
                      <option>Full Consultation</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-slate-400">Project Details</label>
                      {formState.projectDetails.length > 10 && !aiResult && (
                        <button
                          type="button"
                          onClick={handleAIAnalysis}
                          disabled={isAnalyzing}
                          className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                        >
                          {isAnalyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                          {isAnalyzing ? "Analyzing..." : "Refine with AI"}
                        </button>
                      )}
                    </div>
                    <textarea
                      name="projectDetails"
                      value={formState.projectDetails}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                      placeholder="Tell me about your project goals, current challenges, and timeline..."
                    />
                  </div>

                  <AnimatePresence>
                    {aiResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-orange-950/30 border border-orange-500/30 rounded-xl p-4 space-y-3 overflow-hidden"
                      >
                        <div className="flex items-center gap-2 text-orange-400 text-sm font-bold">
                          <Sparkles className="w-4 h-4" /> AI Analysis
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-slate-400">Recommended Subject:</span> <span className="text-white block font-medium">{aiResult.refinedSubject}</span></p>
                          <p><span className="text-slate-400">Complexity Est:</span> <span className="text-white font-medium">{aiResult.estimatedComplexity}</span></p>
                          <div>
                            <span className="text-slate-400">Suggested Focus Areas:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {aiResult.suggestedServices.map((s, i) => (
                                <span key={i} className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-md border border-orange-500/20">{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFormState(prev => ({ ...prev, projectDetails: aiResult.enhancedMessage }));
                            setAiResult(null);
                          }}
                          className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          Use Enhanced Project Description
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;