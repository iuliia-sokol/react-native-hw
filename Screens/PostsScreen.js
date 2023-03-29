import React, { useState } from "react";
import { 
    View,
    Image, 
    Text, 
    StyleSheet, 
    SafeAreaView,
    FlatList, 
} from "react-native";
import  Icon from "@expo/vector-icons/Feather";


  const Posts=({ navigation, route })=> {
    const params = route.params
    console.log(params);
    const [image, setImage] = useState(params.file)
    const [name,setName]= useState(params.login)
    const [email,setEmail]=useState(params.email)
    const [posts,setPosts]=useState(params.posts)

    
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

    <SafeAreaView style={styles.postsList}>
      <FlatList
        data={posts}
        renderItem={({ item }) => 
        <View style={styles.postsListItem}>
            <Image style={styles.postImage} source={{uri: item.file}}/>
            <Text  style={styles.postText}>{item.text}</Text>
            <View style={styles.postDataWrapper}>
                <View style={styles.postDataCommentsWrapper}>
                <Icon name='message-circle' size={24} color='#BDBDBD' />
                <Text  style={styles.postComments}>{item.comments.length}</Text>
                </View>
                <View  style={styles.postLocationWrapper}>
                <Icon name='map-pin' size={24} color='#BDBDBD' />
                <Text  style={styles.postLocation}>{item.location}</Text>
                </View>
            </View>
        </View>
        }
        keyExtractor={(item) => item.id}
      />
      </SafeAreaView>
       
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
    }


  });
  export default Posts;