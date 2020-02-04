import React from "react"
import { Link } from "gatsby"
import Betterdoctor from "../components/Betterdoctor"


import Layout from "../components/layout"
import SEO from "../components/seo"

const ThirdPage = () => (
    <div>
        <h1>Search Doctors</h1>
            <br />
                <Betterdoctor />
            <br />
        <Link to="/">Go back to the homepage</Link>
    </div>
 
)

export default ThirdPage
