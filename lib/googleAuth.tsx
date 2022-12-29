import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from './firebase'

const provider = new GoogleAuthProvider()

const signInGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      GoogleAuthProvider.credentialFromResult(result)

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      GoogleAuthProvider.credentialFromError(error)
      // ...
    })
}

const signOutGoogle = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error)

      // An error happened.
    })
}

export { signInGoogle, signOutGoogle }
