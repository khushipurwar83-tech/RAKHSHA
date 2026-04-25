import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Theme, GlobalStyles } from '../theme/DesignSystem';
import SOSButton from '../components/emergency/SOSButton';
import { Ionicons } from '@expo/vector-icons';

import { useAppStore } from '../store/useAppStore';

export default function Home({ navigation }) {
  const { isOffline } = useAppStore();

  const QuickActions = [
    { id: '1', title: 'Safe Route', icon: 'navigate', screen: 'Navigation', color: Theme.colors.primary },
    { id: '2', title: 'Heatmap', icon: 'map', screen: 'Heatmap', color: '#FFD700' },
    { id: '3', title: 'Fake Call', icon: 'call', screen: 'FakeCall', color: Theme.colors.success },
    { id: '4', title: 'Live Track', icon: 'share-social', screen: 'LiveTracking', color: Theme.colors.secondary },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Khushi</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: isOffline ? Theme.colors.error : Theme.colors.success }]} />
            <Text style={styles.status}>Shield: {isOffline ? 'Offline Mode' : 'Secured'}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileCircle}>
            <Ionicons name="person" size={24} color={Theme.colors.primary} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SOS SECTION */}
        <View style={styles.sosCard}>
          <Text style={styles.sosTitle}>EMERGENCY OVERRIDE</Text>
          <SOSButton onTrigger={() => navigation.navigate('SOSPanel')} />
          <Text style={styles.sosHint}>Tap and hold to alert authorities</Text>
        </View>


        {/* QUICK ACTIONS GRID */}
        <Text style={styles.sectionTitle}>Shield Tools</Text>
        <View style={styles.grid}>
          {QuickActions.map(action => (
            <TouchableOpacity 
              key={action.id} 
              style={styles.actionCard} 
              onPress={() => navigation.navigate(action.screen)}
            >
              <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
                <Ionicons name={action.icon} size={28} color={action.color} />
              </View>
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RECENT REPORTS CARD */}
        <TouchableOpacity 
          style={[GlobalStyles.glassCard, { marginTop: 20 }]}
          onPress={() => navigation.navigate('History')}
        >
          <View style={styles.row}>
            <Ionicons name="alert-circle" size={24} color={Theme.colors.error} />
            <Text style={styles.cardTitle}>Unsafe Area Alert</Text>
          </View>
          <Text style={styles.cardDesc}>Heavy crowd reported near Sector 62. Tap to view full incident log.</Text>
        </TouchableOpacity>

        
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 10 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  status: { color: '#AAA', fontSize: 12, fontWeight: '600' },
  sosCard: { margin: 20, padding: 30, borderRadius: 30, backgroundColor: '#111', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  sosTitle: { color: Theme.colors.error, fontWeight: 'bold', letterSpacing: 3, marginBottom: 10 },
  sosHint: { color: '#444', fontSize: 12, marginTop: 10 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'space-between' },
  actionCard: { width: '45%', backgroundColor: Theme.colors.surface, margin: '2.5%', padding: 20, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: Theme.colors.border },
  iconContainer: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  actionText: { color: '#FFF', fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  cardDesc: { color: '#AAA', fontSize: 14, lineHeight: 20 }
});
