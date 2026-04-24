import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { Theme } from '../theme/DesignSystem';

export default function Splash({ navigation }) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.shieldIcon}>
           <Text style={styles.shieldText}>🛡️</Text>
        </View>
        <Text style={styles.title}>RAKHSHA</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>YOUR GUARDIAN IN THE SHADOWS</Text>
      </Animated.View>
      
      <Text style={styles.footer}>HACKATHON EDITION 2026</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background, justifyContent: 'center', alignItems: 'center' },
  logoContainer: { alignItems: 'center' },
  shieldIcon: { width: 100, height: 100, borderRadius: 50, backgroundColor: Theme.colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Theme.colors.primary, marginBottom: 20 },
  shieldText: { fontSize: 50 },
  title: { fontSize: 48, fontWeight: 'bold', color: Theme.colors.text, letterSpacing: 10 },
  subtitle: { fontSize: 12, color: Theme.colors.primary, letterSpacing: 2, marginTop: 10 },
  divider: { width: 100, height: 2, backgroundColor: Theme.colors.primary, marginTop: 15 },
  footer: { position: 'absolute', bottom: 40, color: '#333', fontSize: 10, letterSpacing: 1 }
});
