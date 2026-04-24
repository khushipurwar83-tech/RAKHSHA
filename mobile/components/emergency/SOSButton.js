import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, StyleSheet, Vibration } from 'react-native';
import LottieView from 'lottie-react-native';
import { useSOSStore } from '../../store/useSOSStore';
import { Theme } from '../../theme/DesignSystem';

const SOSButton = ({ onTrigger }) => {
  const { isSOSActive, activateSOS } = useSOSStore();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isSOSActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isSOSActive]);

  const handlePress = () => {
    Vibration.vibrate([100, 200, 100, 200]); // Haptic feedback
    activateSOS();
    if (onTrigger) onTrigger();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={styles.button}
      >
        <Text style={styles.text}>{isSOSActive ? 'SOS ACTIVE' : 'SOS'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  pulseCircle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Theme.colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 15,
    shadowColor: Theme.colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  text: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  }
});

export default SOSButton;
