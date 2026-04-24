import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useSOSStore } from '../store/useSOSStore';

export default function StealthMode() {
  const { activateSOS } = useSOSStore();
  // Long press volume mock -> tap hidden logo
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Weather</Text>
      <Text style={styles.temp}>72°F</Text>
      <Text style={styles.desc}>Sunny, clear skies</Text>
      
      <TouchableWithoutFeedback onLongPress={activateSOS}>
        <View style={styles.hiddenTrigger} />
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  temp: { fontSize: 64, color: '#333', marginTop: 20 },
  desc: { fontSize: 18, color: '#666' },
  hiddenTrigger: { position: 'absolute', bottom: 0, left: 0, width: 100, height: 100 }
});
