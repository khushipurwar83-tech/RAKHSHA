import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

// Store
import { useAppStore } from './store/useAppStore';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { StealthModeProvider } from './contexts/StealthModeContext';
import { SocketProvider } from './contexts/SocketContext';

// Basic Mock Screens to avoid crashing
import { View, Text } from 'react-native';
const PlaceholderScreen = ({ name }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0A0A' }}>
    <Text style={{ color: '#FF3B30', fontSize: 24, fontWeight: 'bold' }}>{name}</Text>
  </View>
);

const Stack = createNativeStackNavigator();

export default function App() {
  const { isOffline, setOfflineMode } = useAppStore();
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
              <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0A0A0A' } }}>
                <Stack.Screen name="Splash" children={() => <PlaceholderScreen name="RAKHSHA SPLASH" />} />
                <Stack.Screen name="Login" children={() => <PlaceholderScreen name="LOGIN" />} />
                <Stack.Screen name="Home" children={() => <PlaceholderScreen name="HOME DASHBOARD" />} />
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="light" />
          </SocketProvider>
        </StealthModeProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
