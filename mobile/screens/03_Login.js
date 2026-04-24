import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Theme, GlobalStyles } from '../theme/DesignSystem';

export default function Login({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🛡️</Text>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Enter your secure credentials</Text>

        <View style={styles.form}>
          <TextInput 
            style={styles.input} 
            placeholder="Email Address" 
            placeholderTextColor="#666"
            keyboardType="email-address"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Secure Password" 
            placeholderTextColor="#666"
            secureTextEntry
          />
          
          <TouchableOpacity style={GlobalStyles.neonButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.btnText}>AUTHENTICATE</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.footerText}>New to Rakhsha? <Text style={{color: Theme.colors.primary}}>Register</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  content: { flex: 1, padding: 30, justifyContent: 'center' },
  logo: { fontSize: 60, textAlign: 'center', marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF', textAlign: 'center' },
  subtitle: { color: '#666', textAlign: 'center', marginBottom: 40 },
  form: { gap: 20 },
  input: { backgroundColor: '#1A1A1A', padding: 18, borderRadius: 12, color: '#FFF', borderWidth: 1, borderColor: '#333' },
  btnText: { color: '#000', fontWeight: 'bold', letterSpacing: 2 },
  footer: { marginTop: 30 },
  footerText: { color: '#666', textAlign: 'center' }
});