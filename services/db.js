import { db,storage } from "../firebase/config";

export const addPostToDB = async ({ userId, comments, likes, image, location, coordinates, text}) => {
    try {
      const date = Date.now().toString()
      const uploadImage = async(uri, userId) => {
        let URL;
        try{
            const response = await fetch(uri);
            const blob = await response.blob();
            const storageRef = storage.ref();
            const upload = storageRef.child(`usersPost/${userId}/${'post_'+userId+date}`);
            await upload.put(blob);
            await upload.getDownloadURL().then((url) => {
                URL = url;
            });
            return URL;
        }catch(e){
           throw e;
        }
    }

      const url = await uploadImage(image, userId)
  
     await db
        .collection("posts")
        .add({ userId, comments, likes, image:url, location,  coordinates, text, date });
              
        const result = await getPostsFromDB()
        return result
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  export const getPostsFromDB = async () => {
    let posts = []
    try {
      const snapshot = await db.collection("posts").get();
      snapshot.forEach((doc) => {
        posts.push({...doc.data(), postId: doc.id})
      });
      return posts 
    } catch (error) {
      console.log(error);
    }
  };

  // export const updateDataInFirestore = async (collectionName, docId) => {
  //   try {
  //     const ref = await db.collection(collectionName).doc(docId);
  //     ref.update({
  //       age: 25,
  //     });
  //     console.log("document updated");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };