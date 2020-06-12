import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Create a firebase project, enable the auth with google,
// then create an app on that project and get the JSON
// I have splitted into multiple variables so I put then into
// a .env.local file.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore().collection("favs");

export function updateDB(favorites: Array<any>, uuid: string) {
  console.log(uuid);
  // firebase requires to save only objects,
  db.doc(uuid).set({ favorites });
}

export function getFavoriteCharacters(uuid: string) {
  return db
    .doc(uuid)
    .get()
    .then((snap) => {
      return snap.data()?.favorites || [];
    });
}

export const loginWithGoogle = () => {
  let provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((snapshot) => snapshot.user);
};

export const signOutGoogle = () => {
  firebase.auth().signOut();
};
