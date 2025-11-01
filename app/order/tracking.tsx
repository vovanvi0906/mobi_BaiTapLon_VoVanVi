// app/order/tracking.tsx
import COLORS from '@/constants/colors';
import { driverInfo } from '@/constants/dummyData';
import { RootState } from '@/redux/store';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

export default function OrderTrackingScreen() {
  const router = useRouter();
  const selectedAddress = useSelector((state: RootState) => state.user.selectedAddress);
  
  // Simulated driver location
  const [driverLocation, setDriverLocation] = useState({
    latitude: 10.7869,
    longitude: 106.6950,
  });

  const deliveryLocation = {
    latitude: selectedAddress?.lat || 10.7769,
    longitude: selectedAddress?.lng || 106.7009,
  };

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => ({
        latitude: prev.latitude + (Math.random() - 0.5) * 0.001,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderMap = () => (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: (driverLocation.latitude + deliveryLocation.latitude) / 2,
        longitude: (driverLocation.longitude + deliveryLocation.longitude) / 2,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
    >
      {/* Driver Marker */}
      <Marker coordinate={driverLocation}>
        <View style={styles.driverMarker}>
          <Ionicons name="bicycle" size={24} color="#fff" />
        </View>
      </Marker>

      {/* Delivery Location Marker */}
      <Marker coordinate={deliveryLocation}>
        <View style={styles.homeMarker}>
          <Ionicons name="home" size={24} color={COLORS.primary} />
        </View>
      </Marker>

      {/* Route Line */}
      <Polyline
        coordinates={[driverLocation, deliveryLocation]}
        strokeColor={COLORS.primary}
        strokeWidth={4}
        lineDashPattern={[1]}
      />

      {/* Restaurant Marker */}
      <Marker
        coordinate={{
          latitude: 10.7831,
          longitude: 106.6897,
        }}
      >
        <View style={styles.restaurantMarker}>
          <Ionicons name="restaurant" size={20} color={COLORS.secondary} />
        </View>
      </Marker>
    </MapView>
  );

  const renderDeliveryInfo = () => (
    <View style={styles.infoContainer}>
      <View style={styles.deliveryTimeContainer}>
        <Ionicons name="time-outline" size={24} color={COLORS.primary} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.deliveryTimeLabel}>Delivery time</Text>
          <Text style={styles.deliveryTime}>15-20 mins</Text>
        </View>
      </View>

      <View style={styles.addressContainer}>
        <Ionicons name="location-outline" size={24} color={COLORS.primary} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.addressLabel}>Delivery Address</Text>
          <Text style={styles.address}>
            {selectedAddress?.address || '201 Katlian No.21 Street'}
          </Text>
        </View>
      </View>

      <View style={styles.driverContainer}>
        <View style={styles.driverAvatar}>
          <Text style={styles.driverAvatarText}>
            {driverInfo.name.charAt(0)}
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.driverName}>{driverInfo.name}</Text>
          <Text style={styles.driverRole}>{driverInfo.role}</Text>
        </View>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => {}}
        >
          <Ionicons name="call" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => router.push(`/chat/${driverInfo.id}`)}
        >
          <Ionicons name="chatbubble-ellipses" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderMap()}
      {renderDeliveryInfo()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  driverMarker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  homeMarker: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  restaurantMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },
  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  deliveryTimeLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  addressLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  driverRole: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  contactButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});