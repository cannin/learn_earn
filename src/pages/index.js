import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'

import Layout from "../components/layout"
import { Seo } from "../components/seo"

import Confetti from 'react-confetti'

const IndexPage = () => (
  <Layout>
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">Hello world ! </h1>
          <p className="lead text-muted"> Welcome to this Boostrap 5 Gatsby Starter</p>
          <p>
            <FontAwesomeIcon icon={faPiggyBank} size="4x" />
          </p>

          <h2>Instruction</h2>
          <p>Solve 10 math examples as fast as possible.</p>
          <p>Each correct answer gives a Coin.</p>
          <p>Each wrong answer kills a Coin.</p>

          <StaticImage
            src="../images/gatsby-astronaut.png"
            width={300}
            quality={95}
            formats={["AUTO", "WEBP"]}
            alt="A Gatsby astronaut"
            className="img-fluid"
          />

          <Confetti width={ window.innerWidth } height={  window.innerHeight } />

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

export default IndexPage

export const Head = () => (
    <Seo />
)