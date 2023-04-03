import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  ImageBackground, 
  View, 
  Image, 
  Text, 
  StyleSheet, 
  Pressable, 
  SafeAreaView,
  FlatList, 
} from "react-native";
import  Icon from "@expo/vector-icons/Feather";
import { getAvatar, getName } from "../redux/auth/authSelectors";
import { addLike, getPosts, removeLike } from "../redux/dashboard/dbOperations";
import { signOut } from "../redux/auth/authOperations";

const Profile= ({ navigation, route })=> {
  const dispatch = useDispatch()
  const image = useSelector(getAvatar)
  const name = useSelector(getName)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if(setPosts){
    dispatch(getPosts(setPosts))}
  }, [setPosts]);

  const handleLogout =()=>{
    dispatch(signOut())
   }

   const handleLike = (postId, liked) =>{
    if(!liked)
    {dispatch(addLike({postId:postId}))}
    if(liked)
    {dispatch(removeLike({postId:postId}))}
   }

   const handleLocation = (coordinates,text,location)=> {
    navigation.navigate('Map',
       {coordinates, text, location},
     );
   }

   const handleComment = (image, comments,postId) =>{
    navigation.navigate('Comment',
       {image, comments, postId},
     );
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

       {posts &&  posts.length>0 &&
       <SafeAreaView style={styles.postsList}>
      <FlatList
              ListEmptyComponent={() => (posts.length <=0 ? 
                <View style={styles.emptyMessageBox}> 
                    <Text style={styles.emptyMessageStyle}>No posts added yet...</Text> 
                </View>
            
            : null)
          }
        data={posts}
        renderItem={({ item }) => 
        <View style={styles.postsListItem}>
            <Image style={styles.postImage} source={{uri: item.image}}/>
            <Text  style={styles.postText}>{item.text}</Text>
            <View style={styles.postDataWrapper}>
              <View style={styles.postDataAchievesWrapper}>
              <Pressable onPress={()=>{handleComment(item.image, item.comments, item.postId)}}>
                <View style={styles.postDataCommentsWrapper}>
                <Icon  name='message-circle' size={24} color={item.comments.length>0? '#FF6C00': '#BDBDBD'} />  
                <Text  style={styles.postComments}>{item.comments.length?? item.comments.length }</Text>
                </View>
                </Pressable>
                <Pressable onPress={()=>{handleLike(item.postId, item.liked)}}>
                <View style={styles.postDataCommentsWrapper}>
                 <Icon name='thumbs-up' size={24} color={item.liked?'#FF6C00':'#BDBDBD' } /> 
                <Text  style={styles.postComments}>{item.likes? item.likes:0 }</Text>
                </View>
                </Pressable>
                </View>
                <Pressable onPress={()=>{handleLocation(item.coordinates,item.text,item.location)}}>
                <View  style={styles.postLocationWrapper}>
                <Icon name='map-pin' size={24} color='#BDBDBD' />
                <Text  style={styles.postLocation}>{`${item.location}`.split(",")[0]}</Text>
                </View>
                </Pressable>
            </View>
        </View>
        }
        keyExtractor={(item) => item.postId}
      />
      </SafeAreaView>}
             
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
      paddingBottom:153
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
        marginBottom: 32,
        display:'flex',
        flexDirection:'column',
        gap:8
    },
    postImage:{
        width:'100%',
        height:240,
        borderRadius:8,
        alignSelf:'center'
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
        color: "#212121",
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