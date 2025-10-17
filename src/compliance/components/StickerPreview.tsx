import React from 'react';
import { AppState } from '../../state/types';
import { AiCore3D } from './3d/AiCore3D';
import { Canvas } from '@react-three/fiber';

interface StickerPreviewProps {
  state: AppState;
}

export const StickerPreview: React.FC<StickerPreviewProps> = ({ state }) => {
  const { isLoading, loadingMessage, error, results } = state;

  const handleDownload = (dataUrl: string, id: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `sticker_${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-64 h-64">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} color="#a78bfa" />
              <AiCore3D isProcessing={true} scale={0.8}/>
            </Canvas>
          </div>
          <p className="text-purple-300 mt-4">{loadingMessage}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-red-400">
            <p className="text-lg">{error}</p>
        </div>
      );
    }

    if (results.length > 0) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-y-auto h-full">
          {results.map(result => (
            <div key={result.id} className="group relative">
              <img src={result.dataUrl} alt="Generated sticker" className="w-full h-full object-cover rounded-lg border-2 border-transparent group-hover:border-purple-500 transition-all"/>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                <p className="text-xs text-gray-300 mb-2">{new Date(result.timestamp).toLocaleTimeString()}</p>
                <button 
                  onClick={() => handleDownload(result.dataUrl, result.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-1 px-3 rounded"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-64 h-64">
           <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} color="#a78bfa" />
              <AiCore3D isProcessing={false} scale={0.8}/>
            </Canvas>
        </div>
        <p className="text-gray-400 mt-4">Your generated stickers will appear here.</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-800/50 rounded-lg h-full">
      {renderContent()}
    </div>
  );
};

