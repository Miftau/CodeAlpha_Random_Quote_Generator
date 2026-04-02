import { TouchableOpacity, Text, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onPress: () => void;
}

export default function NewQuoteButton({ onPress }: Props) {
  const isDark = useColorScheme() === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-center gap-2 py-3 px-6 rounded-xl ${
        isDark ? 'bg-gray-700' : 'bg-gray-200'
      }`}
    >
      <Ionicons name="refresh" size={20} className={`${isDark ? 'text-white' : 'text-gray-800'}`} />
      <Text className={`font-medium ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        New Quote
      </Text>
    </TouchableOpacity>
  );
}