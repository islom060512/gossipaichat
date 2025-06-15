export interface ConversationData {
  id: string;
  text: string;
  context?: string; // Optional context for the conversation
  imageUrl?: string; // Base64 encoded image or URL
  audioUrl?: string; // Base64 encoded audio or URL
  createdAt?: string; // Made optional
}

export interface SummaryResult {
  mainEmotionEmoji: string;
  summaryText: string;
  relationshipTone: string; // e.g., 'officially-business', 'romantic', 'one-sided sympathy'
}

export interface EmotionBar {
  emotion: string;
  emoji: string;
  opponentPercentage: number;
  authorPercentage: number;
}

export interface EmotionBarsResult {
  bars: EmotionBar[];
}

export interface AIJudgeResult {
  analysisText: string;
}

export interface QuoteTranslation {
  quote: string;
  translation: string;
}

export interface IntentsSubtextResult {
  flirt?: QuoteTranslation[];
  jealousy?: QuoteTranslation[];
  passiveAggression?: QuoteTranslation[];
  flattery?: QuoteTranslation[];
  interest?: QuoteTranslation[];
  boredom?: QuoteTranslation[];
  sarcasm?: QuoteTranslation[];
  generalSubtext?: QuoteTranslation[];
  keyConversationInsight?: QuoteTranslation;
}

export interface EmotionTimelinePhase {
  phase: string; // e.g., 'Beginning', 'Middle', 'End'
  description: string;
  emoji: string;
}

export interface EmotionTimelineResult {
  phases: EmotionTimelinePhase[];
}

export interface WrapUpResult {
  psychologistSummary: string;
  advice: string;
}

export interface AnalysisResult {
  summary?: SummaryResult;
  emotionBars?: EmotionBarsResult;
  aiJudge?: AIJudgeResult;
  intentsSubtext?: IntentsSubtextResult;
  emotionTimeline?: EmotionTimelineResult;
  wrapUp?: WrapUpResult;
  myAdvice?: string;
  judgeScore?: number;
  subtleties?: string[];
  emotions?: EmotionData[];
  audioAnalysis?: {
    transcribedText: string;
    toneAnalysis: string;
    emotionAnalysis: string;
    briefSummary: string;
  };
}

export interface EmotionData {
  timestamp: number;
  speaker: string;
  emotion: string;
  intensity: number;
}

export interface ViewType {
  dashboard: 'dashboard';
  analyze: 'analyze';
  results: 'results';
}