import React, { useEffect, useState } from "react";
import {
    View, 
    Image, 
    Text, 
    StyleSheet, 
    Pressable, 
    SafeAreaView, 
    TextInput,
    FlatList,
    Keyboard,
    TouchableWithoutFeedback,
    Platform, 
    KeyboardAvoidingView
} from "react-native";
import uuid from 'react-native-uuid';
import { AntDesign } from '@expo/vector-icons'; 


const Comments= ({ navigation, route })=> {
    let params = route.params
    const [image, setImage] = useState(params.params.file)
    const [posts, setPosts]=useState(params.params.posts)
    const [disabled, setDisabled] = useState(true);
    const postSearched = posts.find(item=>item.id===params.id)

    const [text, setText] = useState('')

    const [comments, setComments] = useState([])
    const [showKeyboard, setShowKeyboard] = useState(false);


    useEffect(()=>{
        if(postSearched){
     setComments(postSearched.comments)
        }
       
    },[postSearched.comments])

    useEffect(()=>{
        if(text){
     setDisabled(false)
        }
        else { setDisabled(true)}
    },[text])

    const textHandler = (text) =>{
        setText(text);
    }

    const handleKeyboard =()=>{
        Keyboard.dismiss()
        setShowKeyboard(false)
    }

    const handlePublishComment = (e)=>{
        e.preventDefault();
              const data = new FormData();
              data.append('text', text);
              data.append('date',  Date.now());
              setText("");
              setComments(postSearched.comments.unshift({
                id: uuid.v4(),
                date: Date.now(),
                text:text
              }))

              handleKeyboard()
              navigation.setParams(params.posts)
      }

    return ( 
    <View style={styles.container} >
        <KeyboardAvoidingView
        keyboardVerticalOffset={40}
        behavior='position'              >
       <TouchableWithoutFeedback onPress={handleKeyboard}>
        <View style={styles.imageWrapper}>
        <Image style={styles.postImage} source={{uri: postSearched.file}}/>
        </View>
        </TouchableWithoutFeedback>
        
        <View style={styles.dataWrapper}>

        <SafeAreaView  style={styles.postsList}>
        <FlatList
               ListEmptyComponent={() => (postSearched.comments.length <=0 ? 
                <View style={styles.emptyMessageBox}> 
                    <Text style={styles.emptyMessageStyle}>No comments added yet...</Text> 
                </View>
            
            : null)
          }
        data={postSearched.comments}
        renderItem={({ item }) => 
        <TouchableWithoutFeedback onPress={handleKeyboard}>
        <View style={styles.commentBox}>
            <View style={styles.commentTextWrapper}
            >
                <Text  style={styles.commentText}>{item.text}</Text>
                <Text  style={styles.commentDate}>{new Date(item.date).toDateString()}</Text>
            </View>
            <View style={styles.commentAvatar}>
            {image ? <Image style={styles.commentAvatar} source={{uri: image}}/>:  null}
            </View>
            
        </View>
        </TouchableWithoutFeedback>
        }
        keyExtractor={(item) => item.id}
      />
      </SafeAreaView>

        <View style={{...styles.commentInputWrapper, paddingBottom: showKeyboard && Platform.OS == "android" ? 32 :16}}>
        <TextInput style={text? {...styles.commentInput, color:'#212121'}: styles.commentInput}
         value={text}
         multiline
         autoFocus={false}
         selectionColor='#FF6C00'
         blurOnSubmit={true}
         placeholderTextColor='#BDBDBD'
         onChangeText={textHandler}
         onFocus={() => {
           setShowKeyboard(true);
         }}
         onBlur={() => {
            setShowKeyboard(false);
          }}
         placeholder="Comment...">

        </TextInput>
        <Pressable style={{...styles.addCommentBtn, opacity: disabled? 0.5:1}} onPress={handlePublishComment} disabled={disabled}>
        <AntDesign name="arrowup" size={20} color="#ffffff" />
        </Pressable>
      </View>


      </View>
     
      </KeyboardAvoidingView>
    </View>
 
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display:'flex',
      flexDirection:'column',
      backgroundColor:"#ffffff",
      paddingHorizontal:16,
      paddingTop:32,
      paddingBottom:16
    },
    dataWrapper:{
},
    imageWrapper:{
    alignItems: "center",
    },
    postImage:{
        width:343,
        height:240,
        borderRadius:8,
    },
    postsList:{
        marginTop:24,
        maxHeight:'60%',
        minHeight:'60%',
        width:'100%',
    },
    commentBox:{
       marginBottom:24,
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
        borderRadius: '50%',
        width:28,
        height:28,
        backgroundColor: "#BDBDBD",
    },
    commentInputWrapper: {
        position:'relative',
        alignSelf:'flex-end',
        width:'100%',
        marginTop:32
    },
    commentInput:{
        width:'100%',
        paddingLeft:16,
        paddingRight:50,
        paddingTop:16,
        height:50,
        backgroundColor:'#F6F6F6',
        borderRadius:100,
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        color: "#BDBDBD",
        fontWeight: 500,
        lineHeight: 19,
        textAlignVertical: 'center'
    },
    addCommentBtn:{
        position:'absolute',
        top:8,
        right:8,
        width:34,
        height:34,
        borderRadius:"50%",
        backgroundColor:'#FF6C00',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    emptyMessageBox:{
        marginTop:24,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    emptyMessageStyle:{
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        color: "#212121",
        fontWeight: 500,
        lineHeight: 19,
        textAlign: "center",
    }
})
export default Comments;