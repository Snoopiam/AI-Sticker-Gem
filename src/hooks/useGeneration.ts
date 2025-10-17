// src/hooks/useGeneration.ts
import React from 'react';
import { AppState, Action, GeneratedResult } from '../state/types';
import { generateSticker } from '../utils/services/geminiService';

export const useGeneration = (state: AppState, dispatch: React.Dispatch<Action>) => {
  
  const handleGenerate = async () => {
    // 1. Pre-flight checks
    if (state.isLoading) return;
    if (state.selectedExpressions.length === 0) {
      dispatch({ type: 'GENERATION_ERROR', payload: { error: "Please select at least one expression." } });
      return;
    }
    
    const cost = state.settings.packSize;
    if (state.credits < cost) {
      dispatch({ type: 'GENERATION_ERROR', payload: { error: `Insufficient credits. Needs ${cost}.` } });
      return;
    }

    // 2. Start Generation Process
    dispatch({ type: 'START_GENERATION', payload: { message: `Preparing ${cost} stickers...` } });
    dispatch({ type: 'CHANGE_CREDITS', payload: { amount: -cost } });

    try {
      // 3. Generate stickers sequentially
      const generatedResults: GeneratedResult[] = [];
      const expressionsToGenerate = state.selectedExpressions.slice(0, cost);

      for (let i = 0; i < expressionsToGenerate.length; i++) {
        const expressionName = expressionsToGenerate[i];
        dispatch({ type: 'START_GENERATION', payload: { message: `Generating sticker ${i + 1} of ${cost}: ${expressionName}...` } });
        
        const dataUrl = await generateSticker(state.settings, expressionName);
        
        generatedResults.push({
          id: `${Date.now()}-${i}`,
          dataUrl,
          settings: state.settings,
          timestamp: Date.now(),
        });
      }

      // 4. Handle Success
      dispatch({ type: 'GENERATION_SUCCESS', payload: { results: generatedResults } });

    } catch (error: any) {
      // 5. Handle Failure and Refund Credits
      dispatch({ type: 'GENERATION_ERROR', payload: { error: error.message || "An unknown error occurred." } });
      dispatch({ type: 'CHANGE_CREDITS', payload: { amount: cost } }); // Refund
    }
  };

  return { handleGenerate };
};

