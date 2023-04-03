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
        .add({ userId, comments, likes, image:url, location,  coordinates, text, date, liked:false });

    } catch (error) {
      console.error(error.message);
    }
  };

  export const getAllPostsFromDB = async ({setPosts}) => {
    try {
      await db.collection("posts").
      onSnapshot((snapshot) => {
        const allPosts = snapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }));
        return  setPosts(allPosts.slice().sort(function (a, b) {
            var dateA = a.date;
            var dateB = b.date;
            return dateA < dateB ? 1 : -1; 
          })
          )
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const addCommentToPostInDB = async ({postId,commentData}) => {
    try {
           await  db.collection('posts').doc(postId).collection('comments').add({...commentData})
           const ref = await db.collection('posts').doc(postId);
           ref.update({
            comments: firebase.firestore.FieldValue.arrayUnion(commentData),
          });
    } catch (error) {
      console.log(error);
    }
  };

  export const getAllCommentsToPostFromDB = async ({postId, setComments}) => {
    try {
     await db.collection('posts').doc(postId).collection('comments').
      onSnapshot((snapshot) => {
          const allComments = snapshot.docs.map((doc) => ({ ...doc.data(), commentId: doc.id }));
          setComments(allComments.slice().sort(function (a, b) {
            var dateA = a.timestamp;
            var dateB = b.timestamp;
            return dateA < dateB ? 1 : -1; 
          }))
      });
    } catch (error) {
      console.log(error.message);
    }
  };


  export const addLikeToPostInDB = async ({postId}) => {
    try {
           const ref = await db.collection('posts').doc(postId);
           ref.update({
            likes: firebase.firestore.FieldValue.increment(1),
            liked: true,
          });
    } catch (error) {
      console.log(error);
    }
  };

  export const removeLikeToPostInDB = async ({postId}) => {
    try {
           const ref = await db.collection('posts').doc(postId);
           ref.update({
            likes: firebase.firestore.FieldValue.increment(-1),
            liked: false,
          });
          
    } catch (error) {
      console.log(error);
    }
  };