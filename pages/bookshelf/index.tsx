import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { useGetBooks } from '../../hooks/books'

const Bookshelf = () => {
  const router = useRouter()
  const { values } = useAuth()
  const { data } = useGetBooks('isabel%20allende')
  useEffect(() => {
    if (!values?.isAuthenticated) {
      router.push('/')
    }
  }, [values])
  const handleSignOut = () => {
    console.log('sign out', values?.isAuthenticated)
    values?.signOut()
  }
  console.log(data)

  return (
    <div>
      Yeii {values?.user.name}, you are in
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}

export default Bookshelf
