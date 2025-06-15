import React, { useState } from 'react';
import { Upload, MessageSquare, Mic, ArrowLeft, Send, AlertCircle } from 'lucide-react';
import { ConversationData } from '../types';
import { geminiService } from '../services/geminiService';
import { v4 as uuidv4 } from 'uuid';

interface ConversationInputProps {
  onAnalyze: (conversation: ConversationData) => void;
  onBack: () => void;
}

const ConversationInput: React.FC<ConversationInputProps> = ({ onAnalyze, onBack }) => {
  const [inputType, setInputType] = useState<'text' | 'image' | 'audio'>('text');
  const [conversationText, setConversationText] = useState('');
  const [context, setContext] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudioUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!conversationText.trim() && !imageUrl && !audioUrl) {
      setError('Please provide conversation content (text, image, or audio).');
      return;
    }

    if (!geminiService.isConfigured()) {
      setError('Gemini API is not configured. Please add your API key to continue.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      let textForAnalysis = conversationText.trim();

      if (audioUrl) {
        // Perform ASR and tone analysis on audio
        const audioAnalysis = await geminiService.analyzeAudio(audioUrl);
        textForAnalysis = audioAnalysis.transcribedText || ''; // Ensure it's always a string
        // Optionally, you could pass other audio analysis details to the main conversation for the prompt to use
        // For example, by appending to the context or enriching the prompt in geminiService.analyzeConversation
      }

      const conversation: ConversationData = {
        id: uuidv4(),
        text: textForAnalysis,
        context: context.trim() || undefined,
        imageUrl: imageUrl,
        audioUrl: audioUrl,
        createdAt: new Date().toISOString(), // Ensure createdAt is always set
      };
      
      onAnalyze(conversation); 
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(error instanceof Error ? error.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isApiConfigured = geminiService.isConfigured();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Analyze New Conversation
        </h2>
        <p className="text-gray-600">
          Upload or input your conversation data for AI-powered analysis using Gemini 1.5 Flash.
        </p>
      </div>

      {!isApiConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2V9a2 2 0 012-2h5z" />
            </svg>
            <div>
              <h3 className="font-medium text-amber-800 mb-1">API Configuration Required</h3>
              <p className="text-sm text-amber-700 mb-2">
                To use AI analysis, please add your Gemini API key to the environment variables.
              </p>
              <p className="text-xs text-amber-600">
                Add <code className="bg-amber-100 px-1 rounded">VITE_GEMINI_API_KEY</code> to your .env file
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800 mb-1">Analysis Error</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setInputType('text')}
            className={`p-4 rounded-xl border-2 transition-all ${
              inputType === 'text'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-sm font-medium">Text Input</div>
            <div className="text-xs text-gray-500">Paste conversation text</div>
          </button>

          <button
            onClick={() => setInputType('image')}
            className={`p-4 rounded-xl border-2 transition-all ${
              inputType === 'image'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-sm font-medium">Image Upload</div>
            <div className="text-xs text-gray-500">Upload screenshot or photo</div>
          </button>

          <button
            onClick={() => setInputType('audio')}
            className={`p-4 rounded-xl border-2 transition-all ${
              inputType === 'audio'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <Mic className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-sm font-medium">Audio Upload</div>
            <div className="text-xs text-gray-500">Upload voice messages</div>
          </button>
        </div>

        <div className="space-y-6">
          {inputType === 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conversation Text *
              </label>
              <textarea
                value={conversationText}
                onChange={(e) => setConversationText(e.target.value)}
                placeholder="Paste your conversation here..."
                rows={10}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
              ></textarea>
            </div>
          )}

          {inputType === 'image' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image of Conversation *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-gray-700 bg-gray-100 border border-gray-200 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              {imageUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img src={imageUrl} alt="Conversation Preview" className="max-w-full h-auto rounded-lg shadow-md" />
                </div>
              )}
            </div>
          )}

          {inputType === 'audio' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Audio File (MP3/WAV) *
              </label>
              <input
                type="file"
                accept="audio/mp3,audio/wav"
                onChange={handleAudioUpload}
                className="w-full text-gray-700 bg-gray-100 border border-gray-200 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              {audioUrl && (
                <div className="mt-4">
                  <audio controls src={audioUrl} className="w-full" />
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Context (Optional)
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Provide any additional context for the conversation (e.g., relationship status, recent events)..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
            ></textarea>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !isApiConfigured || ((!conversationText.trim() && !imageUrl && !audioUrl))}
            className="w-full bg-purple-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Analyze Conversation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationInput;