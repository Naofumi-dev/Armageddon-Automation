import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'search' | 'bot' | 'code' | 'zap';
  features: string[];
}

export interface ContactFormState {
  name: string;
  email: string;
  projectDetails: string;
  serviceType: string;
}

export interface AIAnalysisResult {
  refinedSubject: string;
  enhancedMessage: string;
  suggestedServices: string[];
  estimatedComplexity: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  icon: React.ReactNode;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}