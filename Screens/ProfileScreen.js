import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Profile=({ navigation, route })=> {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Profile</Text>
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

  export default Profile;