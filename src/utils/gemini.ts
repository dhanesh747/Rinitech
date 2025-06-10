import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI | null = null;

export const initializeGemini = (apiKey: string) => {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    return true;
  } catch (error) {
    console.error('Failed to initialize Gemini:', error);
    return false;
  }
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!genAI) {
    throw new Error('Gemini AI not initialized. Please provide a valid API key.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `You are RoniTech AI Assistant, a helpful AI for RoniTech - a digital solutions provider based in Navi Mumbai, India. 

RoniTech specializes in:
- DTP Localization
- Graphic Designing  
- Website Development
- Translations & Transcription
- Video Editing
- Content Writing
- Digital Marketing

Company details:
- Email: techservices@ronitech.in
- Phone: +91 73047 03650
- Address: 14, Suraj Residency, Plot #15, Sector #10E, Kalamboli, Navi Mumbai-410 218
- 626+ projects completed, 68+ happy clients

Please respond helpfully about RoniTech services, digital solutions, or general business questions. Keep responses concise and professional.

User message: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
};

export const isGeminiInitialized = (): boolean => {
  return genAI !== null;
};