import * as React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPiggyBank, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons'

import Layout from "../components/layout"
import { Seo } from "../components/seo"

import Confetti from 'react-confetti'

import { useWindowSize } from "react-use"

const IndexPage = () => { 

  let windowWidth = 2048
  let windowHeight = 1536

  if(typeof window !== 'undefined') {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
  }

  return (
    <Layout>
      <div className="container text-center py-5">
        <div className="row">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Learn & Earn</h1>
            <p className="lead text-muted">Earn money while answering questions</p>
            <p>
              <FontAwesomeIcon icon={faPiggyBank} size="6x" color="#DAA520" className="faa-tada animated" />
            </p>

            <h2>Instructions</h2>
            <p>Answer questions as fast as possible</p>
            <p>Each correct answer gives a coin</p>
            <p>Each wrong answer takes a coin</p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <div className="p-1"><Link to="/game/" className="btn btn-primary">Go to Game</Link></div>
          <div className="p-1"><Link to="/about/" className="btn btn-secondary">Go to About</Link></div>
        </div>
        <Confetti width={ windowWidth } height={ windowHeight } colors={ ['#DAA520', '#C0C0C0'] } />
      </div>
    </Layout>
  )
}

/*
            import { StaticImage } from "gatsby-plugin-image"
            <StaticImage
              src="../images/gatsby-astronaut.png"
              width={300}
              quality={95}
              formats={["AUTO", "WEBP"]}
              alt="A Gatsby astronaut"
              className="img-fluid"
            />
*/
export default IndexPage

export const Head = () => (
    <Seo />
)