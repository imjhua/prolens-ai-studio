import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

export const generateImage = async (
  lighting: string,
  angle: string,
  pov: string,
  color: string,
  details: string
): Promise<{ imageUrl: string, fullPrompt: string }> => {
  if (!apiKey) {
    throw new Error("API Key is missing in the environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Construct a detailed prompt for the image generation model
  const prompt = `
    Create a high-quality, professional photograph based on the following specifications:
    
    Lighting Condition: ${lighting}
    Camera Angle: ${angle}
    Point of View (POV): ${pov}
    Color Grading & Tone: ${color}
    
    Subject & Scene Details: ${details}
    
    The image should be photorealistic and adhere strictly to the lighting, camera, and color specifications provided.
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      // Using standard config for high quality output if possible, 
      // but 'gemini-2.5-flash-image' uses simpler config structure usually.
      // We rely on the prompt for quality.
    });

    let imageUrl = '';
    
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          // Assuming PNG as it is common, but checking mimeType is safer if provided
          const mimeType = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mimeType};base64,${base64EncodeString}`;
          break; // Found the image, exit loop
        }
      }
    }

    if (!imageUrl) {
       // Fallback or error if no image part found (e.g. strict safety filter)
       throw new Error("No image was generated. Please try a different prompt or less sensitive subject.");
    }

    return { imageUrl, fullPrompt: prompt };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate image.");
  }
};