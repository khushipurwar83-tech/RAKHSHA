import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, SafeAreaView } from 'react-native';
import { locationTracker } from '../services/locationTracker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Theme, GlobalStyles } from '../theme/DesignSystem';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';

export default function LiveTracking({ navigation }) {
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const { userLocation } = useAppStore(); // Use the location from store if available

  useEffect(() => {
    if (userLocation) {
      setCurrentLocation(userLocation.coords);
    }
  }, [userLocation]);

  const toggleTracking = () => {
    if (isTracking) {
      locationTracker.stopLiveTracking();
    } else {
      // In a real app, get this from auth context/store
      const realUserId = "khushi_shield_001"; 
      locationTracker.startLiveTracking(realUserId);
    }
    setIsTracking(!isTracking);
  };

  const shareTrackingLink = async () => {
    try {
      const trackingUrl = `https://rakhsha-guardian.vercel.app/track/khushi_shield_001`;
      await Share.share({
        message: `🛡️ RAKHSHA LIVE: I'm heading home. Track my live location here: ${trackingUrl}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={darkMapStyle}
        region={currentLocation ? {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        } : {
          latitude: 28.6139,
          longitude: 77.2090,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation}>
            <View style={styles.userMarker}>
              <View style={styles.userPulse} />
              <Ionicons name="navigate" size={20} color={Theme.colors.primary} />
            </View>
          </Marker>
        )}
      </MapView>

      <SafeAreaView style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>SHIELD TRACKING</Text>
        </View>
      </SafeAreaView>

      <View style={styles.panel}>
        <View style={styles.statusRow}>
          <View style={[styles.indicator, { backgroundColor: isTracking ? Theme.colors.success : '#444' }]} />
          <Text style={styles.status}>
            {isTracking ? 'BROADCASTING LIVE' : 'TRACKING OFFLINE'}
          </Text>
        </View>
        
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={[styles.btn, { backgroundColor: isTracking ? Theme.colors.error : Theme.colors.primary }]} 
            onPress={toggleTracking}
          >
            <Ionicons name={isTracking ? "stop" : "play"} size={20} color="#000" />
            <Text style={styles.btnText}>{isTracking ? 'STOP BROADCAST' : 'START LIVE TRACK'}</Text>
          </TouchableOpacity>

          {isTracking && (
            <TouchableOpacity style={styles.shareBtn} onPress={shareTrackingLink}>
              <Ionicons name="share-social" size={20} color={Theme.colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const darkMapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  map: { flex: 1 },
  header: { position: 'absolute', top: 20, left: 20, right: 20, flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  headerInfo: { marginLeft: 15, backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: Theme.colors.primary },
  headerTitle: { color: Theme.colors.primary, fontWeight: 'bold', letterSpacing: 2, fontSize: 12 },
  panel: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: 'rgba(26,26,26,0.95)', padding: 25, borderRadius: 25, borderWeight: 1, borderColor: '#333' },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'center' },
  indicator: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  status: { color: '#FFF', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 },
  actionRow: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, height: 55, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 14, letterSpacing: 1 },
  shareBtn: { width: 55, height: 55, borderRadius: 15, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Theme.colors.primary },
  userMarker: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  userPulse: { position: 'absolute', width: 40, height: 40, borderRadius: 20, backgroundColor: Theme.colors.primary + '30', borderWidth: 1, borderColor: Theme.colors.primary }
});