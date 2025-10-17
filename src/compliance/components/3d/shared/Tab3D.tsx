// src/compliance/components/3d/shared/Tab3D.tsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';

interface Tab3DProps {
  position: [number, number, number];
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const Tab3D: React.FC<Tab3DProps> = ({ position, label, isActive, onClick }) => {
  const meshRef = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Animate tab on hover and active state
  useFrame((state) => {
    if (meshRef.current) {
      const targetY = isHovered ? position[1] + 0.1 : position[1];
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1;
    }
  });

  return (
    <group 
      position={position} 
      onClick={onClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <mesh ref={meshRef}>
        <boxGeometry args={[1.8, 0.4, 0.15]} />
        <meshStandardMaterial 
          color={isActive ? '#6d28d9' : '#1f2937'}
          emissive={isActive ? '#a78bfa' : '#111827'}
          emissiveIntensity={isActive ? 0.8 : 0}
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.15}
        color={isActive ? "white" : "#9ca3af"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

