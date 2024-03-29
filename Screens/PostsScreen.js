import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
    View,
    Image, 
    Text, 
    StyleSheet, 
    SafeAreaView,
    FlatList,
    Pressable,
} from "react-native";
import  Icon from "@expo/vector-icons/Feather";

import { getAvatar, getEmail, getName } from "../redux/auth/authSelectors";
import { getPosts } from "../redux/dashboard/dbOperations";


  const Posts=({ navigation, route })=> {
    const dispatch = useDispatch()   
    const image = useSelector(getAvatar)
    const name = useSelector(getName)
    const email = useSelector(getEmail)

    const [posts, setPosts] = useState([])


      useEffect(() => {
        if(setPosts){
        dispatch(getPosts(setPosts))}
      }, [setPosts]);

    const handleComment = (image, comments,postId) =>{
        navigation.navigate('Comment',
           {image, comments, postId},
         );
       }

       const handleLocation = (coordinates,text,location)=> {
        navigation.navigate('Map',
           {coordinates, text, location},
         );
       }

    return (
      <View style={styles.container}>
       <View style={styles.userData}>

        <View style={styles.avatar}>
       {image? <Image  style={styles.avatar} source={{uri: image}}/> : null}
       </View>
       <View>
        <Text style={styles.name}>
            {name? name : 'Anonymous'}
        </Text>
        <Text style={styles.email}>
            {email? email : 'Anonymous'}
        </Text>
       </View>
       </View>
<View style={styles.postsList}>
   <SafeAreaView >
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
                
                <Pressable onPress={()=> {handleComment(item.image, item.comments, item.postId)}}>
                <View style={styles.postDataCommentsWrapper}> 
                <Icon name='message-circle' size={24} color='#BDBDBD' />
                <Text  style={styles.postComments}>{item.comments.length?? item.comments.length }</Text>
                </View>
                </Pressable>
                <Pressable onPress={()=> {handleLocation(item.coordinates,item.text,item.location)}}>
                <View  style={styles.postLocationWrapper}>
                <Icon name='map-pin' size={24} color='#BDBDBD' />
                <Text  style={styles.postLocation}>{item.location}</Text>
                </View>
                </Pressable>
            </View>
        </View>
        }
        keyExtractor={(item) => item.postId}
      />
      </SafeAreaView>
      </View>
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
    userData:{
        display:'flex',
        flexDirection:'row',
        gap:8,
        justifyContent:'center',
        alignItems:'center',
    },
    avatar:{
        width:60,
        height:60,
        borderRadius:16,
        backgroundColor:'#E8E8E8',
    },
 
    name:{ 
        fontFamily: "Roboto-Bold",
        fontSize: 13,
        color: "#212121",
        fontWeight: 700,
        lineHeight: 15,
        textAlign: "center",
    },
    email:{ 
        fontFamily: "Roboto-Regular",
        fontSize: 11,
        color: "#212121",
        fontWeight: 400,
        lineHeight: 13,
        textAlign: "center",
    },
    postsList:{
      width:'100%',
      marginTop:32,
     paddingBottom:50
    },
    postsListItem:{
        marginBottom:32,
        display:'flex',
        flexDirection:'column',
        gap:8
    },
    postImage:{
        width:'100%',
        height:240,
        borderRadius:8
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
    }
  });
  export default Posts;