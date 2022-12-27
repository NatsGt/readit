import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  createContext,
  useContext,
  Context,
  useState,
  useEffect,
  useMemo,
} from "react";
import { auth } from "../lib/firebase";
import { signInGoogle, signOutGoogle } from "../lib/googleAuth";

const AuthUserContext = createContext({});
const provider = new GoogleAuthProvider();

export function AuthUserProvider({ children }) {
  const [authUser, setAuthUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // default is loading
  const [isLoading, setIsLoading] = useState(true);

  const values = useMemo(
    () => ({
      user: authUser,
      isLoading: isLoading,
      isAuthenticated: isAuthenticated,
      signIn: () =>
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;

            // ...
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          }),
      signOut: () =>
        signOut(auth)
          .then(() => {
            // Sign-out successful.
          })
          .catch((error) => {
            // An error happened.
          }),
    }),
    [authUser]
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
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
        // ...
      } else {
        // User is signed out
        // ...
        setIsAuthenticated(false);
        setIsLoading(false);
        setAuthUser({});
      }
    });
  }, [auth]);

  //   useEffect(() => {
  //     if (authUser) {
  //       return;
  //     }

  //    onAuthStateChanged((user) => {
  //       // if user exists it means authenticated
  //       console.log(user);

  //       if (user) {
  //         setIsAuthenticated(true);
  //         setIsLoading(false);
  //         setAuthUser(() => {
  //           return {
  //             fullName: user.displayName,
  //             email: user.email,
  //             firebaseUId: user.uid,
  //             profilePicture: user.photoURL,
  //           };
  //         });
  //       } else {
  //         setIsAuthenticated(false);
  //         setIsLoading(false);
  //         setAuthUser({});
  //       }
  //     });
  //   }, [auth.onAuthStateChanged]);

  return (
    <AuthUserContext.Provider value={values}>
      {children}
    </AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
