import React, { useCallback, useEffect, useState } from 'react';
import { Image, SafeAreaView, Button, TouchableOpacity, Alert, StyleSheet, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import MotivLogo from '../../assets/MotivLogo.png'
import { useNavigation } from '@react-navigation/core'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function StartScreen() {
  const [appIsReady, setAppIsReady] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    
  <SafeAreaView style={logoStyles.container} onLayout={onLayoutRootView}>
    <View style={logoStyles.container}>
      <Image source={MotivLogo} style={{ width: 271, height: 101 }}/>
    </View>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.replace("Login")} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
}

const logoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    backgroundColor: "#26B1FF",
    height: 64,
    width: 360,
    padding: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    alignItems: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
    color: '#fff',
  },
});