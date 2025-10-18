// src/state/reducers/generationReducer.ts
import { AppState, Action } from '../types';

// The reducer is a pure function that calculates the next state based on the previous state and an action.
export const generationReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_SETTING':
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.key]: action.payload.value,
        },
      };

    case 'START_GENERATION':
      return {
        ...state,
        isLoading: true,
        loadingMessage: action.payload.message,
        error: null,
        results: [], // Clear previous results
      };

    case 'GENERATION_SUCCESS':
      return {
        ...state,
        isLoading: false,
        loadingMessage: '',
        results: action.payload.results,
      };

    case 'GENERATION_ERROR':
      return {
        ...state,
        isLoading: false,
        loadingMessage: '',
        error: action.payload.error,
      };
      
    case 'CHANGE_CREDITS':
      return {
        ...state,
        credits: state.credits + action.payload.amount,
      };

    case 'TOGGLE_EXPRESSION':
      const expressionName = action.payload.expressionName;
      const isSelected = state.selectedExpressions.includes(expressionName);
      return {
        ...state,
        selectedExpressions: isSelected
          ? state.selectedExpressions.filter(e => e !== expressionName)
          : [...state.selectedExpressions, expressionName],
      };

    case 'SET_SOURCE_IMAGE':
      return {
        ...state,
        sourceImage: action.payload.dataUrl,
        isCalibrated: false,
        error: null,
      };

    case 'REMOVE_SOURCE_IMAGE':
      return {
        ...state,
        sourceImage: null,
        isCalibrated: false,
      };

    case 'START_CALIBRATION':
      return {
        ...state,
        isLoading: true,
        loadingMessage: 'Calibrating image...',
        error: null,
      };

    case 'CALIBRATION_SUCCESS':
      return {
        ...state,
        isLoading: false,
        loadingMessage: '',
        isCalibrated: true,
      };

    default:
      return state;
  }
};

