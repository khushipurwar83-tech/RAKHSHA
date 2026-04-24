import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapComponent from '../components/map/MapView';
import SOSButton from '../components/emergency/SOSButton';
import EmergencyFAB from '../components/emergency/EmergencyFAB';
import { ArrowLeft, Navigation as NavIcon } from 'lucide-react-native';

const NavigationScreen = ({ navigation }) => {
  // Mock data for hackathon presentation
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const safeHavens = [
    { name: "City Hospital", type: "hospital", lat: 28.6149, lng: 77.2090 },
    { name: "Central Police Station", type: "police", lat: 28.6120, lng: 77.2100 },
  ];

  return (
    <View style={styles.container}>
      {/* Background Map */}
      <MapComponent routeCoordinates={routeCoordinates} safeHavens={safeHavens} />

      {/* Header Overlay */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <View style={styles.routeInfoCard}>
          <Text style={styles.routeTitle}>Safest Route Active</Text>
          <Text style={styles.routeSubtitle}>ETA: 12 mins • 95% Safety Score</Text>
        </View>
      </SafeAreaView>

      {/* Bottom Emergency Zone (Thumb Zone) */}
      <View style={styles.bottomZone}>
        <SOSButton />
      </View>
      
      {/* Floating Action Button for other emergencies */}
      {/* <EmergencyFAB /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    zIndex: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  routeInfoCard: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 10, 0.85)',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00F0FF',
  },
  routeTitle: {
    color: '#00F0FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  routeSubtitle: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  bottomZone: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    zIndex: 20,
  }
});

export default NavigationScreen;
