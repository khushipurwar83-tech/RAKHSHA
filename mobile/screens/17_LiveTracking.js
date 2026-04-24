import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { locationTracker } from '../services/locationTracker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

export default function LiveTracking({ route }) {
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const userId = "user_123"; // This would come from auth

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let loc = await Location.getCurrentPositionAsync({});
        setCurrentLocation(loc.coords);
      }
    })();
  }, []);

  const toggleTracking = () => {
    if (isTracking) {
      locationTracker.stopLiveTracking();
    } else {
      locationTracker.startLiveTracking(userId);
    }
    setIsTracking(!isTracking);
  };

  const shareTrackingLink = async () => {
    try {
      const trackingUrl = `https://rakhsha-guardian.vercel.app/track/${userId}`;
      await Share.share({
        message: `I'm heading home. Track my live location here: ${trackingUrl}`,
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
        region={currentLocation ? {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        } : null}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="You are here" />
        )}
      </MapView>

      <View style={styles.panel}>
        <Text style={styles.status}>Status: {isTracking ? '📡 Live Tracking ON' : '⚪ Tracking OFF'}</Text>
        
        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: isTracking ? '#FF3B30' : '#4CD964'}]} 
          onPress={toggleTracking}
        >
          <Text style={styles.btnText}>{isTracking ? 'Stop Sharing' : 'Start Live Tracking'}</Text>
        </TouchableOpacity>

        {isTracking && (
          <TouchableOpacity style={[styles.btn, {backgroundColor: '#007AFF', marginTop: 10}]} onPress={shareTrackingLink}>
            <Text style={styles.btnText}>Share Tracking Link</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  panel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10 },
  status: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  btn: { padding: 16, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});