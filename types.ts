
export type LightingCategory = 'Natural' | 'Artificial' | 'General';

export interface LightingOption {
  id: string;
  label: string;
  category: LightingCategory;
  description?: string;
  previewUrl?: string;
}

export interface CameraOption {
  id: string;
  label: string;
  description?: string;
  previewUrl?: string;
}

export interface PovOption {
  id: string;
  label: string;
  category?: string;
  description?: string;
  previewUrl?: string;
}

export interface ColorOption {
  id: string;
  label: string;
  category?: string;
  description?: string;
  previewUrl?: string;
}

export interface AppState {
  selectedLighting: string;
  selectedAngle: string;
  selectedPov: string;
  selectedColor: string;
  additionalDetails: string;
  generatedImage: string | null;
  generatedPrompt: string | null;
  isGenerating: boolean;
  error: string | null;
}