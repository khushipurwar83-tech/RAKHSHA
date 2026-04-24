import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Splash({ navigation }) {
  useEffect(() => { setTimeout(() => navigation.replace('Onboarding'), 2000); }, []);
  return (
    <View style={styles.container}>
      <LottieView source={require('../assets/animations/logo.json')} autoPlay loop={false} style={{ width: 200, height: 200 }} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center' }});
