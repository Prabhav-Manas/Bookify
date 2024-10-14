import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBkk2y6ecMLNZS8FSDukmqSOXSp1AdOPVk",
  authDomain: "bookify-87f14.firebaseapp.com",
  projectId: "bookify-87f14",
  storageBucket: "bookify-87f14.appspot.com",
  messagingSenderId: "866566518330",
  appId: "1:866566518330:web:006c09c9aa2a1645df6703",
};

export const useFirebase = () => useContext(FirebaseContext);

// === Creating Instance ===
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleAuth = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
  // === For Auth State ===
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        // navigate("/home");
      } else {
        setUser(null);
        // navigate("/");
      }
    });
  }, [navigate]);

  // === For SignUp With Email & Password ===
  const signUpUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // === For SignIn With Email & Password ===
  const signInUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  // === For Sign In With Google ===
  const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleAuth);

  // === SignOut ===
  const signOut = async () => {
    await firebaseSignOut(firebaseAuth);
    navigate("/");
    // alert("USER Signed Out!!");
  };

  // --- For CRUD ---
  // === Add Doc ===
  const handleCreateNewListing = async (
    bookName,
    bookISBN,
    bookPrice,
    bookAuthor,
    bookCoverPic
  ) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${bookCoverPic.name}`
    );
    const uploadImageResult = await uploadBytes(imageRef, bookCoverPic);
    return await addDoc(collection(firestore, "books"), {
      bookName,
      bookISBN,
      bookPrice,
      bookAuthor,
      imageURL: uploadImageResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  // === GET DOCS ===
  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getBooksById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
    return result;
  };

  const fetchMyBooks = async (userID) => {
    const collectionRef = collection(firestore, "books");
    const myQuery = query(collectionRef, where("userID", "==", userID));

    const result = await getDocs(myQuery);
    return result;
  };

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
  };

  // === For Auth State ===
  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        signInWithGoogle,
        signOut,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBooksById,
        placeOrder,
        fetchMyBooks,
        getOrders,
        isLoggedIn,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
