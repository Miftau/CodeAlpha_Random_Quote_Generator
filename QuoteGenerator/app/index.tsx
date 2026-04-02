import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
      {/* Centered content container */}
      <View className="items-center w-full max-w-md">
        <Text className={`text-4xl font-bold mb-6 text-center ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Wisdom Quotes
        </Text>
        
        <Text className={`text-lg text-center mb-10 max-w-sm ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Discover inspiring quotes from great minds
        </Text>

        {/* Primary action button */}
        <Link href="/quote" asChild>
          <TouchableOpacity className={`py-4 px-8 rounded-xl ${
            isDark ? 'bg-blue-600' : 'bg-blue-500'
          }`}>
            <Text className="text-white font-medium text-lg text-center">
              Start Reading
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}