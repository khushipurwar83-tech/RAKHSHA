import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStealthStore } from '../store/useStealthStore';

// Screen Imports
import Splash from '../screens/01_Splash';
import Login from '../screens/03_Login';
import Register from '../screens/04_Register';
import Home from '../screens/08_Home';
import NavigationScreen from '../screens/10_Navigation';
import SOSPanel from '../screens/11_SOSPanel';
import FakeCall from '../screens/12_FakeCall';
import Heatmap from '../screens/14_Heatmap';
import LiveTracking from '../screens/17_LiveTracking';
import StealthMode from '../screens/21_StealthMode';
import ReportUnsafe from '../screens/13_ReportUnsafe';
import Guardians from '../screens/16_Guardians';
import Profile from '../screens/20_Profile';
import SafeHavens from '../screens/15_SafeHavens';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { currentMode, isStealthEnabled } = useStealthStore();

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'fade_from_bottom'
      }}
    >
      {isStealthEnabled && currentMode === 'STEALTH' ? (
        <Stack.Screen name="Stealth" component={StealthMode} />
      ) : (
        <>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Navigation" component={NavigationScreen} />
          <Stack.Screen name="SOSPanel" component={SOSPanel} />
          <Stack.Screen name="FakeCall" component={FakeCall} />
          <Stack.Screen name="Heatmap" component={Heatmap} />
          <Stack.Screen name="LiveTracking" component={LiveTracking} />
          <Stack.Screen name="ReportUnsafe" component={ReportUnsafe} />
          <Stack.Screen name="Guardians" component={Guardians} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SafeHavens" component={SafeHavens} />
        </>
      )}
    </Stack.Navigator>
  );
}