import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SOSButton from '../components/emergency/SOSButton';
import StealthToggle from '../components/stealth/StealthToggle';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StealthToggle />
      <View style={styles.center}>
        <SOSButton />
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Navigation')}>
          <Text style={styles.btnText}>Plan Safe Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btn: { marginTop: 20, padding: 16, backgroundColor: '#00F0FF', borderRadius: 8 },
  btnText: { color: '#0A0A0A', fontWeight: 'bold' }
});
