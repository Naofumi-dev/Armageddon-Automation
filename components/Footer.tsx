import React from 'react';
import { Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-white">Armageddon Vivas</h3>
            <p className="text-slate-500 text-sm mt-2">SEO & Automation Specialist</p>
            <p className="text-slate-600 text-xs mt-1">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://www.linkedin.com/in/armageddon-vivas/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Linkedin className="w-5 h-5" />
              <span className="hidden md:inline text-sm">LinkedIn</span>
            </a>
            <a 
              href="mailto:armageddonvivas@gmail.com" 
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              <span className="hidden md:inline text-sm">Email</span>
            </a>
            <a 
              href="tel:+639683142236" 
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span className="hidden md:inline text-sm">+63 968 314 2236</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;