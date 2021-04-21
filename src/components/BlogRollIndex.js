import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { kebabCase } from 'lodash'


const searchIcon = <FontAwesomeIcon icon={faSearch} />

class BlogRoll extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { searchedArr: null, blogSearchValue: "" };
    this.getSearchVal = this.getSearchVal.bind(this);
    this.getSearches = this.getSearches.bind(this);
  }
  getSearchVal(event) {
    console.log('event value', event.target.value);
    this.setState({ blogSearchValue: event.target.value })
  }
  getSearches(keyword, data) {
    console.log('parameter data', data);
    // var data = ["Hello world, welcome to the universe.", "Food blog", "my food blog", "arts and crafts", "Art stuff"];
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
    posts.forEach((post) => {
      if (post.node.frontmatter.tags) {
        post.node.frontmatter.tags.forEach(element => {
          tags.push(element)
        });
      }
    });

    return (
      <div className="columns is-multiline is-mobile">
        <div style={{padding:'0px'}}className="column">
          {posts &&
            posts.map(({ node: post }) => (
              <div className="column box cardColumnContainerIndex is-desktop is-mobile" key={post.id}>
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
            ))}
        </div>
        
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
      query BlogRollMainQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 200)
              id
              fields {
                slug
              }
              frontmatter {
                title
                tags
                templateKey
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
