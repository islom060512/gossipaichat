import React from 'react';
import { EmotionTimelineResult } from '../types';

interface EmotionTimelineCardProps {
  analysis: EmotionTimelineResult;
}

const EmotionTimelineCard: React.FC<EmotionTimelineCardProps> = ({ analysis }) => {
  return (
    <div className="bg-white rounded-2xl p-6 animate-fade-in">
      <h4 className="text-xl font-bold text-gray-800 mb-4">Emotion Timeline</h4>
      <div className="space-y-6">
        {analysis.phases.map((phase, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 text-4xl mr-4">{phase.emoji}</div>
            <div>
              <h5 className="text-lg font-semibold text-gray-800 mb-1">{phase.phase}</h5>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="text-lg text-gray-700">{phase.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionTimelineCard; 