import * as React from "react"
import { useState, useEffect } from "react"

import Layout from "../components/layout"
import {Seo} from "../components/seo"

const PayPage = () => {

  const [payout, setPayout] = useState(0)
  const [remainder, setRemainder] = useState(0)

  let curRemainder = null

  useEffect(() => { // Must use or infinite render error
    if(localStorage.getItem('remainder')) {
      const tmp = parseFloat(localStorage.getItem('remainder'))
      setRemainder(tmp)

      console.log("remainder Storage: " + tmp)
    } else {
      setRemainder(0)
    }
  }, [])

  const handleInputChange = (e) => {
    let value = parseFloat(e.target.value)
    if(Number.isNaN(value)) {
      value = 0
    }

    setPayout(value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault() // Page refreshes otherwise

    if(payout > 0) {
      console.log("Before Click: " + localStorage.getItem('remainder'))
      const t1 = (remainder - payout) 
      const t2 = t1 > 0 ? t1 : 0
      localStorage.setItem('remainder', t2)
      setRemainder(t2)
      console.log("After Click: " + localStorage.getItem('remainder'))
    } else {
      console.log("ERROR: Payout less than 0")
    }
  }  

  return (
    <Layout>
      <div className="container text-center my-5">

        <h1>Payout</h1>
        <p>Remainder: { remainder.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p>
        <p>Payout: { payout.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p>

        <div className="container">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
              <form className="payout" onSubmit={ handleOnSubmit }>
                <div className="form-group py-2">
                  <label htmlFor="payout" className="form-label">Payout Amount?</label>
                  <input type="text" className="form-control" id="payout" onChange={ handleInputChange } />
                </div>
                <button id="payout-submit" type="submit" className="btn btn-primary">Done</button>
              </form>
            </div>
            <div className="col-4"></div>
          </div>
        </div> 

      </div>
    </Layout>
  )
}

export default PayPage

export const Head = () => (
    <Seo title="Pay" />
)
