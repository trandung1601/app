import Geolocation from '@react-native-community/geolocation';

export const locationPermission = () => {
  Geolocation.getCurrentPosition(position => console.log(position));
};
