// src/compliance/components/StickerStudioWorkflow.tsx
import React, { useReducer } from 'react';
import { Header3D } from './3d/Header3D';
import { ControlPanel } from './ControlPanel';
import { StickerPreview } from './StickerPreview';
import { ActionFooter } from './ActionFooter';
import { initialState } from '../../state/initialState';
import { generationReducer } from '../../state/reducers/generationReducer';

export const StickerStudioWorkflow: React.FC = () => {
  const [state, dispatch] = useReducer(generationReducer, initialState);

  return (
    <div className="relative h-full w-full bg-gray-900 text-white flex flex-col p-4 pt-24 rounded-2xl shadow-lg border border-purple-900/50">
      <Header3D />
      
      <main className="flex-grow grid grid-cols-12 gap-4 h-full min-h-0">
        {/* Left Panel: Controls */}
        <div className="col-span-4 h-full overflow-y-auto pr-2">
          <ControlPanel state={state} dispatch={dispatch} />
        </div>
        
        {/* Right Panel: Preview */}
        <div className="col-span-8 h-full">
          <StickerPreview state={state} />
        </div>
      </main>
      
      <ActionFooter state={state} dispatch={dispatch} />
    </div>
  );
};

