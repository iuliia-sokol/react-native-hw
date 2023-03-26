import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
  ImageBackground,
  Text,
} from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");

  const emailHandler = (text) => {
    setEmail(text);
    setFocused("email");
  };
  const passwordHandler = (text) => {
    setPassword(text);
    setFocused("password");
  };

  const onLogin = (e) => {
    e.preventDefault();
    console.log(`email: ${email},  password: ${password}`);
    Alert.alert("Credentials", `${email} + ${password}`);
  };

  const handleInputShow = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    }
    if (!email || !password) {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require("./assets/images/bg.jpg")}
        >
          <View style={styles.inputsWrapper}>
            <Text style={styles.title}>Войти</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                value={email}
                onChangeText={emailHandler}
                placeholder="Адрес электронной почты"
                style={{
                  ...styles.input,
                  borderColor: focused === "email" ? "#FF6C00" : "#E8E8E8",
                }}
              />
              <View style={styles.inputWrapper}>
                <TextInput
                  value={password}
                  onChangeText={passwordHandler}
                  placeholder="Пароль"
                  secureTextEntry={!showPassword}
                  style={{
                    ...styles.input,
                    borderColor: focused === "password" ? "#FF6C00" : "#E8E8E8",
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
                      opacity: disabled ? 0.7 : 1,
                    }}
                  >
                    Показать
                  </Text>
                </Pressable>
              </View>
              <Pressable
                disabled={disabled}
                style={{ ...styles.button, opacity: !password ? 0.7 : 1 }}
                onPress={onLogin}
                accessibilityLabel={"Login"}
              >
                <Text style={styles.buttonText}>Войти</Text>
              </Pressable>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
  inputsWrapper: {
    height: 489,
    justifyContent: "flex-start",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingBottom: 32,
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
    color: "#1B4371",
    fontSize: 16,
    fontWeight: 400,
    textAlign: "right",
  },

  title: {
    fontSize: 30,
    color: "#212121",
    // fontFamily: 'Roboto',
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
    textAlign: "center",
    color: "#ffffff",
  },
});
