import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

// const ThirdPage = () => (
//   <Layout>
//     <SEO title="Page threee" />
//     <h1>Hi from the threend page</h1>
//     <p>Welcome to page 3</p>
//     <Link to="/">Go back to the homepage</Link>
//   </Layout>
// )

class ThirdPage extends Component {

    render() {

        return (
            <div>
                <h1>HI</h1>
                <Link to="/">Go back to the homepage</Link>
            </div>
        )

    }
}

export default ThirdPage
