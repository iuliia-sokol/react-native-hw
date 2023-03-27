import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/LoginScreen";
import Register from "./Screens/RegistrationScreen";
import Home from "./Screens/Home";

import * as Font from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// import { useFonts } from "expo-font";

const fontsLoaded = {
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
};

const MainStack = createStackNavigator();

export default () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync(fontsLoaded);
      setIsReady(true);
    };
    loadFonts();
  }, []);


  return (
    isReady && (
      <NavigationContainer>
         <MainStack.Navigator initialRouteName="Login">
         <MainStack.Screen name="Registration" component={Register} />
         <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen name="Home" component={Home} />
         </MainStack.Navigator>
      </NavigationContainer>
    )
  );
}

