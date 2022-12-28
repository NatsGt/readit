import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { auth } from "../lib/firebase";
import { signInGoogle, signOutGoogle } from "../lib/googleAuth";

const AuthUserContext = createContext({});
const provider = new GoogleAuthProvider();

export function AuthUserProvider({ children }) {
  const [authUser, setAuthUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const values = useMemo(
    () => ({
      user: authUser,
      isLoading: isLoading,
      isAuthenticated: isAuthenticated,
      signIn: () => signInGoogle(),
      signOut: () => signOutGoogle(),
    }),
    [authUser]
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setIsLoading(false);
        setAuthUser(() => {
          return {
            fullName: user.displayName,
            email: user.email,
            firebaseUId: user.uid,
            profilePicture: user.photoURL,
          };
        });
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
        setAuthUser({});
      }
    });
  }, [auth]);

  return (
    <AuthUserContext.Provider value={values}>
      {children}
    </AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
