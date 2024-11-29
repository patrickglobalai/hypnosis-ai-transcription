import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const transcribeAudio = async (audioUrl) => {
  try {
    // Download the audio file from URL
    const response = await fetch(audioUrl);
    const audioBlob = await response.blob();
    
    // Convert blob to file
    const file = new File([audioBlob], 'audio.mp3', { type: 'audio/mp3' });

    // Transcribe using Whisper API
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: 'en'
    });

    return transcription.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
};
