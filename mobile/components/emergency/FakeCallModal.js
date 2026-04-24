import React from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text, Vibration } from 'react-native';
import { useSOSStore } from '../../store/useSOSStore';
import { Phone, PhoneOff } from 'lucide-react-native';

const FakeCallModal = () => {
  const { fakeCallActive, setFakeCall } = useSOSStore();

  const handleAccept = () => {
    // In a real app, this would play an audio file
    Vibration.cancel();
  };

  const handleDecline = () => {
    Vibration.cancel();
    setFakeCall(false);
  };

  if (!fakeCallActive) return null;

  return (
    <Modal visible={fakeCallActive} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <Text style={styles.callerName}>Mom</Text>
        <Text style={styles.callerStatus}>Mobile</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={handleDecline}>
            <PhoneOff color="white" size={32} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
            <Phone color="white" size={32} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    paddingTop: 100,
  },
  callerName: {
    color: 'white',
    fontSize: 48,
    fontWeight: '300',
    marginBottom: 10,
  },
  callerStatus: {
    color: '#888',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButton: {
    backgroundColor: '#FF3B30',
  },
  acceptButton: {
    backgroundColor: '#34C759',
  }
});

export default FakeCallModal;
