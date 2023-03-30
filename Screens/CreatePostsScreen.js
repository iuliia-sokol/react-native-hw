import React, { useEffect, useState } from "react"; 
import * as Location from 'expo-location';
import uuid from 'react-native-uuid';
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
  Alert,
  TextInput,
  } from "react-native";
import { imageHandler } from "../utils/imageHandler";
import { getCity } from "../services/fetchCity";


const CreatePost=({ navigation, route })=> {
  const params = route.params
  // console.log(params);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('')
  const [location, setLocation] = useState({latitude:'', longitude:''})
  const [getLocationPressed, setGetLocationPressed] = useState(false)
  const [place, setPlace]= useState('')
  const [errorMsg, setErrorMsg] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [disableClear, setDisableClear]=useState(true);
  const [posts, setPosts] =useState(params.posts);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const textHandler = (text) =>{
    setText(text);
}
  const locationHandler= (text) =>{
    setPlace(text);
}

  const handleKeyboard =()=>{
    Keyboard.dismiss()
    setShowKeyboard(false)
}

  const resetForm = () =>{
    setImage(null)
    setText("");
    setLocation({latitude:'', longitude:''});
    setGetLocationPressed(false)
    setPlace('')
  }

  const handlePublishPost = (e)=>{
    e.preventDefault();

  if(!location.latitude || !location.longitude) {
    getLocation()
  }
  if(location.latitude && location.longitude)  { 
      const data = new FormData();
      data.append('text', text);
      data.append('location', location);
      data.append('file', image);
        resetForm()
        setPosts(posts.unshift({
          id: uuid.v4(),
          comments:[],
          likes:0,
          file:image,
          location: place,
          coordinates: {...location},
          text:text
        }))
        // console.log(data);
        navigation.navigate("Posts", {data})}
}


  const handleDeletePost =(e)=>{
    e.preventDefault();
    resetForm()
    Alert.alert("Data deleted")
  }

  const getLocation = ()=>{
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let {coords} = await Location.getCurrentPositionAsync({});
      setLocation({latitude: coords.latitude, longitude: coords.longitude});
    })();
  }

  useEffect(() => {
    if (text && place && image) {
      setDisabled(false);
    }
    if (!text || !place || !image) {
      setDisabled(true);
      setDisableClear(true);
    }
    if (text || place || image) {
      setDisableClear(false);
    }
  }, [text, place, image]);


    useEffect(() => {
      if (getLocationPressed && location.latitude && location.longitude) {
        const fetchData = async () => {    
          const data = await getCity(location.latitude, location.longitude)
          setPlace(`${data.cityName}, ${data.country}`);
        }
      fetchData()  
          .catch(console.error);
      }
    }, [location.latitude, location.longitude, getLocationPressed]);


    useEffect(() => {
      navigation.setOptions({
        posts: posts,
      });
    }, [navigation, posts]);



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
                      selectionColor='#FF6C00'
                      onChangeText={textHandler}
                      onFocus={() => {
                        setShowKeyboard(true);
                      }}
                      placeholder="Description..."
                      style={text? styles.input :  {...styles.input, fontFamily:'Roboto-Regular'}}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                  <Pressable onPress={()=> {setGetLocationPressed(true)
                    getLocation()}} >
                    <Icon name='map-pin' size={24} color='#BDBDBD' />
                  </Pressable>
                    <TextInput
                      value={place}
                      selectionColor='#FF6C00'r
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
                   style={disabled? {...styles.addPostBtn, backgroundColor:'#F6F6F6'}: styles.addPostBtn}
                   onPress={handlePublishPost} 
                   accessibilityLabel={"Publish post"}>
                    <Text style={disabled? {...styles.addPostBtnText, color:'#BDBDBD'} : styles.addPostBtnText}>Publish</Text>
                  </Pressable>

                  <Pressable 
                   disabled={disableClear} 
                   style={disableClear? {...styles.removePostBtn, backgroundColor:'#F6F6F6'}: styles.removePostBtn}
                   onPress={handleDeletePost} 
                   accessibilityLabel={"Delete post"}>
                   <Icon name='trash-2' size={24} color={disableClear? '#BDBDBD': '#ffffff'} />
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
      backgroundColor:"#ffffff",
      paddingHorizontal:16,
   
    },
    addPostForm:{
      paddingTop:32,
      alignItems:'center',
      justifyContent:'space-between'
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
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
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
    },
    removePostBtn:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      width:70,
      height:40,
      padding:8,
      marginTop:120,
      backgroundColor: "#FF6C00",
      borderRadius: 20,
    }
  });

  export default CreatePost;