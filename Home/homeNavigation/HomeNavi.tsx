import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../homeScreen/Home';



const Stack = createNativeStackNavigator();

export default function HomeNavi() {
    return (
                <Stack.Navigator
                    screenOptions={{
                    contentStyle: { backgroundColor: 'transparent' },
                }}
                >
                    <Stack.Screen name="homeStack" options={{ headerShown: false }} component={Home} />
                </Stack.Navigator>
    );
}
