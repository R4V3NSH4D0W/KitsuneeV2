import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to AsyncStorage for key ${key}:`, error);
  }
};

export const getFromStorage = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(
      `Error fetching data from AsyncStorage for key ${key}:`,
      error,
    );
    return null;
  }
};
