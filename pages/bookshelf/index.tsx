import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../../hooks/AuthContext'

const Bookshelf = () => {
  const router = useRouter()
  const { values } = useAuth()
  useEffect(() => {
    if (!values?.isAuthenticated) {
      router.push('/')
    }
  }, [values])
  const handleSignOut = () => {
    console.log('sign out', values?.isAuthenticated)
    values?.signOut()
  }
  return (
    <div>
      Yeii {values?.user.name}, you are in
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}

export default Bookshelf
