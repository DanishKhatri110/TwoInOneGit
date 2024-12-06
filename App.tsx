import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, LogBox, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TodolistNav from './TodoList/todoNavigation/TodolistNav';
import WeatherNavigation from './WeatherApp/weatherNavigation/WeatherNavigation';
import HomeNavigation from './Home/homeNavigation/HomeNavi';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);
  return (
    <NavigationContainer>
      <View style={styles.mainView}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              marginHorizontal: '15%',
              bottom: '4%',
              borderRadius: 50,
              //for IOS
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              //for Android
              elevation: 5,
            },
            headerShown: false,
            tabBarHideOnKeyboard: true,
          }}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeNavigation}
            options={{
              tabBarLabel: 'Home-Screen',
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={require('./TabAssets/home.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: focused ? 'black' : 'grey',
                    }} />
                );
              },
              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'grey',
            }} />

          <Tab.Screen
            name="TodoListTab"
            component={TodolistNav}
            options={{
              tabBarLabel: 'To-Do-List',
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={require('./TabAssets/todolist.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: focused ? 'black' : 'grey',
                    }} />
                );
              },
              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'grey',
            }} />

          <Tab.Screen
            name="WeatherAppTab"
            component={WeatherNavigation}
            options={{
              tabBarLabel: 'Weather-App',
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={require('./TabAssets/weather.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: focused ? 'black' : 'grey',
                    }} />
                );
              },
              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'grey',
            }} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainView: {
    // flex: 1,
    height: hp('100%'),
    width: wp('100%'),
  },
});

export default App;
