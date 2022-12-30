import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { GoogleBooks } from '../types/googleBooks'

export const useGetBooks = (query: string) => {
  return useQuery<GoogleBooks>(['books', query], () =>
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((res) => res.data)
  )
}
