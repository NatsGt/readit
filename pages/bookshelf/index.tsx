import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SearchInput from '../../components/Search/SearchInput'
import SearchResults from '../../components/Search/SearchResults'
import { useAuth } from '../../hooks/AuthContext'

const Bookshelf = () => {
  const router = useRouter()
  const { isAuthenticated, signOut, user } = useAuth()
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])
  const handleSignOut = () => {
    console.log('sign out', isAuthenticated)
    signOut()
  }

  return (
    <div>
      Yeii {user.name}, you are in
      <button onClick={handleSignOut}>Sign out</button>
      <SearchInput setSearchQuery={setSearchQuery} />
      {searchQuery.length > 0 && <SearchResults query={searchQuery} />}
    </div>
  )
}

export default Bookshelf
