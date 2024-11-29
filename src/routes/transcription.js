import { Router } from 'express';
import { transcribeAudio } from '../services/transcription.js';

const router = Router();

router.post('/transcribe', async (req, res, next) => {
  try {
    const { audioUrl } = req.body;

    if (!audioUrl) {
      return res.status(400).json({ error: 'Audio URL is required' });
    }

    const transcription = await transcribeAudio(audioUrl);
    res.json({ text: transcription });
  } catch (error) {
    next(error);
  }
});

export const transcriptionRouter = router;
