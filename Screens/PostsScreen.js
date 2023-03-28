import React, { useState } from "react";
import { View,Image, Text, StyleSheet } from "react-native";

  const Posts=({ navigation, route })=> {
    const params = route.params
    console.log(params);
    const [image, setImage] = useState(params.file)
    const [name,setName]= useState(params.login)
    const [email,setEmail]=useState(params.email)

    
    return (
      <View style={styles.container}>
       <View style={styles.userData}>

        <View style={styles.avatar}>
       {image? <Image  style={styles.avatar} source={{uri: image}}/> : null}
       </View>
       <View>
        <Text>
            {name? name : 'Anonymos'}

        </Text>
        <Text>
            {email? email : 'Anonymos'}

        </Text>
       </View>
       </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      backgroundColor:"#ffffff",
      paddingHorizontal:16,
      paddingTop:32,
    },
    userData:{
display:'flex',
flexDirection:'row',
gap:8,
justifyContent:'center',
alignItems:'center',
    },
    avatar:{
        width:60,
        height:60,
        borderRadius:16,
        backgroundColor:'#E8E8E8',
    },
  });
  export default Posts;