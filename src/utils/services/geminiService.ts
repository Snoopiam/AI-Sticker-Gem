// src/utils/services/geminiService.ts
import { Settings } from '../../state/types';
import { EXPRESSIONS_MAP } from '../constants';

/**
 * Constructs the detailed prompt for the Gemini API call based on user settings.
 */
const buildPrompt = (settings: Settings, expressionName: string): string => {
  const expressionDescription = EXPRESSIONS_MAP.get(expressionName) || `A standard ${expressionName} expression.`;

  // This prompt structure is based on the guide's "BEHIND THE SCENES" section.
  const prompt = `
    You are a world-class digital illustrator specializing in clean, vibrant vector art for stickers.
    Your primary duty is to create a sticker based on the provided details.

    **Identity Anchor (from text description):**
    - Subject: "${settings.textSubject}"
    - Key Characteristics: "${settings.textCharacteristics}"

    **Sticker Task:**
    1. **Expression/Pose:** Create a sticker of the character with the following expression:
       "${expressionDescription}"

    2. **Artistic Style:**
       - Overall Style: ${settings.artisticStyle}
       - Color Palette: ${settings.colorPalette}
       - Line Style: ${settings.lineStyle}
       - Shading Style: ${settings.shadingStyle}

    3. **Composition:** ${settings.composition}

    4. **Output Format:** The final image MUST have a transparent background (alpha channel).
       It should be a professional, high-quality sticker.

    5. **Negative Prompts:** Avoid the following: blurry, low-quality, text, watermarks, distorted, ugly, tiling, poorly drawn, out of frame, disfigured.
  `;
  return prompt.trim();
};

/**
 * Calls the Gemini API to generate a single sticker.
 */
export const generateSticker = async (settings: Settings, expressionName: string): Promise<string> => {
  const userPrompt = buildPrompt(settings, expressionName);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  
  if (!apiKey) {
    throw new Error("API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
  }
  
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{
      parts: [{ text: userPrompt }]
    }],
    generationConfig: {
      responseMimeType: "image/png",
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    const base64Data = result?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Data) {
      throw new Error("No image data found in API response.");
    }

    return `data:image/png;base64,${base64Data}`;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to generate sticker. Please try again.");
  }
};

