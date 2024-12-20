import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key:any, value:any) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch(error) {
    console.log('Error Storing Value: ', error);
    }
};

export const getData = async (key: any) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.log('Error Retrieving Value: ', error);
    }
};