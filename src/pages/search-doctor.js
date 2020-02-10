import React from "react"
import { Link } from "gatsby"
import Betterdoctor from "../components/Betterdoctor"
// import CreateDoctor from "../components/CreateDoctor"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ThirdPage = () => (
    <Layout>
        <div>
            <h1>Search Doctors</h1>
            <hr />
                <Betterdoctor />
            <Link to="/">Go back to the homepage</Link>
        </div>
    </Layout>
)

export default ThirdPage
