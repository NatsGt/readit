import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SearchInput from '../../components/SearchInput'
import { useAuth } from '../../hooks/AuthContext'
import { useGetBooks } from '../../hooks/books'

const Bookshelf = () => {
  const router = useRouter()
  const { isAuthenticated, signOut, user } = useAuth()
  const [searchQuery, setSearchQuery] = useState()
  const { data } = useGetBooks('isabel%20allende')
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated])
  const handleSignOut = () => {
    console.log('sign out', isAuthenticated)
    signOut()
  }
  console.log(data)

  return (
    <div>
      Yeii {user.name}, you are in
      <button onClick={handleSignOut}>Sign out</button>
      <SearchInput />
    </div>
  )
}

export default Bookshelf
