import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { auth } from '../lib/firebase'
import { signInGoogle, signOutGoogle } from '../lib/googleAuth'

interface AuthUser {
  name: string
  email: string
}

interface ContextValue {
  values?: {
    user: AuthUser
    isLoading: boolean
    isAuthenticated: boolean
    signIn: () => void
    signOut: () => void
  }
}

interface AuthUserContext extends ContextValue {
  children: React.ReactNode
}

const AuthUserContext = createContext<ContextValue>({} as ContextValue)

export const AuthUserProvider: React.FC<AuthUserContext> = ({ children }) => {
  const [authUser, setAuthUser] = useState({} as AuthUser)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const values = useMemo(
    () => ({
      user: authUser,
      isLoading: isLoading,
      isAuthenticated: isAuthenticated,
      signIn: () => signInGoogle(),
      signOut: () => signOutGoogle()
    }),
    [authUser]
  )
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        setIsLoading(false)
        setAuthUser({
          name: user.displayName ?? '',
          email: user.email ?? ''
        })
      } else {
        setIsAuthenticated(false)
        setIsLoading(false)
        setAuthUser({} as AuthUser)
      }
    })
  }, [auth])

  return (
    <AuthUserContext.Provider value={{ values }}>
      {children}
    </AuthUserContext.Provider>
  )
}

export const useAuth = () => useContext(AuthUserContext)
