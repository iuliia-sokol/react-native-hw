import { db,storage } from "../firebase/config";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

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

  export const addCommentToPostInDB = async ({postId,commentData}) => {
    try {
           const ref = await db.collection('posts').doc(postId);
           ref.update({
            comments: firebase.firestore.FieldValue.arrayUnion(commentData),
          });

      // await db.collection('posts').doc(postId).collection('comments').add({...commentData})
      // const result = await getCommentsFromDB({postId})

      // console.log("comment added", result);
      // return result

    } catch (error) {
      console.log(error);
    }
  };

  // export const getCommentsFromDB = async ({postId}) => {
  //   try {
  //     let comments = []

  //     const snapshot = await db.collection("posts").doc(postId).collection('comments').get();
  //     snapshot.forEach((doc) => {
  //       comments.push({...doc.data(), commentId: doc.id})
  //     });

  //     return comments
  
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


    // const result = await db.collection('posts').doc(postId).collection('comments').onSnapshot((data)=> comments = data.docs.map((doc)=>({...doc.data(), id:doc.id})))
      // const ref = await db.collection('posts').doc(postId).collection('comments');
      // ref.update({
      //   ...commentData
      // });
      // console.log('result',result);