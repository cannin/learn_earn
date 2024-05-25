import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import {Seo} from "../components/seo"

const GamesPage = () => (
  <Layout>
    <div className="container my-5">
      <h1 className="text-center">Learn & Earn: Choose Game</h1>
      <ul>
        <li>
          <Link
            to="/game/animals"
          >
            Animals
          </Link>
        </li>
        <li>
          <Link
            to="/game/estados"
          >
            Capitales de Estados de Mexico
          </Link>
        </li>
        <li>
          <Link
            to="/game/multiplication_10x"
          >
            Multiplication: 10
          </Link>
        </li>
        <li>
          <Link
            to="/game/multiplication_20x"
          >
            Multiplication: 20
          </Link>
        </li>
        <li>
          <Link
            to="/game/us_capitals"
          >
            US State Capitals
          </Link>
        </li>
      </ul>
    </div>
  </Layout>
)

export default GamesPage

export const Head = () => (
    <Seo title="Games" />
)