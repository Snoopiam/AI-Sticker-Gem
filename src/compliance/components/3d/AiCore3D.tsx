import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, ShaderMaterial, Color, Vector3 } from 'three';

interface AiCore3DProps {
  isProcessing: boolean;
  position?: [number, number, number];
  scale?: number;
}

export const AiCore3D: React.FC<AiCore3DProps> = ({ 
  isProcessing, 
  position = [0, 0, 0], 
  scale = 1 
}) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  
  const shaderMaterial = useMemo(() => new ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      isProcessing: { value: isProcessing ? 1.0 : 0.0 },
      baseColor: { value: new Color('#6d28d9') },
      glowColor: { value: new Color('#a78bfa') },
      cameraPosition: { value: new Vector3() },
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec3 vViewDirection;

      void main() {
        vPosition = position;
        vNormal = normal;
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vViewDirection = normalize(cameraPosition - worldPosition.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float isProcessing;
      uniform vec3 baseColor;
      uniform vec3 glowColor;
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec3 vViewDirection;

      float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }

      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n = mix(mix(rand(i.xy), rand(i.xy + vec2(1.0, 0.0)), f.x),
                      mix(rand(i.xy + vec2(0.0, 1.0)), rand(i.xy + vec2(1.0, 1.0)), f.x), f.y);
        return n;
      }

      void main() {
        float fresnel = 1.0 - dot(vNormal, vViewDirection);
        fresnel = pow(fresnel, 2.0);
        
        float surfaceNoise = noise(vPosition * 3.0 + time * 0.5);
        
        float processingPulse = 1.0 + isProcessing * sin(time * 10.0) * 0.2;
        float scanline = isProcessing * step(0.95, fract(vPosition.y * 10.0 - time * 2.0));
        
        vec3 color = mix(baseColor, glowColor, fresnel + surfaceNoise * 0.3);
        
        color *= processingPulse;
        color = mix(color, vec3(0.0), scanline * 0.3);

        gl_FragColor = vec4(color, fresnel + 0.2);
      }
    `,
    transparent: true,
    depthWrite: false,
  }), [isProcessing]);
  
  useFrame((state) => {
    const { clock, camera } = state;
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
      materialRef.current.uniforms.cameraPosition.value.copy(camera.position);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[2, 4]} />
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
};

