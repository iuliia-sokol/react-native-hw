import React, { useEffect, useState } from "react"; 

import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Pressable,
    ImageBackground,
    Text,
    Image
  } from "react-native";

const Registration = () => {
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        setPassword(text);
      };
    
      const onRegister = (e) => {
        e.preventDefault();
        console.log({ login: login, email: email, password: password });
        Alert.alert("Credentials:", `login: ${login} 
        email: ${email} 
        password: ${password}`);
        setLogin('')
        setEmail("");
        setPassword("");
      };
    
      const handleInputShow = () => {
        setShowPassword(!showPassword);
      };
    
      useEffect(() => {
        if (email && password && login) {
          setDisabled(false);
        }
        if (!email || !password || !login) {
          setDisabled(true);
        }
      }, [email, password, login]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ImageBackground
              style={styles.bgImage}
              source={require("../assets/images/bg.jpg")}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View
                  style={{
                    ...styles.form,
                    // paddingBottom: showKeyboard ? 111 : 111,
                    paddingBottom: 111,
                  }}
                >
                <View style={styles.addImage}>
                <Pressable
                    style={styles.addImageBtn} 
                    // onPress={onRegister}
                    accessibilityLabel={"Add avatar"}
                  >
                    <Image  style={styles.addImageBtnImage}  source={require("../assets/images/add.png")}/>
                  </Pressable>
                </View>
                  <Text style={styles.title}>Registration</Text>
        
                
                  <View style={styles.inputWrapper}>
                    <TextInput
                      value={login}
                      autoFocus={true}
                      onChangeText={loginHandler}
                      onFocus={() => {
                        setShowKeyboard(true);
                        setFocused("login");
                      }}
                      onBlur={() => {
                        setShowKeyboard(false);
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
                      onChangeText={emailHandler}
                      onFocus={() => {
                        setShowKeyboard(true);
                        setFocused("email");
                      }}
                      onBlur={() => {
                        setShowKeyboard(false);
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
                      onChangeText={passwordHandler}
                      onFocus={() => {
                        setShowKeyboard(true);
                        setFocused("password");
                      }}
                      onBlur={() => {
                        setShowKeyboard(false);
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
  
                  <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text
                      style={{
                        ...styles.passwordIndicatorText,
                        textAlign: "center",
                        marginTop: 16,
                      }}
                    >
                      Already have an account? Log in
                    </Text>
                  </Pressable>
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
        
    },
    addImageBtnImage:{
        width:25,
        height:25,
    }
  });
  

export default Registration;