import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConversationData, AnalysisResult, EmotionData } from '../types';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    this.initializeAPI();
  }

  private initializeAPI() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your environment variables.');
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    } catch (error) {
      console.error('Failed to initialize Gemini API:', error);
    }
  }

  async analyzeConversation(conversation: ConversationData): Promise<AnalysisResult> {
    if (!this.model) {
      throw new Error('Gemini API not initialized. Please check your API key.');
    }

    const parts: any[] = [
      { text: `Analyze the following conversation based on the user's input:
Conversation Content: ${conversation.text}` }
    ];

    if (conversation.context) {
      parts.push({ text: `\nConversation Context: ${conversation.context}` });
    }

    if (conversation.imageUrl) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: conversation.imageUrl.split(',')[1] // Assuming base64 data
        }
      });
    }

    // For audio, we'll need a separate ASR step before analysis, or use a multimodal model capable of audio.
    // For now, we will focus on text and image, and add audio processing later.

    const prompt = `
      You are GossipAI, an unparalleled expert conversation analyst and a perceptive AI psychologist, powered by Gemini 1.5 Flash. Your mission is to dissect the provided conversation (which might be text, an image of chat, or transcribed audio) and produce a singularly creative, novel, and technically innovative analysis. Your output MUST be a complete, valid JSON object, structured precisely according to the TypeScript interfaces provided below. ABSOLUTELY NO other text, markdown, or commentary outside this JSON object is permitted.

      Perform the following highly detailed analyses:
      1.  **Summary Card (SummaryResult):**
          *   Provide a concise, highly readable summary (max 3-4 sentences).
          *   Identify the *dominant* emotion of the **opponent** (not the user/author) from the entire conversation. Express this as a single, large, vibrant, 'minion-style' emoji (e.g., '😅', '🥳', '🤯', '😭', '😡'). Choose an emoji that truly encapsulates their overarching emotional state.
          *   Categorize the **relationship tone** between the participants. Choose one from: 'Officially-Business', 'Friendly & Casual', 'Romantic Interest', 'One-Sided Sympathy', 'Conflict-Ridden', 'Neutral & Transactional'.

      2.  **Emotion Bars Card (EmotionBarsResult):**
          *   Identify 3 to 5 *distinct and highly relevant* emotions that significantly colored the conversation. Think beyond basic emotions; consider nuanced states like: 'Trust', 'Relaxation', 'Distrust', 'Engagement', 'Frustration', 'Empathy', 'Sarcasm Detection'.
          *   For each emotion, provide a visually striking emoji.
          *   Quantify the **percentage** for both the 'Opponent' and the 'Author' (user who provided the input). Ensure these percentages reflect their *contribution* or *display* of that emotion within the conversation, summing up to 100% *across both participants for that specific emotion*. (e.g., if total 'Trust' expressed is 100 units, and opponent expressed 80 units, then opponent is 80%, author 20%).

      3.  **AI Judge Card (AIJudgeResult):**
          *   Act as an impartial AI judge. Analyze the **key messages, turning points, or critical statements** from *each* participant.
          *   Provide a coherent, semi-formal **narrative-style analysis** (not just bullet points) of their communication effectiveness, areas of strength, and areas for improvement. Integrate insightful emojis to highlight points.

      4.  **Intents & Subtext Card (IntentsSubtextResult):**
          *   Uncover the **hidden intentions, unspoken desires, and subtle underlying meanings (subtext)**. Look for: 'Flirting', 'Jealousy', 'Passive Aggression', 'Flattery', 'Genuine Interest', 'Boredom', 'Sarcasm', or 'General Unstated Subtext'.
          *   For each identified intent/subtext, **quote the exact suspicious fragment** from the conversation.
          *   Provide a concise, direct **'translation' or interpretation** of what that fragment *truly* means or implies.

      5.  **Emotion Timeline Card (EmotionTimelineResult):**
          *   Divide the conversation into three distinct phases: 'Beginning', 'Middle', and 'End'.
          *   For each phase, provide a vivid description of the **changing atmosphere, dominant emotions, and key shifts**. Use a distinct, expressive emoji for each phase to visually represent its essence.

      6.  **Wrap-Up Card (WrapUpResult):**
          *   Deliver a concise (max 3 sentences), empathetic summary from the perspective of a seasoned 'AI psychologist'. This summary should feel light, friendly, and truly insightful.
          *   Provide one clear, actionable, and uniquely tailored piece of advice derived directly from the conversation's dynamics. Avoid generic self-help clichés.

      7.  **My Advice (string):**
          *   Provide a direct, practical, and concise piece of advice to the user based on the entire conversation, from the perspective of a supportive AI.

      Your response should strictly adhere to the "AnalysisResult" TypeScript interface defined externally. You must provide the full JSON object for "AnalysisResult".

      Provide the full AnalysisResult JSON object. Example structure (ENSURE YOUR OUTPUT ADHERES TO THIS JSON STRUCTURE): 
      {
        "summary": {
          "mainEmotionEmoji": "😊",
          "summaryText": "The conversation started cautiously but evolved into a positive and supportive exchange.",
          "relationshipTone": "Romantic Interest"
        },
        "emotionBars": {
          "bars": [
            { "emotion": "Trust", "emoji": "🤝", "opponentPercentage": 80, "authorPercentage": 20 },
            { "emotion": "Engagement", "emoji": "💡", "opponentPercentage": 70, "authorPercentage": 30 },
            { "emotion": "Conflict Avoidance", "emoji": "🕊️", "opponentPercentage": 40, "authorPercentage": 60 }
          ]
        },
        "aiJudge": {
          "analysisText": "The opponent skillfully navigated a sensitive topic, demonstrating a high degree of emotional intelligence. 👍 The author, while initially hesitant, showed impressive adaptability, turning potential tension into rapport. ✨"
        },
        "intentsSubtext": {
          "flirt": [{
            "quote": "Your eyes sparkle when you talk about it.",
            "translation": "Expressing romantic interest with a compliment."
          }],
          "passiveAggression": [],
          "sarcasm": [{
            "quote": "Oh, *that's* incredibly helpful.",
            "translation": "Actually implying the opposite, expressing annoyance."
          }],
          "generalSubtext": [{
            "quote": "I'm fine.",
            "translation": "The tone suggests unspoken frustration or a desire to end the topic."
          }]
        },
        "emotionTimeline": {
          "phases": [
            { "phase": "Beginning (Tension & Caution)", "description": "Initial exchanges were formal, almost guarded, with a palpable undercurrent of uncertainty. 😬", "emoji": "😬" },
            { "phase": "Middle (Exploration & Connection)", "description": "A breakthrough moment where shared humor eased the tension, allowing for deeper personal revelations. 😂", "emoji": "😄" },
            { "phase": "End (Affirmation & Future)", "description": "The conversation concluded on a note of mutual understanding and reinforced connection, hinting at future positive interactions. ✨", "emoji": "🥰" }
          ]
        },
        "wrapUp": {
          "psychologistSummary": "Your conversation brilliantly illustrates how empathy and strategic communication can transform initial awkwardness into genuine connection. A true masterclass in conversational judo!",
          "advice": "Next time, try introducing a lighthearted topic even earlier to set a positive tone from the outset."
        },
        "myAdvice": "Consider practicing active listening techniques to ensure both parties feel heard."
      }
      `;

    try {
      const result = await this.model.generateContent({ contents: [{ role: 'user', parts: [...parts, { text: prompt }] }] });
      const response = await result.response;
      let analysisText = response.text();
      
      // Robustly extract JSON by stripping markdown code block fences
      const jsonMatch = analysisText.match(/```(?:json)?\n?([\s\S]*?)```/);
      if (jsonMatch && jsonMatch[1]) {
        analysisText = jsonMatch[1].trim();
      } else {
        analysisText = analysisText.trim();
      }

      return JSON.parse(analysisText);
    } catch (error) {
      console.error('Error analyzing conversation:', error);
      throw new Error('Failed to analyze conversation. Please try again.');
    }
  }

  isConfigured(): boolean {
    return this.model !== null;
  }

  async analyzeAudio(audioUrl: string): Promise<{ transcribedText: string; toneAnalysis: string; emotionAnalysis: string; briefSummary: string }> {
    if (!this.model) {
      throw new Error('Gemini API not initialized. Please check your API key.');
    }

    const parts: any[] = [
      {
        inlineData: {
          mimeType: 'audio/mp3', // Assuming MP3, adjust if WAV is also handled
          data: audioUrl.split(',')[1] // Assuming base64 data
        }
      },
      { text: `
        Analyze the provided audio for the following:
        1. Transcribe the audio into text (ASR).
        2. Analyze the overall tone of the speech.
        3. Identify key emotions present in the audio.
        4. Provide a brief summary of the audio content.
        
        Format your response as a JSON object with the following keys: "transcribedText", "toneAnalysis", "emotionAnalysis", "briefSummary".
        Example:
        {
          "transcribedText": "Hello, how are you today?",
          "toneAnalysis": "Friendly and positive",
          "emotionAnalysis": "Joy, calmness",
          "briefSummary": "A short greeting expressing well-being."
        }
        Ensure the response is ONLY the JSON object.
      `}
    ];

    try {
      const result = await this.model.generateContent({ contents: [{ role: 'user', parts: parts }] });
      const response = await result.response;
      let audioAnalysisText = response.text();
      
      // Robustly extract JSON by stripping markdown code block fences
      const jsonMatch = audioAnalysisText.match(/```(?:json)?\n?([\s\S]*?)```/);
      if (jsonMatch && jsonMatch[1]) {
        audioAnalysisText = jsonMatch[1].trim();
      } else {
        audioAnalysisText = audioAnalysisText.trim();
      }

      return JSON.parse(audioAnalysisText);
    } catch (error) {
      console.error('Error analyzing audio:', error);
      throw new Error('Failed to analyze audio. Please try again.');
    }
  }

  async chatWithConversation(prompt: string): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini API not initialized. Please check your API key.');
    }
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let chatResponseText = response.text();

      // Attempt to strip markdown code block or general whitespace if present
      const markdownMatch = chatResponseText.match(/```(?:\w+)?\n?([\s\S]*?)```/);
      if (markdownMatch && markdownMatch[1]) {
        chatResponseText = markdownMatch[1].trim();
      } else {
        chatResponseText = chatResponseText.trim();
      }

      return chatResponseText;
    } catch (error) {
      console.error('Error during chat interaction:', error);
      throw new Error('Failed to get a response from AI. Please try again.');
    }
  }
}

export const geminiService = new GeminiService();