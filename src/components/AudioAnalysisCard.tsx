import React from 'react';

interface AudioAnalysisCardProps {
  transcribedText: string;
  toneAnalysis: string;
  emotionAnalysis: string;
  briefSummary: string;
}

const AudioAnalysisCard: React.FC<AudioAnalysisCardProps> = ({
  transcribedText,
  toneAnalysis,
  emotionAnalysis,
  briefSummary,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 col-span-full animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">🎙️ Audio Analysis 🎙️</h3>
      
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-purple-700 mb-2">Transcribed Text:</h4>
        <p className="text-lg text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200 overflow-auto max-h-40">{transcribedText}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-xl font-semibold text-purple-700 mb-2">Tone Analysis:</h4>
          <p className="text-lg text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">{toneAnalysis}</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold text-purple-700 mb-2">Emotion Analysis:</h4>
          <p className="text-lg text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">{emotionAnalysis}</p>
        </div>
      </div>

      <div>
        <h4 className="text-xl font-semibold text-purple-700 mb-2">Brief Summary:</h4>
        <p className="text-lg text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">{briefSummary}</p>
      </div>
    </div>
  );
};

export default AudioAnalysisCard; 