import React, { useState } from 'react';
import { View, Text, useColorScheme, ActivityIndicator } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuoteCard from '../../components/QuoteCard';
import CategoryModal from '../../components/CategoryModal';
import { useQuote } from '../../hooks/useQuote';

export default function QuoteScreen() {
  const { quote, loading, error, refresh, loadFiltered } = useQuote();
  const [showModal, setShowModal] = useState(false);
  const isDark = useColorScheme() === 'dark';

  if (loading) {
    return (
      <SafeAreaView className={`flex-1 justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
        <View className="items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className={`text-lg mt-4 ${isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>Fetching wisdom...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 justify-center items-center p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
      <View className="w-full max-w-md">
        {quote && (
          <QuoteCard
            quote={quote}
            onRefresh={refresh}
            onCategoryPress={() => setShowModal(true)}
          />
        )}
      </View>

      <CategoryModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelect={(tag) => {
          loadFiltered({ tags: tag });
        }}
      />

      <View className="mt-8">
        <Text className={`text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>
          Powered by Quotes API • {quote?.tags.length} categories
        </Text>
      </View>
    </SafeAreaView>
  );
}