import React, { useState } from "react";
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
} from "react-native";

export default function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    console.log(`name: ${name},  password: ${password}`);
    Alert.alert("Credentials", `${name} + ${password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require("./assets/images/bg.jpg")}
        >
          <View style={styles.inputsWrapper}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                value={name}
                onChangeText={nameHandler}
                placeholder="Username"
                style={styles.input}
              />
              <TextInput
                value={password}
                onChangeText={passwordHandler}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
              />
              <Button title={"Login"} style={styles.input} onPress={onLogin} />
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
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  bgImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputsWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
