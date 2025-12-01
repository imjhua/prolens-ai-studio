import { GoogleGenAI, Type } from "@google/genai";

// Gemini 모델명 상수 분리
const GEMINI_TEXT_MODEL = 'gemini-2.5-flash';
const GEMINI_IMAGE_MODEL = 'gemini-2.5-flash-image';


export const generateImage = async (
  lighting: string,
  camera: string,
  color: string,
  details: string,
  scene: string,
  effect: string,
  aspectRatio?: string
): Promise<{ imageUrl: string | null, fullPrompt: string, koreanPrompt: string, error?: string }> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing in the environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // 1. Expand and Translate Scenario using Text Model (gemini-2.5-flash)
  // This turns keywords into a full English description and provides a Korean translation.
  // 장면(scene)과 세부정보(details)를 합쳐서 시나리오로 사용
  let scenarioInput = '';
  if (scene && details) {
    scenarioInput = `${scene}, ${details}`;
  } else if (scene) {
    scenarioInput = scene;
  } else if (details) {
    scenarioInput = details;
  } else {
    scenarioInput = 'A visually interesting, creative scene suitable for a professional photo or video.';
  }
  let scenarioEn = scenarioInput;
  let scenarioKo = scenarioInput;

  try {
    const textResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: `
        You are a professional prompt engineer and translator.

        User Input (Keywords or Short Description): "${scenarioInput}"
        Scene: "${scene}"
        Special Effect: "${effect}"
        Lighting Condition: "${lighting}"
        Camera Setup (Angle/Lens): "${camera}"
        Color Grading & Tone: "${color}"
        Aspect Ratio: "${aspectRatio}"

        Tasks:
        1. Expand the user input, scene, and special effect into a detailed, photorealistic visual scene description in English. The description MUST incorporate the provided lighting, camera, color, special effect, and aspect ratio specifications as part of the scene, ensuring there is no conflict or contradiction between the scene and these technical details. Focus on the subject, action, environment, and effect, and naturally blend the lighting, camera, color, effect, and aspect ratio into the description.
        2. IMPORTANT: If the lighting condition is natural (e.g., sunlight, daylight, window light, etc.), DO NOT include any artificial lighting (e.g., LED, studio light, flash, lamp, etc.) in the scene. If the lighting condition is artificial, DO NOT include any natural light sources or effects in the scene. Never mix natural and artificial lighting in the scenario. Only use the specified lighting type.
        3. If the user input contains multiple objects or subjects, creatively imagine a scenario or interaction between them, rather than simply listing them. For example, if the input is 'bowl, car, deer', you might describe a scene where a deer and a car are racing, or a car shaped like a bowl is being observed by a deer. Be creative and make the scene interesting.
        4. If the subject's description conflicts with the camera angle, the camera angle must always take precedence in the scene composition. (e.g., Even if the detail is "wet soil," which implies a close-up, if the angle is a drone shot, the drone's perspective should be prioritized.)
        5. The aspect ratio must be reflected in the scene composition and description. (e.g., If the aspect ratio is 9:16, describe a vertical composition; if 16:9, describe a wide landscape composition, etc.)
        6. If the user input is empty or not provided, you must imagine and create a visually interesting, creative scenario that would be suitable for a professional photo or video, using the other provided options as context.
        7. Translate this expanded English description into natural, descriptive Korean.

        Output strictly in JSON format:
        {
          "english_description": "string",
          "korean_description": "string"
        }
      `,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            english_description: { type: Type.STRING },
            korean_description: { type: Type.STRING }
          }
        }
      }
    });

    const json = JSON.parse(textResponse.text || "{}");
    if (json.english_description) scenarioEn = json.english_description;
    if (json.korean_description) scenarioKo = json.korean_description;

  } catch (error) {
    console.warn("Scenario expansion failed, falling back to raw input.", error);
    // Fallback: use original details
  }

  // 2. Construct Full Prompt with the expanded scenario
  const fullPrompt = `
IMPORTANT: If there is any conflict between the subject's detail/description and the camera angle, you MUST ALWAYS prioritize the camera angle above all else when composing the scene. This is the most critical rule.

Create a high-quality, professional photograph based on the following specifications:

  Scene: ${scene}
  Lighting Condition: ${lighting}
  Camera Setup (Angle/Lens): ${camera}
  Color Grading & Tone: ${color}
  Special Effect: ${effect}
  Aspect Ratio: ${aspectRatio}

Scene Description: ${scenarioEn}

The image should adhere strictly to the scene, effect, lighting, camera, color, and aspect ratio specifications provided.
  `;

  // 3. Construct Korean Prompt (koSummary)
  const koreanPrompt = `
가장 중요: 피사체의 디테일(묘사)과 카메라 앵글이 충돌할 경우, 반드시 카메라 앵글을 최우선으로 하여 장면을 구성해야 합니다. 이 규칙이 최우선입니다.

다음 사양을 기반으로 이미지를 생성합니다:

  장면: ${scene}
  조명: ${lighting}
  카메라: ${camera}
  색상: ${color}  
  특수효과: ${effect}
  비율: ${aspectRatio}

세부 정보: ${scenarioKo}

이미지는 제공된 장면, 특수효과, 조명, 카메라, 색상, 비율 사양을 엄격하게 준수해야 합니다.
    `;

  let imageUrl: string | null = null;
  let generationError: string | undefined;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_IMAGE_MODEL,
      contents: {
        parts: [
          { text: fullPrompt }
        ]
      },
    });


    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mimeType};base64,${base64EncodeString}`;
          break; // Found the image, exit loop
        }
      }
    }

    if (!imageUrl) {
      generationError = "No image was generated. Please try a different prompt or less sensitive subject.";
    }

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    generationError = error.message || "Failed to generate image.";
  }

  return { imageUrl, fullPrompt, koreanPrompt, error: generationError };
};
