import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { GlobalLayout } from '../components/Layout';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import coffeeIcon from '../assets/coffee.png';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [cafes, setCafes] = useState([]);

  const [isReady, setIsReady] = useState(false); // loading map

  useEffect(() => {
    (async () => {
      // permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get user's current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      const lat = currentLocation.coords.latitude;
      const lng = currentLocation.coords.longitude;
      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;
      const keyword = 'cafe';

      // Google Places API fetch
      // ref : https://docs.expo.dev/versions/latest/sdk/map-view/
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=cafe&keyword=${keyword}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
          setCafes(data.results);
          setIsReady(true); // get data -> loading : false
        } else {
          setErrorMsg('Failed to fetch cafes');
        }
      } catch (error) {
        setErrorMsg('Error fetching cafes: ' + error.message);
      }
    })();
  }, []);

  // loading
  if (!location || !isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <GlobalLayout>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="My Location"
            pinColor="blue"
          />

          {cafes.map((cafe) => (
            <Marker
              key={cafe.place_id}
              coordinate={{
                latitude: cafe.geometry.location.lat,
                longitude: cafe.geometry.location.lng,
              }}
              title={cafe.name}
              description={cafe.vicinity}
            >
              <Image
                source={coffeeIcon}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Marker>
          ))}
        </MapView>
      </View>
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});

export default MapScreen;
