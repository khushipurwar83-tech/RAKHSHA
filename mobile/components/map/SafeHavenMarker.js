import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { Shield, Cross, ShoppingCart } from 'lucide-react-native';

const SafeHavenMarker = ({ haven }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'police': return <Shield color="#00F0FF" size={24} />;
      case 'hospital': return <Cross color="#FF3B30" size={24} />;
      case '24x7_shop': return <ShoppingCart color="#FFD60A" size={24} />;
      default: return <Shield color="#00F0FF" size={24} />;
    }
  };

  return (
    <Marker
      coordinate={{ latitude: haven.lat, longitude: haven.lng }}
      title={haven.name}
      description={haven.type}
    >
      <View style={styles.markerContainer}>
        {getIcon(haven.type)}
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  }
});

export default SafeHavenMarker;
