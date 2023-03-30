import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const Map = ({ navigation, route }) => {
  let params = route.params
  
  const [posts, setPosts]=useState(params.params.posts)
  const [location, setLocation] = useState(null);
  const postSearched = posts.find(item=>item.id===params.id)

  // console.log(postSearched);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  return (
   postSearched.coordinates.latitude &&  postSearched.coordinates.longitude ? 
   (<View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...postSearched.coordinates,
        }}
        showsUserLocation={true}
      >
         {postSearched && (
          <Marker title={postSearched.text} coordinate={postSearched.coordinates} description={postSearched.location?? postSearched.location} />
        )}
      </MapView>
    </View>)
   : 
 ( <MapView
  style={styles.mapStyle}
  region={{
    ...location,
  }}
  showsUserLocation={true}
>
  {location && (
    <Marker title="You are here" coordinate={location} description="Your current location" />
  )} 
</MapView>)
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;