import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import {Seo} from "../components/seo"

import config from "../../site-config"

const Games = () => {
  return(
    <Layout>
      <div className="container my-5">
        <h1 className="text-center">Learn & Earn: Choose Game</h1>
        <ul>
          {Object.entries(config.sets).map(([key, value]) => (
          <li key={key}>
            <Link to={`/game/${key}`}>
              {value}
            </Link>
          </li>
        ))}
        </ul>
      </div>
    </Layout>
  )
}

export default Games

export const Head = () => (
    <Seo title="Games" />
)