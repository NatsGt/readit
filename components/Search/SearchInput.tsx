import { useState, useEffect } from 'react'
import { Input } from '@mui/material'
import useDebounce from '../../hooks/useDebounce'

interface SearchInputProp {
  setSearchQuery: (val: string) => void
}

const SearchInput: React.FC<SearchInputProp> = ({ setSearchQuery }) => {
  const [inputText, setInputText] = useState<string>('')
  const debouncedValue = useDebounce(inputText)
  useEffect(() => {
    setSearchQuery(debouncedValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])
  return (
    <Input
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setInputText(e.target.value)
      }
    />
  )
}

export default SearchInput
