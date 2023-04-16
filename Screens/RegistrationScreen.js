import React, { useEffect, useState } from "react"; 
import { useDispatch } from 'react-redux';
import  Icon from "@expo/vector-icons/Feather";
import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ImageBackground,
    Text,
    Image
  } from "react-native";
import { imageHandler } from "../utils/imageHandler";
import { signUp } from "../redux/auth/authOperations";



const Registration = ({ navigation }) => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [focused, setFocused] = useState("");


    const loginHandler = (text) =>{
        setLogin(text);
    }
    const emailHandler = (text) => {
        setEmail(text);
      };

      const passwordHandler = (text) => {
        setPassword(text.trim());
      };
    
      const resetForm =()=>{
        setLogin('')
        setEmail("");
        setPassword("");
        setImage(null)
      }

      const onRegister = (e) => {
        e.preventDefault();
    
        const user = {
          login: login.trim(), 
          email: email.trim(), 
          password, 
          image
        }
        
        dispatch(signUp(user))
        resetForm()      
      };
    
      const handleInputShow = () => {
        setShowPassword(!showPassword);
      };

      const handleKeyboard =()=>{
        Keyboard.dismiss()
        setShowKeyboard(false)
    }
    
      useEffect(() => {
        if (email && password && login) {
          setDisabled(false);
        }
        if (!email || !password || !login) {
          setDisabled(true);
        }
      }, [email, password, login]);

  return (
    <TouchableWithoutFeedback onPress={handleKeyboard}>
          <View style={styles.container}>
            <ImageBackground
              style={styles.bgImage}
              source={require("../assets/images/bg.jpg")}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" && "padding" }
              >
                <View
                  style={{
                    ...styles.form,
                    paddingBottom: showKeyboard && Platform.OS == "android" ? 32 : 111,
                  }}
                >
                <View style={styles.addImage}>
                    {image? <Image  style={styles.avatar} source={{uri: image}}/> : null}
                <Pressable
                    style={styles.addImageBtn} 
                    onPress={()=>imageHandler(setImage)}
                    accessibilityLabel={"Add avatar"}
                  >
                  {image?
                  
                    <View  style={styles.removeImageBtnImage} >
                       <Icon name='plus' size={25} color='#BDBDBD' />
                    </View>
     
                    : <View  style={styles.addImageBtnImage} >
                        <Icon name='plus' size={25} color='#FF6C00' />
                    </View>
                    }
                  </Pressable>
                </View>
                  <Text style={styles.title}>Registration</Text>
        
                
                  <View style={styles.inputWrapper}>
                    <TextInput
                      value={login}
                      returnKeyType="next"
                      selectionColor='#FF6C00'
                      onChangeText={loginHandler}
                      onFocus={() => {
                        setShowKeyboard(true);
                        setFocused("login");
                      }}
                      onBlur={() => {
                       
                        setFocused("");
                      }}
                      placeholder="Login"
                      style={{
                        ...styles.input,
                        borderColor: focused === "login" ? "#FF6C00" : "#E8E8E8",
                      }}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      value={email}
                      returnKeyType="next"
                      autoCompleteType="email"
                      textContentType="emailAddress"
                      keyboardType="email-address"
                      autoCapitalize='none'
                      selectionColor='#FF6C00'
                      onChangeText={emailHandler}
                      onFocus={() => {
                        setShowKeyboard(true);
                        setFocused("email");
                      }}
                      onBlur={() => {
                        setFocused("");
                      }}
                      placeholder="Email address"
                      style={{
                        ...styles.input,
                        borderColor: focused === "email" ? "#FF6C00" : "#E8E8E8",
                      }}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      value={password}
                      returnKeyType="done"
                      selectionColor='#FF6C00'
                      onChangeText={passwordHandler}
                      onFocus={() => {
                        setShowKeyboard(true);
                        setFocused("password");
                      }}
                      onBlur={() => {
                       
                        setFocused("");
                      }}
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      style={{
                        ...styles.input,
                        borderColor:
                          focused === "password" ? "#FF6C00" : "#E8E8E8",
                      }}
                    />
                    <Pressable
                      style={styles.passwordIndicator}
                      onPress={handleInputShow}
                      accessibilityLabel={"Show password"}
                    >
                      <Text
                        style={{
                          ...styles.passwordIndicatorText,
                          opacity: !password ? 0.5 : 1,
                        }}
                      >
                        Show
                      </Text>
                    </Pressable>
                  </View>
  
                  <Pressable
                    disabled={disabled}
                    style={{ ...styles.button, opacity: disabled ? 0.7 : 1 }}
                    onPress={onRegister}
                    accessibilityLabel={"Register"}
                  >
                    <Text style={styles.buttonText}>Register</Text>
                  </Pressable>

                  <View  style={styles.navBlock}>
                   <Text
                      style={styles.passwordIndicatorText
                      }
                    >Already have an account?</Text>
                      <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.passwordIndicatorText
                      }>Log in</Text>
                        </Pressable>
                   </View>

                </View>
              </KeyboardAvoidingView>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#ecf0f1",
    },
    input: {
      height: 50,
      padding: 16,
      backgroundColor: "#F6F6F6",
      borderWidth: 1,
      borderColor: "#E8E8E8",
      borderRadius: 8,
      marginBottom: 16,
    },
    bgImage: {
      flex: 1,
      justifyContent: "flex-end",
    },
    form: {
      justifyContent: "flex-start",
      backgroundColor: "#ffffff",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingTop: 32,
      paddingHorizontal: 16,
    },
    inputWrapper: {
      position: "relative",
    },
    passwordIndicator: {
      position: "absolute",
      right: 16,
      top: 16,
    },
    passwordIndicatorText: {
      fontFamily: "Roboto-Regular",
      color: "#1B4371",
      fontSize: 16,
      fontWeight: 400,
      textAlign: "right",
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
    button: {
      backgroundColor: "#FF6C00",
      borderRadius: 100,
      padding: 16,
    },
    buttonText: {
      fontFamily: "Roboto-Regular",
      textAlign: "center",
      color: "#ffffff",
      fontSize:16,
      lineHeight:19,
    },
    addImage:{
        position:'relative',
        alignSelf:'center',
        marginTop:-92,
        marginBottom:32,       
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
        width:120,
        height:120,
    },
    addImageBtn:{
        position:'absolute',
        bottom:14,
        right:-12,
        borderRadius:'50%'    
    },
    addImageBtnImage:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
        borderRadius:'50%',
        borderWidth:1,
        borderColor:'#FF6C00',
        backgroundColor:'#ffffff',    
    },
    removeImageBtnImage:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:'50%',
      borderWidth:1,
      borderColor:'#BDBDBD',
      backgroundColor:'#ffffff',
      transform: [{ rotate: '45deg'}],
  },
    avatar:{
        borderRadius: 16,
        width:120,
        height:120,
    },
    navBlock: {
      marginTop: 16,
      display:'flex',
      flexDirection:'row',
      gap:4,
      justifyContent:'center'
    }
  });
  

export default Registration;