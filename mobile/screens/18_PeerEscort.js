import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Alert, Clipboard } from 'react-native';
import { Theme, GlobalStyles } from '../theme/DesignSystem';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function PeerEscort({ navigation }) {
  const [pairingCode, setPairingCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCode = async () => {
    setLoading(true);
    try {
      const response = await api.post('/watch/generate-code', {}, {
        headers: { 'user-id': 'khushi_shield_001' }
      });
      setPairingCode(response.data.pairing_code);
    } catch (error) {
      console.error(error);
      setPairingCode('582931'); // Fallback mock
    } finally {
      setLoading(false);
    }
  };

  const handlePair = async () => {
    if (inputCode.length < 6) return;
    setLoading(true);
    try {
      await api.post('/watch/pair', { code: inputCode }, {
        headers: { 'user-id': 'khushi_shield_001' }
      });
      Alert.alert('Success', 'Peer Pairing Active! You can now see each other on the live map.');
      navigation.navigate('LiveTracking');
    } catch (error) {
      Alert.alert('Error', 'Invalid or expired code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>VIRTUAL ESCORT</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Ionicons name="people-circle" size={48} color={Theme.colors.primary} />
          <Text style={styles.infoTitle}>Pair with a Friend</Text>
          <Text style={styles.infoText}>Share live locations mutually until you both reach your destinations.</Text>
        </View>

        <View style={[GlobalStyles.glassCard, styles.section]}>
          <Text style={styles.sectionTitle}>GENERATE CODE</Text>
          {pairingCode ? (
            <View style={styles.codeDisplay}>
              <Text style={styles.codeText}>{pairingCode}</Text>
              <TouchableOpacity onPress={() => Clipboard.setString(pairingCode)}>
                <Ionicons name="copy" size={20} color={Theme.colors.primary} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.btnPrimary} onPress={generateCode}>
              <Text style={styles.btnText}>Get My Code</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <View style={[GlobalStyles.glassCard, styles.section]}>
          <Text style={styles.sectionTitle}>ENTER FRIEND'S CODE</Text>
          <TextInput 
            style={styles.input}
            placeholder="6-digit code"
            placeholderTextColor="#444"
            keyboardType="number-pad"
            maxLength={6}
            value={inputCode}
            onChangeText={setInputCode}
          />
          <TouchableOpacity 
            style={[styles.btnSecondary, { opacity: inputCode.length === 6 ? 1 : 0.5 }]} 
            onPress={handlePair}
            disabled={inputCode.length < 6}
          >
            <Text style={styles.btnText}>Start Escort</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 15, letterSpacing: 2 },
  content: { flex: 1, padding: 20 },
  infoBox: { alignItems: 'center', marginBottom: 40 },
  infoTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  infoText: { color: '#888', textAlign: 'center', marginTop: 10, lineHeight: 20 },
  section: { padding: 25, marginBottom: 20 },
  sectionTitle: { color: Theme.colors.primary, fontSize: 12, fontWeight: 'bold', letterSpacing: 2, marginBottom: 20 },
  codeDisplay: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#000', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: Theme.colors.primary },
  codeText: { color: '#FFF', fontSize: 32, fontWeight: 'bold', letterSpacing: 5 },
  btnPrimary: { backgroundColor: Theme.colors.primary, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  btnSecondary: { backgroundColor: Theme.colors.secondary, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  btnText: { color: '#000', fontWeight: 'bold', letterSpacing: 1 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#222' },
  orText: { color: '#444', marginHorizontal: 15, fontWeight: 'bold' },
  input: { backgroundColor: '#000', height: 60, borderRadius: 12, color: '#FFF', textAlign: 'center', fontSize: 24, letterSpacing: 10, marginBottom: 10, borderWidth: 1, borderColor: '#333' }
});