import { useScroll, useSpring, useTransform } from 'framer-motion';
import { MotionValue } from 'framer-motion';

interface Scroll3DValues {
  rotationY: MotionValue<number>;
  rotationX: MotionValue<number>;
  scale: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

export const useScroll3D = (): Scroll3DValues => {
  const { scrollYProgress } = useScroll();
  
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 1.5]);
  const rotationX = useTransform(scrollYProgress, [0, 0.5, 1], [0, Math.PI / 8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothRotationY = useSpring(rotationY, springConfig);
  const smoothRotationX = useSpring(rotationX, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  
  return {
    rotationY: smoothRotationY,
    rotationX: smoothRotationX,
    scale: smoothScale,
    scrollYProgress
  };
};