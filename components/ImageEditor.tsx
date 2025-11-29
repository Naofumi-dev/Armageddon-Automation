import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Image as ImageIcon, Loader2, ArrowRight, Download } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mimeType, setMimeType] = useState<string>('image/png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setMimeType(file.type);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setIsGenerating(true);
    try {
      const result = await editImageWithGemini(selectedImage, prompt, mimeType);
      setGeneratedImage(result);
    } catch (error) {
      console.error("Generation failed", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="ai-editor" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-bold uppercase tracking-wider mb-4">
              Beta Feature
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              AI Image <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">Editor</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Powered by <strong>Gemini 2.5 Flash Image</strong>. Upload an image and use natural language to edit it instantly.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Editor Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Upload Area */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer group
                ${selectedImage ? 'border-indigo-500/50 bg-slate-900/50' : 'border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/30'}
              `}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
              
              {selectedImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-950">
                   <img src={selectedImage} alt="Original" className="w-full h-full object-contain" />
                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-medium flex items-center gap-2">
                        <Upload className="w-5 h-5" /> Change Image
                      </span>
                   </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-500/20 transition-colors">
                    <ImageIcon className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <h3 className="text-white font-bold mb-2">Upload an Image</h3>
                  <p className="text-slate-400 text-sm">Drag and drop or click to browse</p>
                </div>
              )}
            </div>

            {/* Prompt Input */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-slate-400">How would you like to edit this image?</label>
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., 'Add a retro filter', 'Make it sunset', 'Remove the background object'..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors h-32 resize-none"
                />
                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-indigo-500" />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!selectedImage || !prompt || isGenerating}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Generate Edit
                </>
              )}
            </button>
          </motion.div>

          {/* Result Area */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-slate-900/50 rounded-3xl border border-slate-800 p-2 min-h-[400px] flex flex-col relative"
          >
             <div className="flex-1 rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center relative">
               {!selectedImage && !generatedImage && (
                 <div className="text-slate-600 text-center p-6">
                   <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-20" />
                   <p>Your AI-edited masterpiece will appear here</p>
                 </div>
               )}
               
               {/* Loading Overlay */}
               {isGenerating && (
                 <div className="absolute inset-0 bg-slate-950/80 z-20 flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                    <p className="text-indigo-400 font-medium animate-pulse">Processing with Gemini 2.5...</p>
                 </div>
               )}

               {generatedImage ? (
                  <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
               ) : (
                  selectedImage && !isGenerating && (
                    <div className="text-center opacity-50">
                      <ArrowRight className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                      <p className="text-slate-500">Preview</p>
                    </div>
                  )
               )}
             </div>

             {/* Action Bar */}
             {generatedImage && (
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                 <a 
                   href={generatedImage} 
                   download="gemini-edit.png"
                   className="px-6 py-2 bg-white text-slate-950 rounded-full font-bold text-sm hover:bg-indigo-50 flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                 >
                   <Download className="w-4 h-4" /> Download
                 </a>
               </div>
             )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImageEditor;
