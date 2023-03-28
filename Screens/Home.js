import React from "react";
import {StyleSheet, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  Icon from "@expo/vector-icons/Feather";

import CreatePost from "../Screens/CreatePostsScreen";
import Profile from "../Screens/ProfileScreen";
import Posts from "../Screens/PostsScreen";


const Tabs = createBottomTabNavigator();


const Home = ({ navigation, route }) => {
    const {data} = route.params
    console.log(data);
    return (
       
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarItemStyle: {maxWidth: 70, width: 70, height: 40, display:'flex', justifyContent:'center', alignItems:"center", borderRadius:20 },
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
            tabBarActiveBackgroundColor:"#FF6C00",
            tabBarInactiveBackgroundColor:'transparent',
            tabBarIconStyle:{strokeWidth: 1},
            tabBarStyle: { display:'flex', height:83, paddingTop:9, paddingBottom:34, paddingHorizontal:81},
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color }) => {
              let iconName;
              if (route.name === "Posts") {
                iconName = "grid";
              } else if (route.name === "CreatePost") {
                iconName = "plus";
              } else if (route.name === "Profile") {
                iconName = "user";
              }
              return <Icon name={iconName} size={24} color={color} />;
            },
          })}
        >
           <Tabs.Screen name="Posts" component={Posts} 
           options={{
            headerStyle: {
              borderBottomWidth: 1,
              borderBottomColor: "#BDBDBD",
            },
            headerTitleStyle: {
              fontFamily: "Roboto-Medium",
              fontWeight: 500,
              fontSize: 17,
              color: '#212121',
              letterSpacing: '-0.408px'
            },
            headerRightContainerStyle:{paddingRight:16},

            headerRight: () => (
              <Pressable
                onPress={() => alert("Exit")}
              >
                <Icon name='log-out' size={24} color='#BDBDBD'/>
              </Pressable>
            ),
          }} />
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