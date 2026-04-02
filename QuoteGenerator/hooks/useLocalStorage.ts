import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageValue<T> = T | null;

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [StorageValue<T>, (value: T | ((val: T) => T)) => Promise<void>] => {
  const [storedValue, setStoredValue] = useState<StorageValue<T>>(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        setStoredValue(initialValue);
      }
    };

    getItem();
  }, [key, initialValue]);

  const setValue = async (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue!) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};
