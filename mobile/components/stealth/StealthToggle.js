import React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import { useStealthMode } from '../../contexts/StealthModeContext';

const StealthToggle = () => {
  const { isStealthMode, toggleStealthMode } = useStealthMode();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stealth Mode</Text>
      <Switch value={isStealthMode} onValueChange={toggleStealthMode} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#111' },
  text: { color: 'white', fontSize: 16 }
});
export default StealthToggle;
