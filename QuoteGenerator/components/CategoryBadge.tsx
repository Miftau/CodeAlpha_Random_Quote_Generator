import { TouchableOpacity, Text, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  category: string;
}

export default function CategoryBadge({ category }: Props) {
  const isDark = useColorScheme() === 'dark';

  return (
    <TouchableOpacity className={`flex-row items-center px-4 py-1.5 rounded-full ${
 isDark ? 'bg-gray-700' : 'bg-gray-100'
    }`}>
      <Text className={`text-xs font-medium ${
        isDark ? 'text-gray-400' : 'text-gray-60'
      }`}>
        {category}
      </Text>
      <Ionicons name="chevron-down" size={12} className={`ml-1 ${
        isDark ? 'text-gray-500' : 'text-gray-400'
      }`} />
    </TouchableOpacity>
  );
}