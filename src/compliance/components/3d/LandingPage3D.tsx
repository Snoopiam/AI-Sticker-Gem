import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text } from '@react-three/drei';
import { AiCore3D } from './AiCore3D';
import { ParticleSystem } from './shared/ParticleSystem';
import { useScroll3D } from '../../../hooks/useScroll3D';

// A simpler scroll indicator without motion-3d to avoid WebGL context issues
const AnimatedScrollIndicator = () => {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Bobbing animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 - 2.8;
      
      // Fade out after 3 seconds
      const elapsed = state.clock.elapsedTime;
      const opacity = Math.max(0, 1 - elapsed / 3);
      
      if (groupRef.current.children[0]?.material) {
        groupRef.current.children[0].material.opacity = opacity;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Text
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
        fillOpacity={1}
      >
        Scroll to Begin ↓
      </Text>
    </group>
  );
};

export const LandingPage3D = () => {
  const { rotationY, rotationX, scale } = useScroll3D();

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />

        <group
          rotation-y={rotationY.get()}
          rotation-x={rotationX.get()}
          scale={scale.get()}
        >
          <AiCore3D isProcessing={false} />
          <ParticleSystem count={150} />
        </group>

        <AnimatedScrollIndicator />

        <Environment preset="night" />
      </Canvas>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
          AI Sticker Studio
        </h1>
        <p className="text-xl text-purple-200 drop-shadow-lg">
          Create Unique Stickers with AI
        </p>
      </div>
    </div>
  );
};
