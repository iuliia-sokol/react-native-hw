import { auth } from "../firebase/config";

export const registerDB = async ({displayName, image, email, password}) => {
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
    //   console.log(user);
      return user.user
    } catch (error) {
      throw error;
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

  export const loginDB = async ({email, password}) => {
    try {
     const user = await auth.signInWithEmailAndPassword(email, password);
     console.log(user);
     return user.user
    } catch (error) {
      throw error;
    }
  };

  export const getCurrentUserInfo = async () => {

    const user = await auth.currentUser;
  
    // якщо такий користувач знайдений
    if (user) {
    console.log(user);
    // оновлюємо його профайл
      user.updateProfile({
        displayName: "Bob",
        photoURL: "https://example.com.jpg",
      });
    }
  };