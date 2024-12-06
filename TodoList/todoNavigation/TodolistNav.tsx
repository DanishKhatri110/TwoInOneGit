import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from '../todoScreen/TodoList';


const Stack = createNativeStackNavigator();

export default function TodolistNav() {
    return (
                <Stack.Navigator
                    screenOptions={{
                        contentStyle: { backgroundColor: 'transparent' },
                    }}
                >
                    <Stack.Screen
                        name="TodoListStack"
                        options={{ headerShown: false }}
                        component={TodoList}
                    />
                </Stack.Navigator>
    );
};