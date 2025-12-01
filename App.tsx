import React from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Services from './components/Services.tsx';
import Projects from './components/Projects.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import TechStack from './components/TechStack.tsx';
import ChatBot from './components/ChatBot.tsx';
import About from './components/About.tsx';
import WorkHistory from './components/WorkHistory.tsx';
import Testimonials from './components/Testimonials.tsx';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <TechStack />
        <WorkHistory />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;