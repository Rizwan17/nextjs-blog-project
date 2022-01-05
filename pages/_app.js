import '../styles/globals.css'
import Layout from '../components/Layout'
import { StoreProvider } from '../client/context'

// every page pass through this component so this component will have access to all page components props 
function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

export default MyApp
