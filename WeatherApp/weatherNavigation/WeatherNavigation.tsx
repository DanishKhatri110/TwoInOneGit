import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherApp from '../weatherScreen/WeatherApp';



const Stack = createNativeStackNavigator();

export default function WeatherNavigation() {
    return (
                <Stack.Navigator
                    screenOptions={{
                    contentStyle: { backgroundColor: 'transparent' },
                }}
                >
                    <Stack.Screen name="WeatherAppStack" options={{ headerShown: false }} component={WeatherApp} />
                </Stack.Navigator>
    );
}
