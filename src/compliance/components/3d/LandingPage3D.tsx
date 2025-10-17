import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useTransform } from 'framer-motion';
import { AiCore3D } from './AiCore3D';
import { ParticleSystem } from './shared/ParticleSystem';
import { useScroll3D } from '../../../hooks/useScroll3D';
import { Group } from 'three';

// A new sub-component for the animated scroll prompt
const AnimatedScrollIndicator = () => {
  const groupRef = useRef<Group>(null);
  const { scrollYProgress } = useScroll3D();

  // Opacity will be 1 at the top and fade to 0 as the user scrolls down
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useFrame((state) => {
    // Adds a subtle bobbing animation to draw attention
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 - 2.8;
    }
  });

  return (
    <motion.group ref={groupRef} opacity={opacity}>
      <Text
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        Scroll to Begin
      </Text>
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        ↓
      </Text>
    </motion.group>
  );
};


export const LandingPage3D: React.FC = () => {
  const { rotationY, rotationX, scale } = useScroll3D();
  
  return (
    <div className="h-full w-full bg-gray-900">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#a78bfa" intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#6d28d9" intensity={1} />
        
        <motion.group 
          rotation-y={rotationY} 
          rotation-x={rotationX}
          scale={scale}
        >
          <AiCore3D isProcessing={false} />
        </motion.group>
        
        <ParticleSystem count={200} />
        
        {/* The new animated scroll indicator is added here */}
        <AnimatedScrollIndicator />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};
