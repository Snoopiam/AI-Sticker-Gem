// src/state/types.ts
// Defines all data structures and types for the application state.

// As defined in the guide, these are all possible user-configurable settings.
export type InputMode = 'image' | 'text';
export type OutputFormat = 'static' | 'animated';
export type ArtisticStyle = 
  | 'Cartoon Vector' | 'Sticker Style' | 'Kawaii' | 'Chibi' | '3D Render' 
  | 'Lineart' | 'Flat' | 'WPAP' | 'Pop' | 'Tritone' | 'Dotwork' 
  | 'Watercolor' | 'Oil Painting' | 'Pencil Sketch' | 'Photorealistic';
export type ColorPalette = 'Vibrant' | 'Pastel' | 'Monochrome';
export type LineStyle = 'Bold' | 'Thin' | 'Hand-drawn' | 'Smooth' | 'None';
export type ShadingStyle = 'Flat' | 'Cel-shading' | 'Gradient' | 'None';
export type Composition = 'Headshot / Bust' | 'Half-Body' | 'Full-Body';
export type AnimationStyle = 
  | 'Subtle Movement' | 'Bouncing' | 'Wiggle' | 'Spinning' | 'Shimmering' 
  | 'Floating' | 'Pulsing' | 'Glitching' | 'Zoom In-Out' | 'Custom';

// Represents a single generated sticker or animation
export interface GeneratedResult {
  id: string;
  dataUrl: string; // base64 encoded image or video
  settings: Settings;
  timestamp: number;
  format?: 'static' | 'animated';
}

// All settings required to generate a sticker
export interface Settings {
  inputMode: InputMode;
  // Text-to-Image specific settings
  textSubject: string;
  textCharacteristics: string;
  
  outputFormat: OutputFormat;
  artisticStyle: ArtisticStyle;
  colorPalette: ColorPalette;
  lineStyle: LineStyle;
  shadingStyle: ShadingStyle;
  composition: Composition;
  packSize: number; // 1, 2, 4, 8, 12, 16, 20
  resolution: 512 | 768 | 1024;
  animationStyle: AnimationStyle;
  customAnimationPrompt: string;
}

// The complete state of the application
export interface AppState {
  settings: Settings;
  selectedExpressions: string[];
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
  credits: number;
  results: GeneratedResult[];
  sourceImage: string | null;
  isCalibrated: boolean;
}

// Defines the shape of actions for the reducer
export type Action = 
  | { type: 'SET_SETTING'; payload: { key: keyof Settings; value: any } }
  | { type: 'TOGGLE_EXPRESSION'; payload: { expressionName: string } }
  | { type: 'START_GENERATION'; payload: { message: string } }
  | { type: 'GENERATION_SUCCESS'; payload: { results: GeneratedResult[] } }
  | { type: 'GENERATION_ERROR'; payload: { error: string } }
  | { type: 'CHANGE_CREDITS'; payload: { amount: number } }
  | { type: 'SET_SOURCE_IMAGE'; payload: { dataUrl: string } }
  | { type: 'REMOVE_SOURCE_IMAGE' }
  | { type: 'START_CALIBRATION' }
  | { type: 'CALIBRATION_SUCCESS' };

