import React, { useState } from "react";
import {ImageBackground, View, Image, Text, StyleSheet } from "react-native";

const Profile= ({ navigation, route })=> {
  const params = route.params
  const [image, setImage] = useState(params.file)
  const [name,setName]= useState(params.login)

    return (
      <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../assets/images/bg.jpg")}
      >
          <View
            style={styles.contentBox}
          >
          <View style={styles.avatarWrapper}>
              {image? <Image  style={styles.avatar} source={{uri: image}}/> : null}
    
          </View>
            <Text style={styles.title}>{name? name: 'Anonimous'}</Text>
  
        
          </View>
       
      </ImageBackground>
    </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#ecf0f1",
    },

    bgImage: {
      flex: 1,
      justifyContent: "flex-end",
    },
    contentBox: {
      justifyContent: "flex-start",
      backgroundColor: "#ffffff",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingTop: 32,
      paddingHorizontal: 16,
    },


    title: {
      fontFamily: "Roboto-Medium",
      fontSize: 30,
      color: "#212121",
      fontWeight: 500,
      lineHeight: 35,
      textAlign: "center",
      letterSpacing: 0.01,
      marginBottom: 32,
    },

    avatarWrapper:{
        position:'relative',
        alignSelf:'center',
        marginTop:-92,
        marginBottom:32,       
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
        width:120,
        height:120,
    },


    avatar:{
        borderRadius: 16,
        width:120,
        height:120,
    },

  });

  export default Profile;