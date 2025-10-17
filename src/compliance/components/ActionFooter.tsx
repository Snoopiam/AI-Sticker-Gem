// src/compliance/components/ActionFooter.tsx
import React from 'react';
import { AppState, Action } from '../../state/types';
import { useGeneration } from '../../hooks/useGeneration';

interface ActionFooterProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export const ActionFooter: React.FC<ActionFooterProps> = ({ state, dispatch }) => {
  const { handleGenerate } = useGeneration(state, dispatch);

  return (
    <div className="bg-gray-900/50 p-3 rounded-lg mt-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Inspire Me ✨
        </button>
        <span className="text-sm text-gray-400">
          Credits: <span className="text-purple-400 font-semibold">{state.credits}</span>
        </span>
      </div>
      <button 
        onClick={handleGenerate}
        disabled={state.isLoading}
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900/50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
      >
        {state.isLoading ? 'Working...' : `Generate (${state.settings.packSize} Credits)`}
      </button>
    </div>
  );
};

