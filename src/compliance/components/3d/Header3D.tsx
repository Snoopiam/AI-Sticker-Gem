// src/compliance/components/3d/Header3D.tsx
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Tab3D } from './shared/Tab3D';

export const Header3D: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Stickers');
  
  return (
    <header className="absolute top-0 left-0 right-0 h-20 z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[0, 2, 5]} intensity={1} color="#a78bfa" />
        
        <Tab3D 
          position={[-2.2, 0, 0]} 
          label="Stickers" 
          isActive={activeTab === 'Stickers'}
          onClick={() => setActiveTab('Stickers')}
        />
        <Tab3D 
          position={[0, 0, 0]} 
          label="Wallpapers" 
          isActive={activeTab === 'Wallpapers'}
          onClick={() => setActiveTab('Wallpapers')}
        />
        <Tab3D 
          position={[2.2, 0, 0]} 
          label="Remix" 
          isActive={activeTab === 'Remix'}
          onClick={() => setActiveTab('Remix')}
        />
        
        {/* Placeholder for 3D Credits Coin */}
      </Canvas>
    </header>
  );
};

