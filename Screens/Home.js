import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  Icon from "@expo/vector-icons/Feather";

function Profile() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Profile</Text>
      </View>
    );
  }
  
  function Posts() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Posts</Text>
      </View>
    );
  }

  function CreatePost() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Create post</Text>
      </View>
    );
  }


const Tabs = createBottomTabNavigator();


const Home = ({ navigation, route }) => {
    const {data} = route.params
    console.log(data);
    return (
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "tomato",
  tabBarInactiveTintColor: "gray",
  tabBarStyle: [
    {
      "display": "flex"
    },
    null
  ],
            
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === "Posts") {
                iconName = focused
                  ? "grid"
                  :"grid";
              } else if (route.name === "CreatePost") {
                iconName = focused ? "plus" : "plus";
              } else if (route.name === "Profile") {
                iconName = focused ? "user" : "user";
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tabs.Screen name="Posts" component={Posts} />
          <Tabs.Screen name="CreatePost" component={CreatePost} />
          <Tabs.Screen name="Profile" component={Profile} />
        </Tabs.Navigator>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
    });
    
    export default Home;