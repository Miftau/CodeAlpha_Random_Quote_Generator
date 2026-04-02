import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import CategoryBadge from '@/components/CategoryBadge';
import NewQuoteButton from '@/components/NewQuoteButton';
import { Quote } from '@/types/quote';

interface Props {
  quote: Quote;
  onRefresh: () => void;
  onCategoryPress: () => void;
}

export default function QuoteCard({ quote, onRefresh, onCategoryPress }: Props) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View className={`rounded-3xl p-6 shadow-lg ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <TouchableOpacity onPress={onCategoryPress} className="self-start mb-6">
        <CategoryBadge category={quote.category ?? ''} />
      </TouchableOpacity>

      <Text className={`text-xl font-medium italic text-center mb-6 ${
        isDark ? 'text-gray-100' : 'text-gray-900'
      }`}>
        “{quote.content}”
      </Text>

      <Text className={`text-lg font-semibold text-right ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        — {quote.author}
      </Text>

      <View className="mt-8">
        <NewQuoteButton onPress={onRefresh} />
      </View>
    </View>
  );
}