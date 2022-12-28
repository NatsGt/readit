import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetBooks = (query: string) => {
  return useQuery(['books'], () =>
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((res) => res.data)
  )
}
