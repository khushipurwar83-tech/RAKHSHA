import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_DEFAULT, Polyline, Marker } from 'react-native-maps';
import { mapCustomStyle } from '../../styles/theme'; // Placeholder for custom dark map style
import SafeHavenMarker from './SafeHavenMarker';
import { useLocation } from '../../hooks/useLocation';

const MapComponent = ({ routeCoordinates, safeHavens }) => {
  const { location } = useLocation();

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: location ? location.coords.latitude : 28.6139,
          longitude: location ? location.coords.longitude : 77.2090,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapCustomStyle}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
      >
        {/* Draw Route */}
        {routeCoordinates && routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#00F0FF" // Neon Blue for safe route
            strokeWidth={4}
          />
        )}

        {/* Draw Safe Havens */}
        {safeHavens && safeHavens.map((haven, idx) => (
          <SafeHavenMarker key={idx} haven={haven} />
        ))}
      </MapView>
    </View>
  );
};

const mapCustomStyle = [
  {
    "elementType": "geometry",
    "stylers": [{"color": "#212121"}]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{"visibility": "off"}]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#757575"}]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#212121"}]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{"color": "#383838"}]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#000000"}]
  }
];

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
