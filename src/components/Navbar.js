import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
            navBarActiveClass: 'is-active',
          })
          : this.setState({
            navBarActiveClass: '',
          })
      }
    )
  }

  render() {
    return (
      <nav
        className="navbar"
        role="navigation"
        aria-label="main-navigation"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            {/* <div className="navbar-start has-text-centered" style={{ color: 'black' }}>
              
            </div> */}
            <div className="navbar-end has-text-centered">
              <Link className="navbar-item" to="/about" style={{color:'black'}}>
                About
              </Link>
              {/* <Link className="navbar-item" to="/products" style={{color:'black'}}>
                Products
              </Link> */}
              <Link className="navbar-item" to="/blog" style={{color:'black'}}>
                Blog
              </Link>
              <Link className="navbar-item" to="/contact" style={{color:'black'}}>
                Contact
              </Link>
              {/* <Link className="navbar-item" to="/contact/examples" style={{color:'black'}}>
                Form Examples
              </Link> */}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
