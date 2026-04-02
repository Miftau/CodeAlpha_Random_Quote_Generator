import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useColorScheme } from 'react-native';
import QuoteCard from '../../components/QuoteCard';
import CategoryModal from '../../components/CategoryModal';
import { useQuote } from '../../hooks/useQuote';

export default function QuoteScreen() {
  const { quote, loading, error, refresh, loadFiltered } = useQuote();
  const [showModal, setShowModal] = useState(false);
  const isDark = useColorScheme() === 'dark';

  if (loading) {
    return (
      <SafeAreaView className={`flex-1 justify-center items-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <View className="items-center">
          <View className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <Text className={`text-lg ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>Fetching wisdom...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 justify-center items-center p-4 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
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
        <Text className={`text-center text-sm ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}>
          Powered by Quotable API • {quote?.tags.length} categories
        </Text>
      </View>
    </SafeAreaView>
  );
}