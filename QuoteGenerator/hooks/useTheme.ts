import { useColorScheme } from 'react-native';
import { colors } from '@/theme';

export const useTheme = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  
  return {
    isDark,
    colors: isDark ? colors.dark : colors.light,
    theme: scheme,
  };
};