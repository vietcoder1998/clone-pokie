import { getStorage, ref, uploadBytes, uploadString, getDownloadURL  } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRE_BASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const generateImageNameRef = (name) => {
  return ref(storage, ["img", name].join("/"));
};

export const onUploadImageBase64URL = (file, name) => {
  const ref = generateImageNameRef(name);

  uploadBytes(ref, file, "base64url").then((snapshot) => {
    console.log("Uploaded a bytes or file!");
  });
};

export const onUploadImageDataUrl = (file, name) => {
  const ref = generateImageNameRef(name);

  return uploadString(ref, file, "data_url").then(async (snapshot) => {
    console.log("Uploaded a string or file!");
    const url = await getDownloadURL(snapshot.ref)

    return { url };
  });
};
