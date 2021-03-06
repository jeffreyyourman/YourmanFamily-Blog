import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faFacebook, faTwitter, faPinterest, faMedium, faInstagram, faGooglePlusG } from "@fortawesome/free-brands-svg-icons"
// import { faCheckSquare, faTable, faCoffee } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../components/Navbar';

library.add(fab, faFacebook, faTwitter, faPinterest, faMedium, faInstagram, faGooglePlusG)
const fbIcon = <FontAwesomeIcon style={{ color: '#4267B2', 'margin': '0px 20px 10px 0px', 'fontSize': '25px', 'width': '40px' }} icon={faFacebook} />
const twitterIcon = <FontAwesomeIcon style={{ color: '#1DA1F2', 'margin': '0px 20px 10px 0px', 'fontSize': '25px', 'width': '40px' }} icon={faTwitter} />
const instaIcon = <FontAwesomeIcon style={{ color: '#833AB4', 'margin': '0px 20px 10px 0px', 'fontSize': '25px', 'width': '40px' }} icon={faInstagram} />
const googleIcon = <FontAwesomeIcon style={{ color: '#db4a39', 'margin': '0px 20px 10px 0px', 'fontSize': '25px', 'width': '40px' }} className="googleIcon" icon={faGooglePlusG} />
const mediumIcon = <FontAwesomeIcon style={{ color: 'black', 'margin': '0px 20px 10px 0px', 'fontSize': '25px', 'width': '40px' }} className="googleIcon" icon={faMedium} />
const pinIcon = <FontAwesomeIcon style={{ color: '#E60023', 'margin': '0px 0px 10px 0px', 'fontSize': '25px', 'width': '40px' }} icon={faPinterest} />

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container-toplevel margin-top-0"
          style={{
            backgroundImage: `url('/img/blog-index.jpg')`,
          }}
        >
          <Navbar />
          <div className="full-width-image-container margin-top-0">
            <h1
              className="has-text-weight-bold is-size-1"
              style={{
                boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
                backgroundColor: '#f40',
                color: 'white',
                padding: '1rem',
              }}
            >
              Our Creative Stories
            </h1>
          </div>
        </div>
        <div style={{ 'margin': 'auto', 'width': '95%', "textAlign": 'center' }} className="columns">
          <div className="column ">
            <div className="placeHolderDiv"   >
              {/* <img src="https://via.placeholder.com/728x100?text=728x90+LeaderboardC/Ohttps://placeholder.com/banner-ads/" /> */}
            </div>          </div>
          <div className="column ">
            <div className="placeHolderDiv"   >
              {/* <img src="https://via.placeholder.com/728x100?text=728x90+LeaderboardC/Ohttps://placeholder.com/banner-ads/" /> */}
            </div>
          </div>
          <div className="column">
            <div className="socialIconsDiv" >
              <a title="facebook" target="_blank" href="https://facebook.com">
                {fbIcon}
              </a>
              <a title="twitter" target="_blank" href="https://twitter.com">
                {twitterIcon}
              </a>
              <a title="instagram" target="_blank" href="https://instagram.com">
                {instaIcon}
              </a>


              <a title="googlePlus" target="_blank" href="https://medium.com">
                {mediumIcon}
              </a>
              <a title="googlePlus" target="_blank" href="mailto:jeffreyyourman@gmail.com">
                {googleIcon}
              </a>

              <a title="pinterest" target="_blank" href="https://pinterest.com">
                {pinIcon}
              </a>
            </div>
          </div>
        </div>




        <div style={{ 'margin': 'auto', 'width': '95%' }} className="columns is-desktop">
          <nav className="navbar" style={{ backgroundColor: 'transparent', fontSize: '15px' }} rolrrre="navigation" ariaaa-label="main navigation">
            <div id="navbarBasicExample" >
              {/* THIS GOES ABOVE DIV classNameee="navbar-menu" */}
              <div className="navbar-start categoryStartItem">
                <a className="navbar-item categoryItem">
                  Arts & Crafts
                </a>
                <a className="navbar-item categoryItem">
                  Photography
                </a>
                <a className="navbar-item categoryItem">
                  SVG - Cricut Designing
                </a>
                <a className="navbar-item categoryItem">
                  Mother of the Bride Tips
                </a>
                <a className="navbar-item categoryItem">
                  Creative Crafts
                </a>
              </div>
            </div>
          </nav>
        </div>
        <section className="section blogSection is-desktop">
          <div className="container-fluid">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
