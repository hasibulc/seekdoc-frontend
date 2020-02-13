import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import UserFavorites from "../components/UserFavorites"

const UserFavorite = () => (
    <Layout>
      <div style={{textAlign: 'center'}}>
        <UserFavorites  />
      </div>
    </Layout>
  )
  
  export default UserFavorite