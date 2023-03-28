import * as ImagePicker from 'expo-image-picker';

export  const imageHandler = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // console.log(result);

    if (result.canceled) {
       return
    }
    setImage(result.assets[0].uri);  
  };