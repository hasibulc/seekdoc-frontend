import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavItem from "react-bootstrap/NavItem"
import NavLink from "react-bootstrap/NavLink"
import NavbarBrand from "react-bootstrap/NavbarBrand"
import NavbarToggle from "react-bootstrap/NavbarToggle"
import NavbarCollapse from "react-bootstrap/NavbarCollapse"
import icon from "../images/icon.png"




const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      {/*<h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
        &emsp;
        <Link
          to="/create-doctor/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {'Create Doctor'}
        </Link>
        &emsp;
        <Link
          to="/search-doctor/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {'Search Doctor'}
        </Link>
        </h1>*/}
      {/*<nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search-doctor">Page4</Link>
            </li>
          </ul>
      </nav>*/}
      <Navbar>
      <NavbarBrand style={{color: `white`}} as={Link} to="/">SeekDoc
        <img alt="logo" src={icon} width="30" height="30"/>
      </NavbarBrand>
      <NavbarToggle aria-controls="basic-navbar-nav" />
      <NavbarCollapse id="basic-navbar-nav">
        <Nav fill variant="tabs" className="text-center ml-auto">
          <NavItem>
            <NavLink as={Link} to="/" style={{color: `white`}}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink as={Link} to="/create-doctor" style={{color: `white`}}>Create Doctor</NavLink>
          </NavItem>
          <NavItem>
            <NavLink as={Link} to="/search-doctor" style={{color: `white`}}>Search Doctor</NavLink>
          </NavItem>
          <NavItem>
            <NavLink as={Link} to="/favorite-doctor" style={{color: `white`}}>Favorite Doctor</NavLink>
          </NavItem>
        </Nav>
        </NavbarCollapse>
      </Navbar>
      
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
