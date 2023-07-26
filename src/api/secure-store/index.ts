import AsyncStorage from '@react-native-async-storage/async-storage';
import { SecureStoreKeys } from '../../constants';


export const getFromSecureStore = async (key: SecureStoreKeys): Promise<string | null> => {
    const value = await AsyncStorage.getItem(key);
    return value ?? null;
};

export const removeFromSecureStore = async (key: SecureStoreKeys) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        // remove error
    }
};

export const setToSecureStore = async (key: SecureStoreKeys, value: string) => {
    return await AsyncStorage.setItem(key, value);
};
