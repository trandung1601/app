import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../../environments';
import {locationPermission} from '../helperFunction';

const Home = () => {
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  console.log(LATITUDE_DELTA);
  console.log(LONGITUDE_DELTA);

  useEffect(() => {
    getCurrentLocation();
  });

  const getCurrentLocation = async () => {
    const locationPermissionDenied = locationPermission();
  };

  const [state, setState] = useState({
    pickupCords: {
      latitude: 10.801107,
      longitude: 106.640881,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    droplocationCords: {
      latitude: 10.808298492927264,
      longitude: 106.70406518356003,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  });
  const {pickupCords, droplocationCords} = state;

  const mapRef = useRef();

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={pickupCords}>
        <Marker coordinate={pickupCords} />

        <Marker coordinate={droplocationCords} />

        <MapViewDirections
          origin={pickupCords}
          destination={droplocationCords}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="#1a73e8"
          optimizeWaypoints={true}
          onReady={result => {
            console.log(`Distance: ${result.distance} km`);
            console.log(`Duration: ${result.duration} min.`);

            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: width / 20,
                bottom: height / 20,
                left: width / 20,
                top: height / 20,
              },
            });
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
