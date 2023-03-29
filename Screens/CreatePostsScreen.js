import React, { useEffect, useState } from "react"; 
import  Icon from "@expo/vector-icons/Feather";
import { FontAwesome5 } from '@expo/vector-icons'; 

import {
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Pressable, 
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView, 
  Platform, 
  TextInput  } from "react-native";
import { imageHandler } from "../utils/imageHandler";



const CreatePost=({ navigation, route })=> {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('')
  const [location, setLocation] = useState('')
  const [disabled, setDisabled] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const textHandler = (text) =>{
    setText(text);
}
const locationHandler= (text) =>{
  setLocation(text);
}
  const handleKeyboard =()=>{
    Keyboard.dismiss()
    setShowKeyboard(false)
}

const handlePublishPost = (e)=>{
  e.preventDefault();
        const data = new FormData();
        data.append('text', text);
        data.append('location', location);
        data.append('file', image);
        console.log(JSON.stringify(data));
        setImage(null)
        setText("");
        setLocation("");
        navigation.navigate("Posts", {data})
}

useEffect(() => {
  if (text && location && image) {
    setDisabled(false);
  }
  if (!text || !location || !image) {
    setDisabled(true);
  }
}, [text, location, image]);



    return (
      <TouchableWithoutFeedback onPress={handleKeyboard}>
      <View style={styles.container}>
      <KeyboardAvoidingView
                behavior={Platform.OS == "ios" && "padding" }
              >
        <View style={{...styles.addPostForm, paddingBottom: showKeyboard && Platform.OS == "android" ? 32 : 270}}>
    
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
       {image? 
          <Pressable style={{alignSelf:'flex-start'}} onPress={()=>imageHandler(setImage)} accessibilityLabel={"Change picture"}>
                <Text style={styles.addImageText}>Change photo</Text>
          </Pressable> :
          <Pressable  style={{alignSelf:'flex-start'}} onPress={()=>imageHandler(setImage)} accessibilityLabel={"Add picture"}>
                <Text style={styles.addImageText}>Add photo</Text>
          </Pressable>    
                }

          <View style={styles.inputWrapper}>
                    <TextInput
                      value={text}
                      onChangeText={textHandler}
                      onFocus={() => {
                        setShowKeyboard(true);
                      }}
                      placeholder="Description..."
                      style={text? styles.input :  {...styles.input, fontFamily:'Roboto-Regular'}}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                  <Icon name='map-pin' size={24} color='#BDBDBD' />
                    <TextInput
                      value={location}
                      onChangeText={locationHandler}
                      onFocus={() => {
                        setShowKeyboard(true);
                      }}
                      placeholder="Location..."
                      style={{...styles.input, fontFamily:'Roboto-Regular'}}
                    />
                  </View>
                  <Pressable 
                   disabled={disabled} 
                   style={styles.addPostBtn} 
                   onPress={handlePublishPost} 
                   accessibilityLabel={"Publish post"}>
                    <Text style={styles.addPostBtnText}>Publish</Text>
                  </Pressable>
        </View>
        
        </KeyboardAvoidingView>
      </View>
      </TouchableWithoutFeedback>
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
    },
    addImageText:{
      alignSelf:'flex-start',
      marginTop:8,
      fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: "#BDBDBD",
        fontWeight: 400,
        lineHeight: 19,
        textAlign: "left",
    },
    inputWrapper:{
      marginTop:32,      
      alignSelf:'flex-start',
      width:'100%',
      height:50,
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      gap:4,
      borderBottomColor:'#E8E8E8',
      borderBottomWidth:1,
    },
    input:{
      fontFamily: "Roboto-Medium",
      fontSize: 16,
      color: "#212121",
      fontWeight: 500,
      lineHeight: 19,
      textAlign: "left",
    },
    addPostBtn:{
      marginTop:32,   
      width:'100%',
      backgroundColor: "#FF6C00",
      borderRadius: 100,
      padding: 16,
    },
    addPostBtnText:{
      fontFamily: "Roboto-Regular",
      textAlign: "center",
      color: "#ffffff",
      fontSize:16,
      lineHeight:19,
    }
  });

  export default CreatePost;