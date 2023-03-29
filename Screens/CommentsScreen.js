import React, { useEffect, useState } from "react";
import {View, Image, Text, StyleSheet, Pressable, SafeAreaView,
    FlatList, } from "react-native";



const Comments= ({ navigation, route })=> {
    let params = route.params
    const [image, setImage] = useState(params.params.file)
    const [posts, setPosts]=useState(params.params.posts)
    const postSearched = posts.find(item=>item.id===params.id)


    return (<View style={styles.container}>
        <Image style={styles.postImage} source={{uri: postSearched.file}}/>
        <SafeAreaView style={styles.postsList}>
      <FlatList
        data={postSearched.comments}
        renderItem={({ item }) => 
        <View style={styles.commentBox}>
            <View style={styles.commentTextWrapper}
            >
                <Text  style={styles.commentText}>{item.text}</Text>
                <Text  style={styles.commentDate}>{item.date}</Text>
            </View>
            <View style={styles.commentAvatar}>
            {image ? <Image style={styles.commentAvatar} source={{uri: image}}/>:  null}
            </View>
            
        </View>
        }
        keyExtractor={(item) => item.id}
      />
      </SafeAreaView>

    </View>)
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
    postImage:{
        width:343,
        height:240,
        borderRadius:8,
    },
    postsList:{
        width:'100%',
    },
    commentBox:{
        marginTop:24,
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       gap:16
    },
    commentTextWrapper:{
        backgroundColor:'rgba(0, 0, 0, 0.03)',
        borderRadius:6,
        padding:16,
        width:300,
    },
    commentText:{
        fontFamily: "Roboto-Regular",
        fontSize: 13,
        color: "#212121",
        fontWeight: 400,
        lineHeight: 18,
    },

    commentDate:{
        fontFamily: "Roboto-Regular",
        fontSize: 10,
        color: "#BDBDBD",
        fontWeight: 400,
        lineHeight: 12,
        textAlign: "right",
    },

    commentAvatar:{
        borderRadius:'50%',
        width:28,
        height:28,
        backgroundColor: "#BDBDBD",
    }
})
export default Comments;