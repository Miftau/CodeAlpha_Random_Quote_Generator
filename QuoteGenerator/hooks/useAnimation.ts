import { useSharedValue, useAnimatedStyle, withTiming, withSpring, Easing } from 'react-native-reanimated';

interface UseAnimationReturn {
  opacity: any;
  scale: any;
  animatedStyle: any;
  fadeIn: () => void;
  fadeOut: () => void;
  animateScale: (toValue: number) => void;
}

export const useAnimation = (): UseAnimationReturn => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const fadeIn = () => {
    opacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
  };

  const fadeOut = () => {
    opacity.value = withTiming(0, { duration: 300 });
  };

  const animateScale = (toValue: number) => {
    scale.value = withSpring(toValue, { damping: 18, stiffness: 120 });
  };

  return {
    opacity,
    scale,
    fadeIn,
    fadeOut,
    animateScale,
    animatedStyle,
  };
};