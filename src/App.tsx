import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ConversationInput from './components/ConversationInput';
import { ConversationData, AnalysisResult } from './types';
import { geminiService } from './services/geminiService';
import { saveConversationToSupabase, loadConversationsFromSupabase } from './services/supabaseService';
import SummaryCard from './components/SummaryCard';
import EmotionBarsCard from './components/EmotionBarsCard';
import AIJudgeCard from './components/AIJudgeCard';
import IntentsSubtextCard from './components/IntentsSubtextCard';
import EmotionTimelineCard from './components/EmotionTimelineCard';
import WrapUpCard from './components/WrapUpCard';
import AIChatModal from './components/AIChatModal';
import AudioAnalysisCard from './components/AudioAnalysisCard';
import MyAdviceCard from './components/MyAdviceCard';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'analyze' | 'results'>('dashboard');
  const [conversations, setConversations] = useState<(ConversationData & { analysis: AnalysisResult })[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [activeAnalysisCard, setActiveAnalysisCard] = useState<'aiJudge' | 'intentsSubtext' | 'emotionTimeline' | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const loadedData = await loadConversationsFromSupabase();
      setConversations(loadedData); 
      if (loadedData.length > 0) {
        setCurrentAnalysis(loadedData[0].analysis);
      }
    };
    fetchConversations();
  }, []);

  const handleChangeView = async (view: 'dashboard' | 'analyze' | 'results', selectedConversation?: (ConversationData & { analysis: AnalysisResult })) => {
    setCurrentView(view);
    if (view === 'results' && selectedConversation) {
      setCurrentAnalysis(selectedConversation.analysis);
    } else if (view === 'analyze') {
      setCurrentAnalysis(null); // Clear analysis when going to analyze view
      setActiveAnalysisCard(null);
    } else if (view === 'dashboard') {
      setCurrentAnalysis(null); // Clear analysis when going to dashboard view
      setActiveAnalysisCard(null);
    }
  };

  const handleAnalyzeConversation = async (conversation: ConversationData) => {
    try {
      setCurrentView('results'); // Show loading or results view immediately
      setCurrentAnalysis(null); // Clear previous analysis immediately
      setActiveAnalysisCard(null); // Clear active card selection
      const analysis = await geminiService.analyzeConversation(conversation);
      setCurrentAnalysis(analysis);
      
      // Save to Supabase instead of local storage
      await saveConversationToSupabase(conversation, analysis);
      
      // Re-fetch all conversations to ensure the dashboard is up-to-date
      const updatedConversations = await loadConversationsFromSupabase();
      setConversations(updatedConversations);

      // Automatically show the first dynamic card or default if needed
      if (analysis.aiJudge) {
        setActiveAnalysisCard('aiJudge');
      } else if (analysis.intentsSubtext) {
        setActiveAnalysisCard('intentsSubtext');
      } else if (analysis.emotionTimeline) {
        setActiveAnalysisCard('emotionTimeline');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      // Handle error display to the user
      setCurrentAnalysis(null); // Clear previous analysis on error
      setCurrentView('analyze'); // Go back to analyze view
      alert('Analysis failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative">
      <Header 
        currentView={currentView} 
        onViewChange={handleChangeView}
        conversationCount={conversations.length}
      />
      
      <main className="container mx-auto px-4 py-6">
        {currentView === 'dashboard' && (
          <Dashboard 
            conversations={conversations}
            onViewChange={handleChangeView}
          />
        )}
        
        {currentView === 'analyze' && (
          <ConversationInput 
            onAnalyze={handleAnalyzeConversation}
            onBack={() => handleChangeView('dashboard')}
          />
        )}
        
        {currentView === 'results' && currentAnalysis && (
          <div className="flex flex-col gap-6">
            {/* Top Section: Summary, Emotion Bars, Chat */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentAnalysis.summary && (
                <SummaryCard summary={currentAnalysis.summary} />
              )}
              {currentAnalysis.emotionBars && (
                <EmotionBarsCard bars={currentAnalysis.emotionBars.bars} />
              )}
              {/* Chat as part of the top section */}
              <div className="w-full bg-white rounded-2xl shadow-xl flex flex-col p-4">
                <AIChatModal 
                  conversationText={conversations[conversations.length - 1]?.text || ''}
                />
              </div>
            </div>

            {/* Middle Section: AI Judge, Intents & Subtext, Emotion Timeline (Tabbed) */}
            <div className="bg-white rounded-2xl shadow-xl p-6 relative w-full">
              <div className="flex justify-around mb-6 space-x-4">
                <button 
                  onClick={() => setActiveAnalysisCard('aiJudge')}
                  className={`p-4 rounded-xl text-xl font-semibold transition-all duration-300 transform
                    ${activeAnalysisCard === 'aiJudge' ? 'bg-purple-600 text-white shadow-lg scale-105' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  <span role="img" aria-label="judge" className="text-2xl">⚖️</span> AI Judge
                </button>
                <button 
                  onClick={() => setActiveAnalysisCard('intentsSubtext')}
                  className={`p-4 rounded-xl text-xl font-semibold transition-all duration-300 transform
                    ${activeAnalysisCard === 'intentsSubtext' ? 'bg-purple-600 text-white shadow-lg scale-105' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  <span role="img" aria-label="intents" className="text-2xl">🤔</span> Intents & Subtext
                </button>
                <button 
                  onClick={() => setActiveAnalysisCard('emotionTimeline')}
                  className={`p-4 rounded-xl text-xl font-semibold transition-all duration-300 transform
                    ${activeAnalysisCard === 'emotionTimeline' ? 'bg-purple-600 text-white shadow-lg scale-105' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  <span role="img" aria-label="timeline" className="text-2xl">📈</span> Emotion Timeline
                </button>
              </div>

              {activeAnalysisCard === 'aiJudge' && currentAnalysis.aiJudge && (
                <AIJudgeCard analysis={currentAnalysis.aiJudge} />
              )}
              {activeAnalysisCard === 'intentsSubtext' && currentAnalysis.intentsSubtext && (
                <IntentsSubtextCard analysis={currentAnalysis.intentsSubtext} />
              )}
              {activeAnalysisCard === 'emotionTimeline' && currentAnalysis.emotionTimeline && (
                <EmotionTimelineCard analysis={currentAnalysis.emotionTimeline} />
              )}
            </div>

            {/* Bottom Section: Wrap-Up, My Advice, Audio Analysis */}
            <div className="flex flex-wrap justify-center gap-6 w-full">
              {currentAnalysis.wrapUp && (
                <WrapUpCard analysis={currentAnalysis.wrapUp} />
              )}
              {currentAnalysis.myAdvice && (
                <MyAdviceCard advice={currentAnalysis.myAdvice} />
              )}
              {currentAnalysis.audioAnalysis && (
                <AudioAnalysisCard 
                  transcribedText={currentAnalysis.audioAnalysis.transcribedText} 
                  toneAnalysis={currentAnalysis.audioAnalysis.toneAnalysis}
                  emotionAnalysis={currentAnalysis.audioAnalysis.emotionAnalysis}
                  briefSummary={currentAnalysis.audioAnalysis.briefSummary}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;