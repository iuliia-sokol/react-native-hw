import React, { useEffect, useState } from "react"; 
import * as ImagePicker from 'expo-image-picker';

import { View, Text, StyleSheet } from "react-native";



const CreatePost=({ navigation, route })=> {
  const [image, setImage] = useState(null);

  const imageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // console.log(result);

    if (result.canceled) {
       return
    }
    setImage(result.assets[0].uri);  
  };

    return (
      <View style={styles.container}>
        <View style={styles.addImage}></View>
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      backgroundColor:"#ffffff",
      paddingHorizontal:16,
      paddingTop:32,
    },
    addImage:{

    }
  });

  export default CreatePost;