import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
import { Theme, GlobalStyles } from '../theme/DesignSystem';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function History({ navigation }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/reports/');
      setReports(response.data.reports || []);
    } catch (error) {
      console.error('History Fetch Error:', error);
      // Fallback mocks
      setReports([
        { id: '1', description: 'Suspicious individual following me', severity: 4, created_at: '2026-04-24T18:00:00Z', status: 'logged' },
        { id: '2', description: 'Street lights broken on Main St', severity: 2, created_at: '2026-04-24T12:30:00Z', status: 'noted' },
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchHistory();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={[styles.severityBar, { backgroundColor: item.severity > 3 ? Theme.colors.error : Theme.colors.primary }]} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.timeText}>{new Date(item.created_at).toLocaleString()}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status || 'Verified'}</Text>
          </View>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.footer}>
          <Ionicons name="location" size={14} color="#666" />
          <Text style={styles.footerText}>Logged at your location</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>INCIDENT LOG</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Theme.colors.primary} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="shield-checkmark" size={64} color="#222" />
              <Text style={styles.emptyText}>Your safety shield is clear.</Text>
              <Text style={styles.emptySub}>No recent incidents reported.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 15, letterSpacing: 2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 20 },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#1A1A1A', 
    borderRadius: 20, 
    marginBottom: 15, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222'
  },
  severityBar: { width: 6 },
  cardContent: { flex: 1, padding: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  timeText: { color: '#666', fontSize: 10, fontWeight: 'bold' },
  statusBadge: { backgroundColor: 'rgba(0, 240, 255, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusText: { color: Theme.colors.primary, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  description: { color: '#DDD', fontSize: 14, lineHeight: 20, marginBottom: 15 },
  footer: { flexDirection: 'row', alignItems: 'center' },
  footerText: { color: '#555', fontSize: 11, marginLeft: 5 },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#555', fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  emptySub: { color: '#333', fontSize: 14, marginTop: 5 }
});