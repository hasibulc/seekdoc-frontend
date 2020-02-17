import React from "react"
import { Link } from "gatsby"
import Betterdoctor from "../components/Betterdoctor"
import FaveDoctor from "../components/FaveDoctor"
import Layout from "../components/layout"



const FavoriteDoctor = () => (
    <Layout>
        <div>
            <h1>Favorite Doctors</h1>
            <hr />
                <FaveDoctor />
            <Link to="/">Go back to the homepage</Link>
        </div>
    </Layout>
)

export default FavoriteDoctor