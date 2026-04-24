import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, SafeAreaView } from 'react-native';
import { audioService } from '../services/audioService';

export default function FakeCall() {
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCalling, setIsCalling] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timer !== null) {
      triggerCall();
      setTimer(null);
    }
    return () => clearInterval(interval);
  }, [timeLeft, timer]);

  const startTimer = (seconds) => {
    setTimer(seconds);
    setTimeLeft(seconds);
  };

  const triggerCall = () => {
    setIsCalling(true);
  };

  const answerCall = async () => {
    setIsAnswered(true);
    await audioService.playFakeConversation();
  };

  const endCall = async () => {
    setIsCalling(false);
    setIsAnswered(false);
    await audioService.stopAudio();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fake Call Simulator</Text>
      <Text style={styles.subtitle}>Use this to discreetly exit uncomfortable situations.</Text>

      <View style={styles.timerGrid}>
        {[10, 30, 60, 300].map(sec => (
          <TouchableOpacity key={sec} style={styles.timerBtn} onPress={() => startTimer(sec)}>
            <Text style={styles.timerText}>{sec < 60 ? `${sec}s` : `${sec/60}m`}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {timeLeft > 0 && (
        <Text style={styles.countdown}>Incoming call in: {timeLeft}s</Text>
      )}

      {/* Incoming Call Modal */}
      <Modal visible={isCalling} animationType="slide">
        <View style={styles.callContainer}>
          <View style={styles.callerInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>M</Text>
            </View>
            <Text style={styles.callerName}>Mom</Text>
            <Text style={styles.callStatus}>{isAnswered ? '00:05' : 'Mobile'}</Text>
          </View>

          {!isAnswered ? (
            <View style={styles.actions}>
              <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#FF3B30'}]} onPress={endCall}>
                <Text style={styles.btnIcon}>✖</Text>
                <Text style={styles.btnLabel}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#4CD964'}]} onPress={answerCall}>
                <Text style={styles.btnIcon}>📞</Text>
                <Text style={styles.btnLabel}>Accept</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actions}>
              <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#FF3B30', width: 80, height: 80}]} onPress={endCall}>
                 <Text style={styles.btnIcon}>✖</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', padding: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#00F0FF', marginTop: 40 },
  subtitle: { color: '#AAA', textAlign: 'center', marginVertical: 20 },
  timerGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15 },
  timerBtn: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center', borderWeight: 1, borderColor: '#333' },
  timerText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  countdown: { color: '#FF3B30', marginTop: 30, fontSize: 20, fontWeight: 'bold' },
  callContainer: { flex: 1, backgroundColor: '#1C1C1C', justifyContent: 'space-between', paddingVertical: 100, alignItems: 'center' },
  callerInfo: { alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  avatarText: { fontSize: 40, color: '#AAA' },
  callerName: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  callStatus: { fontSize: 18, color: '#AAA', marginTop: 10 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  actionBtn: { width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center' },
  btnIcon: { fontSize: 30, color: '#FFF' },
  btnLabel: { color: '#FFF', marginTop: 5, fontSize: 12 }
});