import React, { useState } from "react";
import {ImageBackground, View, Image, Text, StyleSheet, Pressable } from "react-native";
import  Icon from "@expo/vector-icons/Feather";


const Profile= ({ navigation, route })=> {
  const params = route.params
  const [image, setImage] = useState(params.file)
  const [name,setName]= useState(params.login)


  const handleLogout =()=>{
    alert("Exit")
    navigation.navigate('Login')
   }
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
            <Pressable
            style={styles.logoutBtn}
                onPress={handleLogout}
              >
                <Icon name='log-out' size={24} color='#BDBDBD'/>
              </Pressable>
            <View styles={styles.postsList}></View>
        
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
      position:'relative',
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
    logoutBtn:{
      position:'absolute',
      top:22,
      right:18,
    },
    postsList:{},
  });

  export default Profile;