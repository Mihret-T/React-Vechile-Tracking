import React, { useContext, useState, useEffect, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  createUserDocument
} from "firebase/auth";
import { addDoc, getDoc, getDocs, collection, doc, setDoc, onSnapshot, QuerySnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [users, setUsers]=useState()

  function signup(email, password) {
    console.log("signup function");
    console.log("signup user");
    console.log("Email: ", email);
    console.log("Password: ", password);
    return createUserWithEmailAndPassword(auth, email, password);
  }

//   async function registerUser(user, additionalData) {
//     if (!user) return;

//     // const userRef = db.(`Users/${user.uid}`);
//     const 
//     const snapshot = await userRef.get();
//     if (snapshot.exists) {
//       const { email } = user;
//       const { displayName } = additionalData;

//       return userRef.set({
//         displayName,
//         email,
//         createdAt: new Date()
//       })
//     // }else{
//     //   return "User does not exist";
//     }
// }

function registerUser(userId, data){
  // const user = doc(collection(db, 'Users', userId));
  // console.log(user);
  // return db.collection("app").document("Users").collection(userId).document(data);
  //return setDoc(user, data);

 // return db.collection('Users').doc(userId).set(data);

 return setDoc(doc(db, "Users", userId), data);
}

function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

function getUser(userId){
  console.log(userId);
  return getDoc(doc(db, "Users", userId));
}

function logout() {
  return signOut(auth);
}

function resetPassword(email) {
  return sendPasswordResetEmail(auth, email)
}

function getUsers(){
  return getDocs(collection(db, 'Users'));
}

function updateLocation(){
  return getDocs(collection(db, "Location"))
}
// function updateEmail(email) {
//   return currentUser.updateEmail(email)
// }

// function updatePassword(password) {
//   return currentUser.updatePassword(password)
// }

// function deleteUser() {
//   return currentUser.delete()
// }

// function createUserDocument(user, additionalData){
//   if(!user) return;

//     const userRef = firestore.doc('Users/${user.uid}'); 
//     const snapshot = userRef.get();
//     if(snapshot.exists){
//       const {email} =user;
//       const {name} =additionalData;
//     try{
//       userRef.set({
//         name,
//         email,
//         createdAt: new Date()
//       })
//     }catch(error){
//       console.log('Error in creating user', error);
//     }
//   }
// }

// useEffect(() => {
//   let isMounted = true;   
//   const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrentUser(user)
//       setLoading(false)
//   })
//   if(isMounted) return unsubscribe;
//   else return isMounted=false;
//   //return ()=>{isMounted=false}
// }, [])

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, user => {
    setCurrentUser(user)
    setLoading(false)
  });
  return unsubscribe
}, []);

const value = {
  currentUser,
  login,
  signup,
  logout,
  registerUser,
  getUsers,
  getUser,
  updateLocation
  // resetPassword,
  // updateEmail,
  // updatePassword
}

return (
  <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
)
}
