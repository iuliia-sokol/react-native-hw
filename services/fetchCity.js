import Geocode from 'react-geocode';

import { REACT_APP_MAP_API_KEY } from "react-native-dotenv";

Geocode.setApiKey(REACT_APP_MAP_API_KEY);

export const getCity = async (lat, long) => {
    let city = {
      cityName: null,
      country: null,
    };
    try {
      const response = await Geocode.fromLatLng(`${lat}`, `${long}`);
      // const approximate = response.results.filter(
      //   res => res.geometry.location_type === 'APPROXIMATE'
      // );
  i
      // city.placeId = approximate[0].place_id;
  
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (
          let j = 0;
          j < response.results[0].address_components[i].types.length;
          j++
        ) {
          switch (response.results[0].address_components[i].types[j]) {
            case 'locality':
              city.cityName = response.results[0].address_components[i].long_name;
              break;
            case 'country':
              city.country = response.results[0].address_components[i].long_name;
              break;
            default:
          }
        }
      }
      // console.log(city);
      return city;
    } catch (error) {
      console.log(error);
    }
    return city;
  };
  