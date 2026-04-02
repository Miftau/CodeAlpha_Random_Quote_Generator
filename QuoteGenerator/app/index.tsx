import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const isDark = useColorScheme() === 'dark';

  return (
    <LinearGradient 
      colors={isDark ? ['#0f172a', '#1e293b'] : ['#f8fafc', '#e2e8f0']} 
      className="flex-1 justify-center items-center p-6"
    >
      <View className="items-center">
        <Text className={`text-3xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Wisdom Quotes
        </Text>
        
        <Text className={`text-lg text-center mb-10 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Discover inspiring quotes from great minds
        </Text>

        <Link href="/quote" asChild>
          <View className={`py-4-xl ${
            isDark ? 'bg-blue-600' : 'bg-blue-500'
          }`}>
            <Text className="text-white font-medium text-lg">
              Start Reading
            </Text>
          </View>
        </Link>
      </View>
    </LinearGradient>
  );
}