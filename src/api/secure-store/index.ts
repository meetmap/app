import AsyncStorage from '@react-native-async-storage/async-storage';
import { SecureStoreKeys } from '../../constants';


export const getFromSecureStore = async (key: SecureStoreKeys): Promise<string | null> => {
    const value = await AsyncStorage.getItem(key);
    return value ?? null;
};

export const setToSecureStore = async (key: SecureStoreKeys, value: string) => {
    return await AsyncStorage.setItem(key, value);
};
