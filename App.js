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
  Button,
  ImageBackground,
  Text,
} from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = (e) => {
    e.preventDefault();
    console.log(`email: ${email},  password: ${password}`);
    Alert.alert("Credentials", `${email} + ${password}`);
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
                style={styles.input}
              />
              <TextInput
                value={password}
                onChangeText={passwordHandler}
                placeholder="Пароль"
                secureTextEntry={true}
                style={styles.input}
              />
              <Button
                title={"Войти"}
                disabled={disabled}
                style={styles.button}
                onPress={onLogin}
              />
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
    // marginHorizontal: 16,
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
    // alignItems: "center",
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
    color: "#ffffff",
    padding: 16,
  },
});
