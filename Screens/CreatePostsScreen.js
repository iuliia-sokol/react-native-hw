import React, { useEffect, useState } from "react"; 
import * as ImagePicker from 'expo-image-picker';

import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { imageHandler } from "../utils/imageHandler";

import CameraSVG from "../assets/images/camera.svg"

const CreatePost=({ navigation, route })=> {
  const [image, setImage] = useState(null);



    return (
      <View style={styles.container}>
        <View style={styles.addPostForm}>
        <View style={styles.addImage}>
        {image? 
        <Image  style={styles.picture} source={{uri: image}}/> : null}
        <Pressable
                    style={styles.addImageBtn} 
                    onPress={()=>imageHandler(setImage)}
                    accessibilityLabel={"Add picture"}
                  >
                   {/* <CameraSVG width={120} height={40}/> */}
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
      zIndex:10,
      width: 60,
      height: 60, 
      top:90,
      left:142,
      position:'absolute',
      borderRadius: '50%',
      backgroundColor:"rgba(255, 255, 255, 0.3)",
    },
    addImageBtnImage:{},
    picture:{
      width: 343,
      height: 240,
      backgroundColor:"#E8E8E8",
      borderRadius: 8,
    }
  });

  export default CreatePost;