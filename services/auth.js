// import { Platform } from "react-native";
import { auth, storage } from "../firebase/config";

export const registerDB = async ({displayName, image, email, password}) => {
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
   
   const uploadImage = async(uri, user) => {
    console.log('user',user);
    let URL;
    try{
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = storage.ref();
        const upload = storageRef.child(`usersAvatar/${user.uid}/${'avatar_'+user.uid}`);
        await upload.put(blob);
        await upload.getDownloadURL().then((url) => {
            URL = url;
        });
        return URL;
    }catch(e){
       throw e;
    }
}

   const url = await uploadImage(image, user.user.multiFactor.user)

   const updatedUser = await getCurrentUserInfo(displayName, url)
//    console.log("updatedUser", updatedUser);
      return updatedUser
    } catch (error) {
      throw error;
    }
  };

  export const loginDB = async ({email, password}) => {
    try {
     const user = await auth.signInWithEmailAndPassword(email, password);
     console.log(user);
     return user.user
    } catch (error) {
      throw error;
    }
  };

  export const getCurrentUserInfo = async (displayName, url) => {
    // console.log("displayName, photoURL", displayName, url);
    const user = await auth.currentUser;

    if (user) {
      user.updateProfile({
        displayName: displayName,
        photoURL: url,
      });
      return user
    }
  };

  export const authStateChanged = async () => {
    try {
        const user = await auth.onAuthStateChanged((user) =>{ setIsAuth(user)});
        console.log(user);
    } catch (error) {
      throw error;
    }
  };
