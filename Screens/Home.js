import React from "react";
import { HeaderBackButton } from '@react-navigation/elements';
import {Pressable, StyleSheet,  } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  Icon from "@expo/vector-icons/Feather";

import CreatePost from "../Screens/CreatePostsScreen";
import Profile from "../Screens/ProfileScreen";
import Posts from "../Screens/PostsScreen";


const Tabs = createBottomTabNavigator();


const Home = ({ navigation, route }) => {
    const {data} = route.params
    // console.log(data);
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
              } else if (route.name === "Create post") {
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
            headerTitleAlign:'center',
            headerStyle: styles.headerBox,
            headerPressColor:'#FF6C00',
            headerTitleStyle: styles.headerTitle,
            headerRightContainerStyle:{paddingRight:16},
            headerLeftContainerStyle:{paddingLeft:16},
            headerRight: () => (
              <Pressable
                onPress={() => alert("Exit")}
              >
                <Icon name='log-out' size={24} color='#BDBDBD'/>
              </Pressable>
            ),
          }} />
          <Tabs.Screen name="Create post" component={CreatePost} 
                       options={{
                        headerTitleAlign:'center',
                        headerStyle: styles.headerBox,
                        headerPressColor:'#FF6C00',
                        headerTitleStyle: styles.headerTitle,                        
                        headerRightContainerStyle:{paddingRight:16},
                        headerLeftContainerStyle:{paddingLeft:16},
                        
                        headerLeft: () => <HeaderBackButton backImage={ ()=> <Icon name='arrow-left' size={24} color='#BDBDBD'/>} onPress={() => navigation.navigate('Posts')}/>,
                      }}
          />
          <Tabs.Screen name="Profile" component={Profile} />
        </Tabs.Navigator>
       
      );
    };
    

    const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: "Roboto-Medium",
        fontWeight: 500,
        fontSize: 17,
        color: '#212121',
        letterSpacing: '-0.408px'
    },
    headerBox:{
        borderBottomWidth: 1,
        borderBottomColor: "#BDBDBD",
    }
  });
    export default Home;