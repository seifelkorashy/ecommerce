import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import auth from "../firebase";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // تحديث اسم المستخدم
        return updateProfile(user, {
          displayName: name,
        }).then(() => {
          return user;
        });
      })
      .catch((error) => {
        console.error("Signup error:", error.message);
        throw error;
      });
  };

    const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  

  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, (user) => {
      // console.log(user);
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsbscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logOut,
        resetPassword, 
        signInWithGoogle
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};