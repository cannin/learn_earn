import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from 'gatsby'

import Layout from "../components/layout"
import {Seo} from "../components/seo"

const PayPage = () => {

  const [payout, setPayout] = useState(0)
  const [remainder, setRemainder] = useState(0)

  let curRemainder = null

  useEffect(() => {
    if(localStorage.getItem('remainder')) {
      curRemainder = localStorage.getItem('remainder')

      console.log("Storage: " + localStorage.getItem('remainder'))
    } else {
      curRemainder = 0
    }
  }, [])

  //setRemainder(curRemainder)

  const handleInputChange = (e) => {
    const value = e.target.value
    setPayout(value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault() // Page refreshes otherwise

    console.log("Before Click: " + localStorage.getItem('remainder'))
    const t1 = (remainder - payout) 
    const t2 = t1 > 0 ? t1 : 0
    localStorage.setItem('remainder', t2)
    console.log("After Click: " + localStorage.getItem('remainder'))
  }  

  return (
    <Layout>
      <div className="container text-center my-5">

        <h1>Payout</h1>
        <p>Remainder: { remainder.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p>
        <p>Payout: { payout.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p>

        <form className="payout" onSubmit={ handleOnSubmit }>
          <div className="form-group col-xs-3 py-1">
            <label htmlFor="payout" className="form-label">Payout?</label>
            <input type="text" className="form-control" id="payout" value={ payout } onChange={ handleInputChange } />
          </div>
          <button id="payout-submit" type="submit" className="btn btn-primary">Done</button>
        </form>

        <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  )
}

export default PayPage

export const Head = () => (
    <Seo title="Pay" />
)
