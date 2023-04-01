import { auth } from "../config";

export const registerDB = async () => {
    try {
      await auth.createUserWithEmailAndPassword("email", "password");
    } catch (error) {
      throw error;
    }
  };

  export const authStateChanged = async () => {
    try {
      await auth.onAuthStateChanged((user) => setIsAuth(user));
    } catch (error) {
      throw error;
    }
  };

  export const loginDB = async () => {
    try {
      await auth.signInWithEmailAndPassword("email", "password");
    } catch (error) {
      throw error;
    }
  };

  export const getCurrentUserInfo = async () => {

    const user = await auth.currentUser;
  
    // якщо такий користувач знайдений
    if (user) {
  
    // оновлюємо його профайл
      user.updateProfile({
        displayName: "Bob",
        photoURL: "https://example.com.jpg",
      });
    }
  };