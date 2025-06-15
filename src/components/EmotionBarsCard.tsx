import React from 'react';
import { EmotionBar } from '../types';

interface EmotionBarsCardProps {
  bars: EmotionBar[];
}

const EmotionBarsCard: React.FC<EmotionBarsCardProps> = ({ bars }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Emotion Bars</h3>
      {
        bars.map((bar, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">{bar.emoji}</span>
              <p className="text-base font-semibold text-gray-700">{bar.emotion}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 flex overflow-hidden">
              <div 
                className="bg-blue-400 h-full flex items-center justify-end text-white text-sm sm:text-base pr-2"
                style={{ width: `${bar.opponentPercentage}%` }}
              >
                {bar.opponentPercentage > 0 && `${bar.opponentPercentage}%`}
              </div>
              <div 
                className="bg-pink-400 h-full flex items-center text-white text-sm sm:text-base pl-2"
                style={{ width: `${bar.authorPercentage}%` }}
              >
                {bar.authorPercentage > 0 && `${bar.authorPercentage}%`}
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Opponent</span>
              <span>Author</span>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default EmotionBarsCard; 