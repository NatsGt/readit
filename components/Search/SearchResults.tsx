import { useGetBooks } from '../../hooks/books'

interface SearchResultsProps {
  query: string
}

interface QueryResult {
  volumeInfo: {
    title: string
  }
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const { data, isLoading } = useGetBooks(query)
  console.log(data)

  return (
    <div>
      {isLoading && <div>loading</div>}
      {data?.items?.map((results: QueryResult, index: number) => {
        return <div key={index}>{results.volumeInfo.title}</div>
      })}
    </div>
  )
}

export default SearchResults
