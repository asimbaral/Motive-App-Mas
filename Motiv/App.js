import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainContainer from './navigation/MainContainer';
import SplashScreen from './navigation/screens/SplashScreen';
import LoginScreen from './navigation/screens/LoginScreen';
// import registerNNPushToken from 'native-notify';
// import * as Device from 'expo-device';
// import { StatusBar } from 'expo-status-bar';
// import React, {useEffect, useState, useRef} from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';
// import storage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();



function App() {
  // registerNNPushToken(5191, '8cNQFvlD6fmrDpth5dpCGz');
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={MainContainer} options={{ headerShown: false, gestureEnabled: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;