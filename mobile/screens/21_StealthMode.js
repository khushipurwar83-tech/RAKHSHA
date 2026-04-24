import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Vibration } from 'react-native';
import { useStealthStore } from '../store/useStealthStore';

export default function StealthMode({ navigation }) {
  const [display, setDisplay] = useState('0');
  const { stealthPin, setMode } = useStealthStore();

  const handlePress = (val) => {
    Vibration.vibrate(50);
    if (val === 'C') {
      setDisplay('0');
    } else if (val === '=') {
      if (display === stealthPin) {
        // UNLOCK RAKHSHA
        setMode('NORMAL');
        navigation.navigate('Home');
      } else {
        // Act like a real calculator result
        try {
          const result = eval(display.replace('x', '*'));
          setDisplay(String(result));
        } catch (e) {
          setDisplay('Error');
        }
      }
    } else {
      setDisplay(prev => prev === '0' ? val : prev + val);
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', 'x'],
    ['1', '2', '3', '-'],
    ['C', '0', '=', '+']
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      
      <View style={styles.grid}>
        {buttons.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map(btn => (
              <TouchableOpacity 
                key={btn} 
                style={[
                  styles.button, 
                  btn === '=' ? styles.equalBtn : null,
                  ['/', 'x', '-', '+'].includes(btn) ? styles.operatorBtn : null
                ]} 
                onPress={() => handlePress(btn)}
              >
                <Text style={styles.btnText}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      
      <Text style={styles.hint}>Standard Calculator v1.0.4</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  displayContainer: { height: 200, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20 },
  displayText: { color: '#FFF', fontSize: 60, fontWeight: '300' },
  grid: { flex: 1, justifyContent: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  button: { width: 75, height: 75, borderRadius: 37.5, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  operatorBtn: { backgroundColor: '#FF9500' },
  equalBtn: { backgroundColor: '#007AFF' },
  hint: { color: '#333', textAlign: 'center', marginTop: 20, fontSize: 12 }
});
