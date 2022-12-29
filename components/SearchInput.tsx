import { useState, useEffect } from 'react'
import { Input } from '@mui/material'
import useDebounce from '../hooks/useDebounce'

interface SearchInputProp {
  setSearchQuery: (val: string) => void
}

const SearchInput: React.FC<SearchInputProp> = ({ setSearchQuery }) => {
  const [inputText, setInputText] = useState<string>('')
  const debouncedValue = useDebounce(inputText)
  useEffect(() => {
    if (debouncedValue?.length) {
      setSearchQuery(debouncedValue)
    }
  }, [debouncedValue])
  return <Input onChange={(e) => setInputText(e.target.value)} />
}

export default SearchInput
