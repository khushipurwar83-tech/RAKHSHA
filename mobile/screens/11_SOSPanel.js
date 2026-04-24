import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, Vibration } from 'react-native';
import { Theme, GlobalStyles } from '../theme/DesignSystem';
import { Ionicons } from '@expo/vector-icons';
import { useSOSStore } from '../store/useSOSStore';
import { useAppStore } from '../store/useAppStore';

export default function SOSPanel({ navigation }) {
  const { isSOSActive, deactivateSOS, sosStartTime } = useSOSStore();
  const { userLocation } = useAppStore();
  const [elapsed, setElapsed] = useState('00:00');
  const bgAnim = new Animated.Value(0);

  useEffect(() => {
    // Pulsing background animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgAnim, { toValue: 1, duration: 1000, useNativeDriver: false }),
        Animated.timing(bgAnim, { toValue: 0, duration: 1000, useNativeDriver: false })
      ])
    ).start();

    // Timer logic
    const interval = setInterval(() => {
      if (sosStartTime) {
        const diff = Math.floor((new Date() - new Date(sosStartTime)) / 1000);
        const mins = Math.floor(diff / 60).toString().padStart(2, '0');
        const secs = (diff % 60).toString().padStart(2, '0');
        setElapsed(`${mins}:${secs}`);
      }
    }, 1000);

    // Continuous vibration for alert feeling
    const vibInterval = setInterval(() => {
      if (isSOSActive) Vibration.vibrate(500);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(vibInterval);
    };
  }, [sosStartTime, isSOSActive]);

  const handleSafe = async () => {
    await deactivateSOS();
    Vibration.cancel();
    navigation.navigate('Home');
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#0A0A0A', '#300000']
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.alertText}>🚨 EMERGENCY SOS ACTIVE</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>ELAPSED TIME</Text>
            <Text style={styles.timerValue}>{elapsed}</Text>
          </View>

          <View style={styles.statusBox}>
            <View style={styles.statusRow}>
              <Ionicons name="people" size={24} color={Theme.colors.primary} />
              <Text style={styles.statusText}>Guardians Notified</Text>
              <Ionicons name="checkmark-circle" size={24} color={Theme.colors.success} />
            </View>
            <View style={styles.statusRow}>
              <Ionicons name="business" size={24} color={Theme.colors.primary} />
              <Text style={styles.statusText}>Local Authorities Alerted</Text>
              <Ionicons name="time" size={24} color="#666" />
            </View>
          </View>

          <View style={[GlobalStyles.glassCard, { marginTop: 40 }]}>
            <Text style={styles.locationTitle}>BROADCASTING LIVE LOCATION</Text>
            <Text style={styles.locationCoords}>
              {userLocation 
                ? `${userLocation.coords.latitude.toFixed(6)}, ${userLocation.coords.longitude.toFixed(6)}`
                : 'Fetching...'}
            </Text>
            <View style={styles.pulseDotContainer}>
              <View style={styles.pulseDot} />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.safeButton, { marginTop: 'auto', marginBottom: 40 }]} 
            onPress={handleSafe}
          >
            <Text style={styles.safeButtonText}>I AM SAFE (CANCEL SOS)</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  alertText: { color: Theme.colors.error, fontSize: 18, fontWeight: 'bold', letterSpacing: 2 },
  content: { flex: 1, padding: 30, alignItems: 'center' },
  timerContainer: { alignItems: 'center', marginTop: 40 },
  timerLabel: { color: '#666', fontSize: 12, letterSpacing: 3 },
  timerValue: { color: '#FFF', fontSize: 64, fontWeight: 'bold', fontFamily: 'monospace' },
  statusBox: { width: '100%', marginTop: 50, gap: 20 },
  statusRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: 15, borderRadius: 15 },
  statusText: { flex: 1, color: '#DDD', marginLeft: 15, fontSize: 14 },
  locationTitle: { color: Theme.colors.primary, fontSize: 10, letterSpacing: 2, textAlign: 'center' },
  locationCoords: { color: '#FFF', fontSize: 18, textAlign: 'center', marginTop: 10, fontWeight: '600' },
  pulseDotContainer: { alignItems: 'center', marginTop: 15 },
  pulseDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Theme.colors.error },
  safeButton: { 
    width: '100%', 
    backgroundColor: Theme.colors.success, 
    padding: 20, 
    borderRadius: 20, 
    alignItems: 'center',
    shadowColor: Theme.colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10
  },
  safeButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }
});