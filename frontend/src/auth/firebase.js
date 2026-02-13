import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBCTwOY-39fNH0j0DGuVyWCuDtpnGAV3jI",
  authDomain: "ontym-14.firebaseapp.com",
  projectId: "ontym-14",
  storageBucket: "ontym-14.firebasestorage.app",
  messagingSenderId: "306235347028",
  appId: "1:306235347028:web:7f50bfbe0705cd9c4d5dc1",
  databaseURL: "https://ontym-14-default-rtdb.firebaseio.com/"
};


export const app = initializeApp(firebaseConfig);