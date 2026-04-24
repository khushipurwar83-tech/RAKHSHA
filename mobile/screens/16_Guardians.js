import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput, Modal, Alert, ActivityIndicator } from 'react-native';
import { Theme, GlobalStyles } from '../theme/DesignSystem';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function Guardians({ navigation }) {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchGuardians();
  }, []);

  const fetchGuardians = async () => {
    try {
      const response = await api.get('/users/guardians');
      setGuardians(response.data);
    } catch (error) {
      console.error(error);
      // Mock data for demo
      setGuardians([

        { id: '1', full_name: 'Rahul Kumar', phone_number: '+91 9876543210', relationship: 'Brother', is_active: true },
        { id: '2', full_name: 'Anjali Sharma', phone_number: '+91 8877665544', relationship: 'Friend', is_active: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGuardian = async () => {
    if (!newPhone || !newRelation) {
      Alert.alert('Missing Info', 'Please provide both phone number and relationship.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/users/guardians', {
        phone_number: newPhone,
        relationship: newRelation
      });
      setModalVisible(false);

      setNewPhone('');
      setNewRelation('');
      fetchGuardians();
      Alert.alert('Success', 'Guardian added successfully');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.detail || 'Failed to add guardian');
    } finally {
      setSubmitting(false);
    }
  };

  const removeGuardian = (id) => {
    Alert.alert(
      "Remove Guardian",
      "Are you sure you want to remove this contact from your emergency list?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: () => {
          setGuardians(guardians.filter(g => g.id !== id));
          // Call API here
        }}
      ]
    );
  };

  const renderGuardian = ({ item }) => (
    <View style={styles.guardianCard}>
      <View style={styles.guardianInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.full_name[0]}</Text>
        </View>
        <View>
          <Text style={styles.guardianName}>{item.full_name}</Text>
          <Text style={styles.guardianSub}>{item.relationship} • {item.phone_number}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeGuardian(item.id)}>
        <Ionicons name="trash-outline" size={20} color={Theme.colors.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>YOUR GUARDIANS</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={28} color={Theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.hint}>These contacts will be notified immediately when you trigger an SOS.</Text>
        
        {loading ? (
          <ActivityIndicator color={Theme.colors.primary} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={guardians}
            renderItem={renderGuardian}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="people-outline" size={80} color="#222" />
                <Text style={styles.emptyText}>No guardians added yet.</Text>
              </View>
            }
          />
        )}
      </View>

      {/* ADD MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Emergency Contact</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Relationship (e.g. Mother, Friend)"
              placeholderTextColor="#666"
              value={newRelation}
              onChangeText={setNewRelation}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#FFF' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[GlobalStyles.neonButton, { flex: 1, marginLeft: 10 }]} 
                onPress={handleAddGuardian}
                disabled={submitting}
              >
                {submitting ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>ADD</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', letterSpacing: 2 },
  content: { flex: 1, padding: 20 },
  hint: { color: '#666', fontSize: 12, marginBottom: 20, textAlign: 'center' },
  guardianCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#111', 
    padding: 15, 
    borderRadius: 20, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#222'
  },
  guardianInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: Theme.colors.primary + '20', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { color: Theme.colors.primary, fontWeight: 'bold', fontSize: 18 },
  guardianName: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  guardianSub: { color: '#666', fontSize: 12, marginTop: 2 },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#444', marginTop: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#1A1A1A', padding: 30, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  modalTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#000', padding: 15, borderRadius: 12, color: '#FFF', marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  modalButtons: { flexDirection: 'row', marginTop: 10 },
  cancelBtn: { padding: 15, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  btnText: { color: '#000', fontWeight: 'bold' }
});