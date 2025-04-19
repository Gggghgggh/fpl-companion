import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Custom FPL themes
const FPLTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#37003C', // FPL purple
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#37003C',
    border: '#E0E0E0',
    notification: '#FF4081',
  },
};

const FPLDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#00FF87', // FPL green
    background: '#1A0036',
    card: '#37003C',
    text: '#FFFFFF',
    border: '#4A148C',
    notification: '#FF4081',
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    'FPL-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'FPL-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'FPL-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? FPLDarkTheme : FPLTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1A0036' : '#37003C',
          },
          headerTintColor: colorScheme === 'dark' ? '#00FF87' : '#FFFFFF',
          headerTitleStyle: {
            fontFamily: 'FPL-Bold',
          },
          contentStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1A0036' : '#F5F5F5',
          },
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="+not-found" 
          options={{
            title: 'Not Found',
          }}
        />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}