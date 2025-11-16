import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e: any) {
    console.log(`[AsyncStorage Error] error : ${e.message}`);
  }
};

export const storeObjData = async (key: string, value: Record<string, any>) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e: any) {
    console.log(`[AsyncStorage Error] error : ${e.message}`);
  }
};

export const getData = async (key: any): Promise<string|null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e: any) {
    console.log(`[AsyncStorage Error] error : ${e.message}`);
  }
  return null
};

export const getObjData = async (key: string): Promise<any> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e: any) {
    console.log(`[AsyncStorage Error] error : ${e.message}`);
  }
};
