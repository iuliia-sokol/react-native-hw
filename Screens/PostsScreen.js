import React from "react";
import { View, Text, StyleSheet } from "react-native";

  const Posts=({ navigation, route })=> {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Posts</Text>
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
  export default Posts;