import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import {Seo} from "../components/seo"

const AboutPage = () => (
  <Layout>
    <div className="container my-5">
      <h1 className="text-center">Learn & Earn</h1>
      <h2 className="text-center">Learn & Earn Lets Kids Make Money by Solving Questions</h2>
      <p>Let your kid earns money using their brains. Each time your child solves a question they make money.</p>
      <p><b>PARENTS ARE FULLY RESPONSIBLE FOR PAYMENTS!!!</b></p>
      <p>The app keeps records of earned money. Parents set a reward (TODO) for each question and parents pay out cash to their child.</p>
      <p>Kids see an instant result/effect and it motivates them to practice. Additionally, kids get REAL money in cash from parents which motivates them even more because kids can see the money in their hands and spend it.</p>
      <p>This rewards children for extra practice on school lessons rather than other games.</p>
      <p>Parents are responsible for paying kids quickly. If you fail to pay, your child could lose motivation. The "Pay" page allows you to substract what you have paid.</p>
      <p>TODO: More stats and allow question customization.</p>
    </div>
  </Layout>
)

// <Link to="/">Go back to the homepage</Link>

export default AboutPage

export const Head = () => (
    <Seo title="About" />
)