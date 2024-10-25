import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/", 
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
