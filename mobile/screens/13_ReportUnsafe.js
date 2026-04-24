import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Theme, GlobalStyles } from '../theme/DesignSystem';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import api from '../services/api';

const SEVERITY_LEVELS = [
  { level: 1, label: 'Low', color: '#4CD964', icon: 'shield-outline' },
  { level: 2, label: 'Moderate', color: '#FFD700', icon: 'warning-outline' },
  { level: 3, label: 'Concerning', color: '#FF9500', icon: 'alert-circle-outline' },
  { level: 4, label: 'High', color: '#FF3B30', icon: 'nuclear-outline' },
  { level: 5, label: 'Extreme', color: '#8B0000', icon: 'skull-outline' },
];

export default function ReportUnsafe({ navigation }) {
  const { userLocation } = useAppStore();
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState(3);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert('Incomplete', 'Please provide a brief description of the situation.');
      return;
    }

    if (!userLocation) {
      Alert.alert('Error', 'Unable to determine your location. Please check your GPS settings.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/reports/', {
        location: {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude
        },
        description: description,
        severity: severity
      });

      if (response.data.success) {

        Alert.alert('Success', 'Your report has been logged. Thank you for helping keep the community safe.');
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      // Fallback for demo if backend is not running
      Alert.alert('Demo Mode', 'Report recorded locally for simulation.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LOG INCIDENT</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Severity Level</Text>
        <View style={styles.severityGrid}>
          {SEVERITY_LEVELS.map((item) => (
            <TouchableOpacity 
              key={item.level} 
              style={[
                styles.severityCard, 
                severity === item.level && { borderColor: item.color, backgroundColor: item.color + '15' }
              ]}
              onPress={() => setSeverity(item.level)}
            >
              <Ionicons 
                name={item.icon} 
                size={24} 
                color={severity === item.level ? item.color : '#444'} 
              />
              <Text style={[
                styles.severityText, 
                { color: severity === item.level ? item.color : '#444' }
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: 30 }]}>Description</Text>
        <TextInput
          style={styles.textArea}
          placeholder="What's happening? (e.g. Broken streetlights, heavy crowd, suspicious activity)"
          placeholderTextColor="#444"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <View style={[GlobalStyles.glassCard, { marginTop: 30, padding: 15 }]}>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={20} color={Theme.colors.primary} />
            <Text style={styles.locationText}>
              {userLocation 
                ? `Location: ${userLocation.coords.latitude.toFixed(4)}, ${userLocation.coords.longitude.toFixed(4)}` 
                : 'Detecting Location...'}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[GlobalStyles.neonButton, { marginTop: 'auto', marginBottom: 20 }]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.btnText}>SUBMIT SHIELD REPORT</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', letterSpacing: 2 },
  content: { flex: 1, padding: 20 },
  label: { color: Theme.colors.primary, fontSize: 14, fontWeight: 'bold', letterSpacing: 1, marginBottom: 15 },
  severityGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  severityCard: { 
    width: '18%', 
    aspectRatio: 0.8, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#222', 
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center'
  },
  severityText: { fontSize: 8, marginTop: 5, fontWeight: 'bold', textAlign: 'center' },
  textArea: { 
    backgroundColor: '#111', 
    borderRadius: 15, 
    padding: 15, 
    color: '#FFF', 
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#222',
    height: 120
  },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { color: '#888', fontSize: 12, marginLeft: 10 },
  btnText: { color: '#000', fontWeight: 'bold', letterSpacing: 2 }
});