import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Heatmap as MapHeatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import { heatmapService } from '../services/heatmapService';

export default function HeatmapScreen() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeatmap();
  }, []);

  const fetchHeatmap = async () => {
    const data = await heatmapService.getHeatmapData();
    // Convert to the format react-native-maps Heatmap expects
    const formattedPoints = data.map(p => ({
      latitude: p.latitude,
      longitude: p.longitude,
      weight: p.weight * 10 // scale weight for better visibility
    }));
    setPoints(formattedPoints);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00F0FF" />
        <Text style={{color: '#FFF', marginTop: 10}}>Loading Safety Heatmap...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.2090,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        customMapStyle={darkMapStyle}
      >
        {points.length > 0 && (
          <MapHeatmap
            points={points}
            radius={40}
            opacity={0.7}
            gradient={{
              colors: ["#00FF00", "#FFFF00", "#FF0000"],
              startPoints: [0.1, 0.5, 0.9],
              colorMapSize: 256,
            }}
          />
        )}
      </MapView>
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Crime Intensity</Text>
        <View style={styles.gradientBar} />
        <View style={styles.legendLabels}>
          <Text style={styles.labelText}>Low</Text>
          <Text style={styles.labelText}>High</Text>
        </View>
      </View>
    </View>
  );
}

const darkMapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
  { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#181818" }] },
  { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }
];

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loading: { flex: 1, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center' },
  legend: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.8)', padding: 15, borderRadius: 10 },
  legendTitle: { color: '#FFF', fontWeight: 'bold', marginBottom: 5 },
  gradientBar: { height: 10, borderRadius: 5, backgroundColor: 'red', width: '100%', 
    backgroundGradient: {
      colors: ["#00FF00", "#FFFF00", "#FF0000"],
    }
  },
  legendLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  labelText: { color: '#AAA', fontSize: 12 }
});