import { db } from "../config";

export const writeDataToFirestore = async () => {
    try {
      const result = await db
        .collection("users")
        .add({ first: "Ada", last: "Lovelace", born: 1815 });
      console.log("Document written with ID: ", result.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  export const getDataFromFirestore = async () => {
    try {
      const snapshot = await db.collection("users").get();
      snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
    } catch (error) {
      console.log(error);
    }
  };

  export const updateDataInFirestore = async (collectionName, docId) => {
    try {
      const ref = await db.collection(collectionName).doc(docId);
      ref.update({
        age: 25,
      });
      console.log("document updated");
    } catch (error) {
      console.log(error);
    }
  };