import React from 'react';
import { EmotionData } from '../types';

interface EmotionChartProps {
  emotions: EmotionData[];
}

const EmotionChart: React.FC<EmotionChartProps> = ({ emotions }) => {
  const maxTime = Math.max(...emotions.map(e => e.timestamp));
  const speakers = [...new Set(emotions.map(e => e.speaker))];
  
  const emotionColors: { [key: string]: string } = {
    neutral: '#94A3B8',
    curious: '#3B82F6',
    defensive: '#EF4444',
    frustrated: '#F97316',
    apologetic: '#10B981',
    happy: '#F59E0B',
    sad: '#8B5CF6',
    angry: '#DC2626',
    excited: '#EC4899'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(emotionColors).map(([emotion, color]) => (
          <div key={emotion} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
            <span className="text-sm text-gray-600 capitalize">{emotion}</span>
          </div>
        ))}
      </div>

      <div className="relative h-64 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Time axis */}
        <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-500">
          <span>0s</span>
          <span>{Math.round(maxTime / 2)}s</span>
          <span>{maxTime}s</span>
        </div>

        {/* Intensity axis */}
        <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between items-end pr-2 text-xs text-gray-500">
          <span>1.0</span>
          <span>0.5</span>
          <span>0.0</span>
        </div>

        {/* Chart area */}
        <div className="absolute left-12 top-4 right-4 bottom-12">
          {speakers.map((speaker, speakerIndex) => {
            const speakerEmotions = emotions.filter(e => e.speaker === speaker);
            return (
              <div key={speaker} className="relative h-full">
                {speakerEmotions.map((emotion, index) => {
                  const x = (emotion.timestamp / maxTime) * 100;
                  const y = (1 - emotion.intensity) * 100;
                  const nextEmotion = speakerEmotions[index + 1];
                  
                  return (
                    <div key={index} className="absolute">
                      {/* Emotion point */}
                      <div
                        className="w-3 h-3 rounded-full border-2 border-white shadow-sm transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform cursor-pointer"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          backgroundColor: emotionColors[emotion.emotion] || '#94A3B8'
                        }}
                        title={`${speaker}: ${emotion.emotion} (${emotion.intensity}) at ${emotion.timestamp}s`}
                      ></div>
                      
                      {/* Connection line to next point */}
                      {nextEmotion && (
                        <div
                          className="absolute h-0.5 origin-left transform -translate-y-1/2"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: `${((nextEmotion.timestamp - emotion.timestamp) / maxTime) * 100}%`,
                            background: `linear-gradient(to right, ${emotionColors[emotion.emotion]}, ${emotionColors[nextEmotion.emotion]})`,
                            transform: `rotate(${Math.atan2(
                              ((1 - nextEmotion.intensity) - (1 - emotion.intensity)) * 100,
                              ((nextEmotion.timestamp - emotion.timestamp) / maxTime) * 100
                            )}rad) translateY(-50%)`
                          }}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Speaker legend */}
        <div className="absolute top-2 right-2 space-y-1">
          {speakers.map((speaker, index) => (
            <div key={speaker} className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
              {speaker}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        Hover over points to see detailed emotion data
      </div>
    </div>
  );
};

export default EmotionChart;