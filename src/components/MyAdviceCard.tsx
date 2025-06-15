import React from 'react';

interface MyAdviceCardProps {
  advice: string;
}

const MyAdviceCard: React.FC<MyAdviceCardProps> = ({ advice }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 animate-fade-in flex flex-col h-full text-center items-center">
      <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center justify-center">
        <span role="img" aria-label="lightbulb" className="mr-2 text-3xl">💡</span> My Advice
      </h2>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{advice}</p>
      </div>
    </div>
  );
};

export default MyAdviceCard; 