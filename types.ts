export interface Example {
  label: string;
  description?: string;
}




export interface OptionBase {
  id: string;
  label: string;
  value: string;
  category?: string;
  description: string;
  previewUrl?: string;
  examples?: Example[];
}

export type LightingOption = OptionBase;
export type CameraOption = OptionBase;
export type ColorOption = OptionBase;

export interface AppState {
  selectedLighting: string;
  selectedAngle: string;
  selectedPov: string;
  selectedColor: string;
  additionalDetails: string;
  generatedImage: string | null;
  generatedPrompt: string | null;
  koreanPrompt: string | null;
  isGenerating: boolean;
  error: string | null;
}
