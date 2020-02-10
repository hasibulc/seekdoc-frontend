import React from "react"
import { Link } from "gatsby"
import Betterdoctor from "../components/Betterdoctor"
import Ratedoctor from "../components/Ratedoctor"
import Layout from "../components/layout"

const FavoriteDoctor = () => (
    <Layout>
        <div>
            <h1>Rate and Review Doctors</h1>
            <hr />
                <Ratedoctor />
            <Link to="/">Go back to the homepage</Link>
        </div>
    </Layout>
)

export default FavoriteDoctor