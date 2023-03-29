import React from "react";
import 'expo-dev-menu';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/LoginScreen";
import Register from "./Screens/RegistrationScreen";
import Home from "./Screens/Home";
import useCachedResources from "./hooks/useCachedResourses";



const fontsLoaded = {
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
};

const MainStack = createStackNavigator();

export default () => {

  const isLoadingComplete = useCachedResources(fontsLoaded);
  if (!isLoadingComplete) {
    return null;
  } else {
  return (
      <NavigationContainer>
         <MainStack.Navigator initialRouteName="Registration">
         <MainStack.Screen name="Registration" component={Register} />
         <MainStack.Screen name="Login" component={Login} />
         <MainStack.Screen name="Home" component={Home} options={{headerShown:false}}/>
         </MainStack.Navigator>
      </NavigationContainer>
  
  );
  }
}

