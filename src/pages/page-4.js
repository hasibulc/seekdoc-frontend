import React from "react"
import { Link } from "gatsby"
import Betterdoctor from "../components/Betterdoctor"
// import CreateDoctor from "../components/CreateDoctor"

import Layout from "../components/layout"
import SEO from "../components/seo"

// const URL = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=d994be9b7ff6bee4ddde72b8eb9b176f'

const ThirdPage = () => (
    <div>
        <h1>Search Doctors</h1>
        <hr />
            <Betterdoctor />
        <Link to="/">Go back to the homepage</Link>
    </div>
)

export default ThirdPage
