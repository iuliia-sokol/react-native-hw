import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from "react-redux";
import Container from 'toastify-react-native';
import 'expo-dev-menu';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/LoginScreen";
import Register from "./Screens/RegistrationScreen";
import Home from "./Screens/Home";
import useCachedResources from "./hooks/useCachedResourses";
import { store } from "./redux/store";
import { currentState } from "./redux/auth/authOperations";



const fontsLoaded = {
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
};

const MainStack = createStackNavigator();

export default () => {
  const isLoadingComplete = useCachedResources(fontsLoaded);

  if (!isLoadingComplete) {
    return  null
  } else {
  
  return (
    <Provider store={store}> 
      <App />
    </Provider>
  )
}
}


const App = () => {
  // const dispatch = useDispatch()
  const [user, setUser] = useState(null)
 

//  useEffect(()=>{
//   dispatch(currentState())
  
//  },[])


  return (
      <NavigationContainer>
         <Container position="center" style={{
                borderRadius: 20,
                fontSize: 8,
                width: 350,
                height: 100,
            }} 
            textStyle={{fontSize:8}}
            duration={5000} animationStyle={'zoomInOut'}/>
            
         <MainStack.Navigator initialRouteName="Registration">
         <MainStack.Screen name="Registration" component={Register} />
         <MainStack.Screen name="Login" component={Login} />
         <MainStack.Screen name="Home" component={Home} options={{headerShown:false}}/>
         </MainStack.Navigator>
      </NavigationContainer>
  );
  }


