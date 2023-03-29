import React, { useEffect, useState } from "react"; 
import * as ImagePicker from 'expo-image-picker';

import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { imageHandler } from "../utils/imageHandler";

import { FontAwesome5 } from '@expo/vector-icons'; 

const CreatePost=({ navigation, route })=> {
  const [image, setImage] = useState(null);



    return (
      <View style={styles.container}>
        <View style={styles.addPostForm}>
        <View style={styles.addImage}>
        {image? 
        <Image  style={styles.picture} source={{uri: image}}/> : null}
        <Pressable
                    style={image? {...styles.addImageBtn, backgroundColor:'rgba(255, 255, 255, 0.3)'} : styles.addImageBtn} 
                    onPress={()=>imageHandler(setImage)}
                    accessibilityLabel={"Add picture"}
                  >
                  <FontAwesome5 name="camera" size={20} color={image?"#FFFFFF":"#BDBDBD"} style={styles.addImageBtnIcon} />
                  </Pressable>
        </View>
        </View>
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor:"#ffffff",
      paddingHorizontal:16,
      paddingTop:32,
    },
    addPostForm:{
      alignItems:'center',
      justifyContent:'center'
    },
    addImage:{
      position:'relative',
      width: 343,
      height: 240,
      backgroundColor:"#E8E8E8",
      borderRadius: 8,
    },
    addImageBtn:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      zIndex:10,
      width: 60,
      height: 60, 
      top:90,
      left:142,
      position:'absolute',
      borderRadius: '50%',
      backgroundColor:"rgba(255, 255, 255, 0.3)",
    },
    addImageBtnIcon:{
    },
    picture:{
      width: 343,
      height: 240,
      backgroundColor:"#E8E8E8",
      borderRadius: 8,
    }
  });

  export default CreatePost;