import React, { useState } from "react";
import {ImageBackground, View, Image, Text, StyleSheet, Pressable, SafeAreaView,
  FlatList, } from "react-native";
import  Icon from "@expo/vector-icons/Feather";


const Profile= ({ navigation, route })=> {
  const params = route.params
  const [image, setImage] = useState(params.file)
  const [name,setName]= useState(params.login)
  const [posts,setPosts]=useState(params.posts)
   console.log('Chicago, IL, United States'.split(",")[0]);

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

            <SafeAreaView style={styles.postsList}>
      <FlatList
        data={posts}
        renderItem={({ item }) => 
        <View style={styles.postsListItem}>
            <Image style={styles.postImage} source={{uri: item.file}}/>
            <Text  style={styles.postText}>{item.text}</Text>
            <View style={styles.postDataWrapper}>
              <View style={styles.postDataAchievesWrapper}>
                <View style={styles.postDataCommentsWrapper}>
               {item.comments.length>0?  <Icon style={{transform:[matrix(-1, 0, 0, 1, 0, 0)]}} name='message-circle' size={24} color='#FF6C00' /> : <Icon name='message-circle' size={24} color='#BDBDBD' />}
                <Text  style={styles.postComments}>{item.comments.length?? item.comments.length }</Text>
                </View>
                <View style={styles.postDataCommentsWrapper}>
                {item.likes>0?  <Icon style={{transform:[matrix(-1, 0, 0, 1, 0, 0)]}} name='thumbs-up' size={24} color='#FF6C00' /> : <Icon name='thumbs-up' size={24} color='#BDBDBD' />}
                <Text  style={styles.postComments}>{item.likes?? item.likes }</Text>
                </View>
                </View>
                <View  style={styles.postLocationWrapper}>
                <Icon name='map-pin' size={24} color='#BDBDBD' />
                <Text  style={styles.postLocation}>{`${item.location}`.split(",")[0]}</Text>
                </View>
            </View>
        </View>
        }
        keyExtractor={(item) => item.id}
      />
      </SafeAreaView>
             
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
      maxHeight:"70%",
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
    postsList:{
    },
    postsListItem:{
        marginTop:32,
        display:'flex',
        flexDirection:'column',
        gap:8
    },
    postImage:{
        width:434,
        height:240,
    },
    postText:{
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        color: "#212121",
        fontWeight: 500,
        lineHeight: 19
    },
    postDataWrapper:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    postDataCommentsWrapper:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        gap:6
    },
    postComments:{
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: "#BDBDBD",
        fontWeight: 400,
        lineHeight: 19
    },
    postLocationWrapper:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        gap:6
    },  
    postLocation:{
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: "#212121",
        fontWeight: 400,
        lineHeight: 19,
        textDecorationLine: 'underline',
    },
    postDataAchievesWrapper:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      gap:24
    }
  });

  export default Profile;