import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Theme, GlobalStyles } from '../theme/DesignSystem';

export default function Register({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join the network of protected citizens</Text>

        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#666" />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#666" />
          <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#666" />
          <TextInput style={styles.input} placeholder="Secret Password" placeholderTextColor="#666" secureTextEntry />
          <TextInput style={styles.input} placeholder="Emergency PIN (4 digits)" placeholderTextColor="#666" maxLength={4} />
          
          <TouchableOpacity style={GlobalStyles.neonButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnText}>JOIN RAKHSHA</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerText}>Already protected? <Text style={{color: Theme.colors.primary}}>Login</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  content: { padding: 30, paddingVertical: 60 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  subtitle: { color: '#666', marginBottom: 40 },
  form: { gap: 15 },
  input: { backgroundColor: '#1A1A1A', padding: 18, borderRadius: 12, color: '#FFF', borderWidth: 1, borderColor: '#333' },
  btnText: { color: '#000', fontWeight: 'bold', letterSpacing: 2 },
  footer: { marginTop: 30 },
  footerText: { color: '#666', textAlign: 'center' }
});