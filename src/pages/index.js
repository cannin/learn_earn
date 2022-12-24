import * as React from "react"
import { Link } from "gatsby"
//import { StaticImage } from "gatsby-plugin-image"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'

import Layout from "../components/layout"
import { Seo } from "../components/seo"

import Confetti from 'react-confetti'

//import { useWindowSize } from "react-use"

const IndexPage = () => { 

  const windowWidth = (typeof window !== 'undefined') ? window.innerWidth : 2048
  const windowHeight = (typeof window !== 'undefined') ? window.innerHeight : 1536

  return (
    <Layout>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Learn & Earn</h1>
            <p className="lead text-muted">Earn money while answering questions</p>
            <p>
              <FontAwesomeIcon icon={faPiggyBank} size="8x" color="#DAA520" className="faa-tada animated" />
            </p>

            <h2>Instructions</h2>
            <p>Solve 10 math examples as fast as possible.</p>
            <p>Each correct answer gives a coin</p>
            <p>Each wrong answer kills a coin</p>

            <Confetti width={ windowWidth } height={ windowHeight } colors={ ['#DAA520'] } />

          </div>
        </div>
        <div className="row">
          <Link to="/about/" className="btn btn-primary my-2">About</Link>
          <Link to="/game/" className="btn btn-secondary my-2">Go to Game</Link>
          <Link to="/pay/" className="btn btn-secondary my-2">Go to Pay</Link>
        </div>
      </section>
    </Layout>
  )
}

/*            <StaticImage
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