import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { kebabCase } from 'lodash'
// import RightSideSection from './RightSideSection';


const searchIcon = <FontAwesomeIcon icon={faSearch} />

class BlogRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchedArr: null, blogSearchValue: "" };
    this.getSearchVal = this.getSearchVal.bind(this);
    this.getSearches = this.getSearches.bind(this);
  }
  getSearchVal(event) {
    console.log('event', event.target.value)
    this.setState({ blogSearchValue: event.target.value })
  }
  getSearches(keyword, data) {

    var newStr = data.filter((lowerme) => {
      const element = lowerme;
      let title = element.node.frontmatter.title
      var strLowerCase = title.toLowerCase();
      var isKeywordIncluded = strLowerCase.includes(keyword.toLowerCase());
      if (isKeywordIncluded) {
        return lowerme;
      }
    });
    this.setState({ searchedArr: [...newStr] });
    return newStr;
  }
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    let tags = []

    console.log('posts', posts);
    console.log('this.state.searchedArr', this.state.searchedArr);

    posts.forEach((post) => {
      if (post.node.frontmatter.tags) {
        post.node.frontmatter.tags.forEach(element => {
          tags.push(element)
        });
      }
    });
    const uniqueSet = new Set(tags);
    const backToArray = [...uniqueSet];
    return (
      <div className="columns">
        <div className="column is-9" style={{ textAlign: 'center', paddingTop: '0px' }}>
          {posts &&
            posts.map(({ node: post }) => {

              return <div className="column box cardColumnContainer is-desktop is-mobile" key={post.id}>
                <div className="cardContainer">
                  <div className="headerContainer">
                    <div className="imageDiv">
                      <PreviewCompatibleImage
                        imageInfo={{
                          className: 'imageStyle',
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="bodyContainer">

                    <span style={{ fontSize: '12px' }} className="subtitle">
                      {post.frontmatter.date}
                    </span>
                    <p style={{ 'whiteSpace': 'break-spaces' }} className="post-meta">
                      <Link
                        className="title has-text-primary is-size-4"
                        to={post.fields.slug}
                      >
                        {`${post.frontmatter.title}`}
                      </Link>

                    </p>
                    <p styyyle={{ 'whiteSpace': 'break-spaces' }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="footerContainer">
                    <p style={{ 'whiteSpace': 'break-spaces', fontSize: '12px' }} className="post-meta">
                      <Link
                        className="title has-text-primary is-size-5"
                        to={post.fields.slug}
                      >
                        Read more {'>'}
                      </Link>

                    </p>
                  </div>
                </div>
              </div>
            })}
        </div>
        <div className="column rightSideSectionColumn">
          
            <div className="rightSideSection box blogSection">

              <div className="column rightSideSectionColumn" style={{ 'paddingRight': '0px' }}>
                <div class="field has-addons">
                  <div class="control">
                    <input onChange={this.getSearchVal} className="input is-medium" type="text" placeholder="Search blogs" />

                    {/* <input class="input" type="text" placeholder="Find a repository" /> */}
                  </div>
                  <div class="control">
                    <button className="button is-info inputsearchBtn"
                      onClick={() => {
                        this.getSearches(this.state.blogSearchValue, posts)
                        this.setState({ blogSearchValue: "" })
                      }}>
                      {searchIcon}
                    </button>
                  </div>
                </div>
              </div>
              <h3>Newest</h3>
              {!this.state.searchedArr ? (
                <p>Search for Blogs</p>
              ) : this.state.searchedArr.length !== 0 ? this.state.searchedArr.map((blogItem, index) => (
                <>
                  {/* <PreviewCompatibleImage
                  imageInfo={{
                    image: blogItem.node.frontmatter.featuredimage,
                    alt: `featured image thumbnail for post ${blogItem.node.frontmatter.title}`,
                  }} /> */}
                  <div style={{ marginBottom: '20px' }}>
                    <Link key={Math.random()} to={blogItem.node.fields.slug}>
                      <h3 style={{ 'marginBottom': 0 }}>{blogItem.node.frontmatter.title}</h3>
                      <p>{blogItem.node.frontmatter.date}</p>
                    </Link>
                  </div>
                </>
              )) : <p>No blogs found</p>}
            </div>
            <div className="rightSideSection box tagSection">
              <h3>Search by Tags:</h3>
              <ul className="taglist">
                {backToArray ? backToArray.map((tag, index) => (
                  <li key={index + 1000} className="allTags">
                    <Link className="tagLink" to={`/tags/${kebabCase(tag)}/`}>
                      {tag.padEnd(100, ' ')}
                    </Link>
                  </li>
                )) : <p>No Tags found</p>}
              </ul>

            </div>

            <div className="rightSideSection box tagSection">
              <h3>Ad space</h3>
              <ul className="taglist">
                {['ad1', 'ad2', 'ad3'] ? ['ad1', 'ad2', 'ad3'].map((tag, index) => (
                  <li key={index + 1000} className="allTags">
                    {tag.padEnd(100, ' ')}
                  </li>
                )) : <p>No ads found</p>}
              </ul>
            </div>
          
        </div>



        {/* <RightSideSection posts
this.state.blogSearchValue
getSearchVal()
this.getSearches(this.state.blogSearchValue, posts)
this.setState({ blogSearchValue: "" })
this.state.searchedArr/> */}

      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      tags: PropTypes.array,
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 150)
              id
              fields {
                slug
              }
              frontmatter {
                title
                tags
                templateKey
                mytest
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
