// src/state/initialState.ts
import { AppState } from './types';

// The default state when the application first loads.
// These values are based on the "Recommended for Beginners" section of the guide.
export const initialState: AppState = {
  settings: {
    inputMode: 'image',
    textSubject: '',
    textCharacteristics: '',
    outputFormat: 'static',
    artisticStyle: 'Cartoon Vector',
    colorPalette: 'Vibrant',
    lineStyle: 'Smooth',
    shadingStyle: 'Cel-shading',
    composition: 'Half-Body',
    packSize: 4,
    resolution: 768,
    animationStyle: 'Subtle Movement',
    customAnimationPrompt: '',
  },
  selectedExpressions: [],
  isLoading: false,
  loadingMessage: '',
  error: null,
  credits: 100, // Starting credits for a new user
  results: [],
  sourceImage: null,
  isCalibrated: false,
};

