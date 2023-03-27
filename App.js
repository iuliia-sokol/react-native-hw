import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/LoginScreen";
import Register from "./Screens/RegistrationScreen";

import useCachedResources from "./hooks/useCachedResourses";



const fontsLoaded = {
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
};

const MainStack = createStackNavigator();

export default () => {

  const isLoadingComplete = useCachedResources(fontsLoaded);
  if (!isLoadingComplete) {
    return null;
  } else {
  return (
      <NavigationContainer>
         <MainStack.Navigator initialRouteName="Login">
         <MainStack.Screen name="Registration" component={Register} />
         <MainStack.Screen name="Login" component={Login} />
      
         </MainStack.Navigator>
      </NavigationContainer>
  
  );
  }
}

