export const saveConversation = (conversation: any) => {
  localStorage.setItem('conversation', JSON.stringify(conversation));
};

export const loadConversation = () => {
  const storedConversations = localStorage.getItem('conversation');
  if (storedConversations) {
    try {
      const parsedConversations = JSON.parse(storedConversations);
      // Ensure each conversation object has a 'text' property that is a string
      return parsedConversations.map((conv: any) => ({
        ...conv,
        text: String(conv.text || '')
      }));
    } catch (error) {
      console.error('Error parsing stored conversations:', error);
      return null;
    }
  }
  return null;
};

export const saveAnalysis = (analysis: any) => {
  localStorage.setItem('analysis', JSON.stringify(analysis));
};

export const loadAnalysis = () => {
  const analysis = localStorage.getItem('analysis');
  return analysis ? JSON.parse(analysis) : null;
}; 