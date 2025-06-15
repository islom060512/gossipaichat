import React from 'react';
import { IntentsSubtextResult, QuoteTranslation } from '../types';

interface IntentsSubtextCardProps {
  analysis: IntentsSubtextResult;
}

const IntentsSubtextCard: React.FC<IntentsSubtextCardProps> = ({ analysis }) => {
  const renderSection = (title: string, items: QuoteTranslation[] | undefined) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mb-6 last:mb-0 bg-gray-100 p-4 rounded-lg shadow-sm">
        <h5 className="text-lg font-semibold text-gray-800 mb-2">{title}</h5>
        <ul className="list-disc list-inside space-y-2">
          {items.map((item, index) => (
            <li key={index} className="text-lg text-gray-700">
              <span className="font-medium italic">"{item.quote}"</span> — {item.translation}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 animate-fade-in">
      <h4 className="text-xl font-bold text-gray-800 mb-4">Intents & Subtext Analysis</h4>
      {analysis.keyConversationInsight && (
        <div className="bg-purple-50 p-6 rounded-xl shadow-md mb-6 border border-purple-200">
          <h5 className="text-lg font-semibold text-purple-800 mb-3">Key Conversation Insight:</h5>
          <p className="text-lg text-gray-700 leading-relaxed italic mb-2">
            "{analysis.keyConversationInsight.quote}"
          </p>
          <p className="text-base text-gray-800">
            **Interpretation:** {analysis.keyConversationInsight.translation}
          </p>
        </div>
      )}
      {
        analysis.flirt && renderSection('Flirtatious:', analysis.flirt)
      }
      {
        analysis.jealousy && renderSection('Jealousy:', analysis.jealousy)
      }
      {
        analysis.passiveAggression && renderSection('Passive Aggression:', analysis.passiveAggression)
      }
      {
        analysis.flattery && renderSection('Flattery:', analysis.flattery)
      }
      {
        analysis.interest && renderSection('Interest:', analysis.interest)
      }
      {
        analysis.boredom && renderSection('Boredom:', analysis.boredom)
      }
      {
        analysis.sarcasm && renderSection('Sarcasm:', analysis.sarcasm)
      }
      {
        analysis.generalSubtext && renderSection('General Subtext:', analysis.generalSubtext)
      }
      {(!analysis.flirt && !analysis.jealousy && !analysis.passiveAggression && !analysis.flattery && !analysis.interest && !analysis.boredom && !analysis.sarcasm && !analysis.generalSubtext) && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg text-gray-600">No specific intents or subtext detected for this conversation.</p>
        </div>
      )}
    </div>
  );
};

export default IntentsSubtextCard; 