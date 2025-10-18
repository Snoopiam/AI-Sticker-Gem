import React from 'react';
import { AppState, Action, GeneratedResult } from '../state/types';
import { generateSticker, generateAnimatedSticker } from '../utils/services/geminiService';

export const useGeneration = (state: AppState, dispatch: React.Dispatch<Action>) => {

  const handleGenerate = async () => {
    if (state.isLoading) return;
    if (state.selectedExpressions.length === 0) {
      dispatch({ type: 'GENERATION_ERROR', payload: { error: "Please select at least one expression." } });
      return;
    }

    const isAnimated = state.settings.outputFormat === 'animated';
    const cost = isAnimated ? 1 : state.settings.packSize; // Animated costs 1, static costs packSize

    if (state.credits < cost) {
      dispatch({ type: 'GENERATION_ERROR', payload: { error: `Insufficient credits. Needs ${cost}.` } });
      return;
    }

    dispatch({ type: 'START_GENERATION', payload: { message: isAnimated ? 'Preparing animation...' : `Preparing ${cost} stickers...` } });
    dispatch({ type: 'CHANGE_CREDITS', payload: { amount: -cost } });

    try {
      const generatedResults: GeneratedResult[] = [];

      if (isAnimated) {
        const expressionName = state.selectedExpressions[0];
        dispatch({ type: 'START_GENERATION', payload: { message: `Generating animation: ${expressionName}...` } });
        const dataUrl = await generateAnimatedSticker(state.settings, expressionName);
        generatedResults.push({
          id: `${Date.now()}-0`,
          dataUrl,
          settings: state.settings,
          timestamp: Date.now(),
          format: 'animated'
        });
      } else {
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
            format: 'static'
          });
        }
      }

      dispatch({ type: 'GENERATION_SUCCESS', payload: { results: generatedResults } });

    } catch (error: any) {
      dispatch({ type: 'GENERATION_ERROR', payload: { error: error.message || "An unknown error occurred." } });
      dispatch({ type: 'CHANGE_CREDITS', payload: { amount: cost } }); // Refund
    }
  };

  return { handleGenerate };
};

