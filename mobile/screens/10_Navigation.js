import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, Vibration } from 'react-native';

import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Theme, GlobalStyles } from '../theme/DesignSystem';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import api from '../services/api';

const NavigationScreen = ({ navigation }) => {
  const { userLocation } = useAppStore();
  const [havens, setHavens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeviated, setIsDeviated] = useState(false);

  useEffect(() => {
    if (userLocation && havens.length > 0) {
      checkRouteDeviation();
    }
  }, [userLocation]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const checkRouteDeviation = () => {
    // Simulated check: compare user current location with the safe route points
    // For now, if user is > 100m from the nearest haven or route point
    const threshold = 100; // meters
    const dist = calculateDistance(
      userLocation.coords.latitude, 
      userLocation.coords.longitude,
      28.6139, 77.2090 // Mock route target
    );

    if (dist > threshold && !isDeviated) {
      setIsDeviated(true);
      fetchSafeHavens(); // Re-fetch safe havens (re-route)
      Vibration.vibrate(500);
    }
  };

  const fetchSafeHavens = async () => {

    try {
      const { latitude, longitude } = userLocation.coords;
      const response = await api.get(`/safe-havens/?lat=${latitude}&lng=${longitude}&radius=5000`);
      setHavens(response.data);
    } catch (error) {
      console.error('Safe Havens Fetch Error:', error);
      // Fallback mocks if API fails
      setHavens([
        { id: '1', name: "City Hospital", type: "hospital", location: { latitude: 28.6149, longitude: 77.2090 } },
        { id: '2', name: "Central Police Station", type: "police", location: { latitude: 28.6120, longitude: 77.2100 } },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'police': return 'shield-checkmark';
      case 'hospital': return 'medical';
      default: return 'location';
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={darkMapStyle}
        mapPadding={{ top: 120, bottom: 150, left: 10, right: 10 }} // Pushes UI elements out of the way
        initialRegion={{
          latitude: userLocation?.coords.latitude || 28.6139,
          longitude: userLocation?.coords.longitude || 77.2090,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >

        {userLocation && (
          <Marker coordinate={userLocation.coords}>
            <Ionicons name="navigate-circle" size={30} color={Theme.colors.primary} />
          </Marker>
        )}

        {havens.map(haven => (
          <Marker 
            key={haven.id} 
            coordinate={haven.location}
            title={haven.name}
          >
            <View style={styles.havenMarker}>
              <Ionicons name={getIcon(haven.type)} size={18} color="#000" />
            </View>
          </Marker>
        ))}
      </MapView>

      <SafeAreaView style={styles.headerOverlay}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.routeCard}>
            <Text style={styles.routeTitle}>SAFEST ROUTE CALIBRATED</Text>
            <Text style={styles.routeSubtitle}>ETA: 12 mins • {havens.length} Safe Havens nearby</Text>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.bottomZone}>
        <TouchableOpacity style={styles.sosCircle}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const darkMapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
  { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  map: { flex: 1 },
  headerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, padding: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  routeCard: { flex: 1, marginLeft: 15, backgroundColor: 'rgba(26,26,26,0.9)', padding: 15, borderRadius: 20, borderWidth: 1, borderColor: Theme.colors.primary },
  routeTitle: { color: Theme.colors.primary, fontWeight: 'bold', fontSize: 12, letterSpacing: 1 },
  routeSubtitle: { color: '#888', fontSize: 10, marginTop: 4 },
  havenMarker: { width: 30, height: 30, borderRadius: 15, backgroundColor: Theme.colors.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#000' },
  bottomZone: { position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center' },
  sosCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: Theme.colors.error, justifyContent: 'center', alignItems: 'center', elevation: 10, shadowColor: Theme.colors.error, shadowOpacity: 0.5, shadowRadius: 10 },
  sosText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 }
});

export default NavigationScreen;

