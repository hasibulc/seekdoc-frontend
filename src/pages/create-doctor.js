import React from "react"
import { Link } from "gatsby"
import { Query } from 'react-apollo';
import { gql }from 'graphql-tag';

import Layout from "../components/layout"
import SEO from "../components/seo"
import CreateDoctor from "../components/CreateDoctor"
import Doctors from "../components/Doctors";

const SecondPage = () => (
  <Layout>
    <div style={{textAlign: 'center'}}>
      <CreateDoctor  />
    </div>
    <br />
    <Doctors />
    <hr />
    <Link to="/">Go back to the homepage</Link>
    <br />
    <Link to="/search-doctor/">Search Doctor</Link> 
    <br />
    <Link to="/page-3/">Go to page 3</Link> 
  </Layout>
)

export default SecondPage

// const DOCTORS_QUERY = () => gql`
//   query {
//     allDoctors {
//       id
//       firstName
//       lastName
//       bio
//       locationLat
//       locationLong
//       locationName
//       street
//       city
//       state
//       zip
//     }
//   }
// `;

// const updateDoctors = (cache, {data: { createDoctor }}) => {
//   const { doctors } = cache.readQuery({ query: DOCTORS_QUERY});
//   cache.writeQuery({
//     query: DOCTORS_QUERY,
//     data: { doctors: doctors.concat([createDoctor.doctor])},
//   })
// }

// onCreateDoctor={updateDoctors}

// <Layout>
//     <SEO title="Page two" />
//     <h1>Hi from the second page</h1>
//     <p>Welcome to page 2</p>
//     <hr />
//     <br />
//     <div>
//       <CreateDoctor  />
//     </div>
//     <br />
//     <hr />
//     <Link to="/">Go back to the homepage</Link>
//     <br />
//     <Link to="/page-3/">Go to page 3</Link> 
//   </Layout>