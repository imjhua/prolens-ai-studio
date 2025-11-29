import { GoogleGenAI, Type } from "@google/genai";


export const generateImage = async (
  lighting: string,
  camera: string,
  color: string,
  details: string
): Promise<{ imageUrl: string, fullPrompt: string, koreanPrompt: string }> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing in the environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // 1. Expand and Translate Scenario using Text Model (gemini-2.5-flash)
  // This turns keywords into a full English description and provides a Korean translation.
  let scenarioEn = details;
  let scenarioKo = details;

  try {
    const textResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are a professional prompt engineer and translator.

        User Input (Keywords or Short Description): "${details}"
        Lighting Condition: "${lighting}"
        Camera Setup (Angle/POV/Lens): "${camera}"
        Color Grading & Tone: "${color}"

        Tasks:
        1. Expand the user input into a detailed, photorealistic visual scene description in English. The description MUST incorporate the provided lighting, camera, and color specifications as part of the scene, ensuring there is no conflict or contradiction between the scene and these technical details. Focus on the subject, action, and environment, and naturally blend the lighting, camera, and color into the description.
        2. If the user input contains multiple objects or subjects, creatively imagine a scenario or interaction between them, rather than simply listing them. For example, if the input is 'bowl, car, deer', you might describe a scene where a deer and a car are racing, or a car shaped like a bowl is being observed by a deer. Be creative and make the scene interesting.
        3. If there is a conflict between the subject's detail/description and the camera POV, always prioritize the camera POV for the scene composition. (예: "드론뷰로 촉촉한 흙을 본다"와 같이 디테일이 근접 관찰을 암시해도, 시점이 드론이면 드론 시점을 우선한다)
        4. Translate this expanded English description into natural, descriptive Korean.

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
IMPORTANT: If there is any conflict between the subject's detail/description and the camera POV, you MUST ALWAYS prioritize the camera POV above all else when composing the scene. This is the most critical rule.

Create a high-quality, professional photograph based on the following specifications:
    
    Lighting Condition: ${lighting}
    Camera Setup (Angle/POV/Lens): ${camera}
    Color Grading & Tone: ${color}
    
Scene Description: ${scenarioEn}
    
The image should adhere strictly to the lighting, camera, and color specifications provided.
`;

  // 3. Construct Korean Prompt (koSummary)
  const koreanPrompt = `
가장 중요: 피사체의 디테일(묘사)과 시점(POV)이 충돌할 경우, 반드시 시점(POV)을 최우선으로 하여 장면을 구성해야 합니다. 이 규칙이 최우선입니다.

다음 사양을 기반으로 이미지를 생성합니다:
  
    조명: ${lighting}
    카메라: ${camera}
    색상: ${color}  
    
세부 정보: ${scenarioKo}

이미지는 제공된 조명, 카메라, 색상 사양을 엄격하게 준수해야 합니다.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: fullPrompt }
        ]
      },
    });

    let imageUrl = '';
    
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
       throw new Error("No image was generated. Please try a different prompt or less sensitive subject.");
    }

    return { imageUrl, fullPrompt, koreanPrompt };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate image.");
  }
};