import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Doctors from "../components/Doctors"
import Betterdoctor from "../components/Betterdoctor"



//Apollo
// import { ApolloProvider } from 'react-apollo';
// import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';

// const link = createHttpLink({
//   uri: 'https://localhost:3000/graphql'
// });

// const client = new ApolloClient({
//   link: link,
//   cache: new InMemoryCache()
// });

const IndexPage = () => (
  <Layout>
  
    <div>
      {/*<Doctors />  
      <Link to="/create-doctor/">Create Doctor</Link> 
      <br />
      <Link to="/page-3/">Go to page 3</Link> 
      <br />
      <Link to="/search-doctor/">Search Doctor</Link>*/}
      <h1>Search Doctors</h1>
      <hr />
        <Betterdoctor />
    </div>

  </Layout>
)
  
  export default IndexPage
  
  {/*
 <Layout>

    <SEO title="Home" />
     <h1>Hi people</h1>
     <p>Welcome to your  Gatsby site.</p>
     <p>Now go build something great.</p>
     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
       <Image />
     </div>
     
     </Layout>
     
   */}