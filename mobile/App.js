import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

// Store
import { useAppStore } from './store/useAppStore';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { StealthModeProvider } from './contexts/StealthModeContext';
import { SocketProvider } from './contexts/SocketContext';

// Navigation
import AppNavigator from './navigation/AppNavigator';
import { useShakeSOS } from './store/useShakeSOS';


export default function App() {
  const { isOffline, setOfflineMode } = useAppStore();
  useShakeSOS(); // Enable Shake-to-SOS globally

  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StealthModeProvider>
          <SocketProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
            <StatusBar style="light" />
          </SocketProvider>
        </StealthModeProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

