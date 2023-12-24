import { auth, db } from "../firebase";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const setLoading = (status) => {
  return {
    type: SET_LOADING_STATUS,
    status: status,
  };
};

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});
export const signInAPI = () => async (dispatch) => {
  const authInstance = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    if (isMobileDevice()) {
      await signInWithRedirect(authInstance, provider);
    } else {
      const result = await signInWithPopup(authInstance, provider);
      const user = result.user;

      dispatch(setUser(user));
    }
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    alert(error.message);
  }
};

const isMobileDevice = () => {
  const isMobileWidth = window.innerWidth <= 768;
  return isMobileWidth;
};

export const getUserAuth = () => (dispatch) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      dispatch(setUser(user));
    }
  });
};

export const signOutAPI = () => (dispatch) => {
  auth
    .signOut()
    .then(() => {
      dispatch(setUser(null));
    })
    .catch((error) => {
      console.log("Error signing out", error);
    });
};

export function postArticleAPI(payload) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const storage = getStorage();

    if (payload.image && payload.image !== "") {
      const storageRef = ref(storage, `images/${payload.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, payload.image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress: ${progress}%`);

          if (snapshot.state === "running") {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => {
          console.error("Error uploading file:", error.code);
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);

          const articlesCollection = collection(db, "articles");

          try {
            const newDocRef = await addDoc(articlesCollection, {
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              sharedImg: downloadURL,
              comments: 0,
              description: payload.description,
            });
            dispatch(setLoading(false));

            console.log("Document written with ID: ", newDocRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      );
    } else {
      const articlesCollection = collection(db, "articles");

      try {
        const newDocRef = await addDoc(articlesCollection, {
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: payload.timestamp,
            image: payload.user.photoURL,
          },
          video: payload.video,
          sharedImg: null,
          comments: 0,
          description: payload.description,
        });
        dispatch(setLoading(false));
        console.log("Document written with ID: ", newDocRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
}


export function getArticlesAPI() {
  return (dispatch) => {
    dispatch(setLoading(true));

    const q = query(collection(db, "articles"), orderBy("actor.date", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const payload = snapshot.docs.map((doc) => doc.data());
      const id = snapshot.docs.map((doc) => doc.id);
      dispatch(getArticles(payload, id)); // Make sure getArticles is defined
      dispatch(setLoading(false));
    });

    // Uncomment this line if you need to store the unsubscribe function for cleanup
    // return unsubscribe;
  };
}
export function updateArticleAPI(payload) {
  return async (dispatch) => {
    try {
      const articleRef = doc(db, "articles", payload.id);
      await updateDoc(articleRef, payload.update);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };
}
