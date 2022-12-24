import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import {Seo} from "../components/seo"

const AboutPage = () => (
  <Layout>
    <div className="container text-center my-5">
      <h1 >Learn & Earn</h1>
      <p>Learn & Earn lets you make money by solving questions</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  </Layout>
)

export default AboutPage

export const Head = () => (
    <Seo title="About" />
)