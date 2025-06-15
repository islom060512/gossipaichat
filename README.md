# GossipAI - Advanced Conversation Analysis App

A sophisticated conversation analysis application powered by Google's Gemini 2.0 Flash AI model.

## Features

- **AI-Powered Analysis**: Real conversation analysis using Gemini 2.0 Flash
- **AI Judge**: Objective scoring and feedback on conversation quality
- **Subtleties Detection**: Uncover hidden meanings and subtext
- **Emotion Timeline**: Track emotional changes throughout conversations
- **Mobile Responsive**: Optimized for all device sizes
- **Beautiful UI**: Modern glassmorphism design with smooth animations

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Gemini API**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Copy `.env.example` to `.env`
   - Add your API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Usage

1. **Input Conversation**: Paste or upload conversation text
2. **Add Participants**: Specify who was involved in the conversation
3. **AI Analysis**: Get comprehensive insights including:
   - Conversation summary and dynamics
   - AI Judge score (1-10) with detailed feedback
   - Subtle communication patterns and hidden meanings
   - Emotional timeline with intensity tracking

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **AI**: Google Gemini 2.0 Flash API
- **Icons**: Lucide React
- **Charts**: Custom emotion timeline visualization

## API Integration

The app uses Google's Gemini 2.0 Flash model for:
- Natural language understanding
- Sentiment analysis
- Communication pattern detection
- Emotional state recognition
- Conversation quality assessment

## Privacy & Security

- All conversations are processed client-side
- API calls are made directly to Google's servers
- No conversation data is stored on our servers
- Users control their own API keys and data