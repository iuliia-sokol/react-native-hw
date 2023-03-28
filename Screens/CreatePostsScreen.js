import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreatePost=({ navigation, route })=> {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Create post</Text>
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  
  export default CreatePost;