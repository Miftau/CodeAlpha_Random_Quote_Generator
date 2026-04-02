import React from 'react';
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCategories } from '@/hooks/useCategories';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (tag: string) => void;
}

export default function CategoryModal({ visible, onClose, onSelect }: Props) {
  const isDark = useColorScheme() === 'dark';
  const { tags, isLoading } = useCategories();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <SafeAreaView className="-1 bg-black/50 justify-end">
        <View className={`rounded-t-3xl p-6 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className={`text-xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Categories
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <Text className={`text-center py-8 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>Loading categories...</Text>
          ) : (
            <ScrollView className="max-h-60">
              {tags.map((tag, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    onSelect(tag);
                    onClose();
                  }}
                  className={`py-3 px-4 rounded-lg mb-2 ${
                    isDark ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  <Text className={`font-medium ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    #{tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <Text className={`text-center mt-4 text-sm ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Tap a tag to filter quotes
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
}