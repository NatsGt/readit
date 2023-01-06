import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthUserProvider } from '../hooks/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthUserProvider>
  )
}

export default MyApp
