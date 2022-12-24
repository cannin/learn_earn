import * as React from "react"
import { useState, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby'

import _ from "lodash"

import Layout from "../components/layout"
import { Seo } from "../components/seo"

import Confetti from 'react-confetti'

import { useWindowSize } from "react-use"

const allColors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', 
    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', 
    '#FF5722', '#795548']
const reds = ['#8C0000', '#BD2000', '#FA1E0E', '#FFBE0F']
const greens = ['#425F57', '#749F82', '#A8E890', '#CFFF8D']

const Game = () => {
  if (typeof window !== 'undefined') {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
  } else {
    windowWidth = 1024
    windowHeight = 768
  }

  const [count, setCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  
  const [party, setParty] = useState(false)
  const [colors, setColors ] = useState(allColors)
  const [pieces, setPieces] = useState(0)
  const [run, setRun] = useState(false)

  const payout = 0.01 //parseFloat(process.env.GATSBY_PAYOUT)
  const game = "Multiplication" //process.env.GATSBY_GAME

  const tmp = useStaticQuery(graphql`
    query {
      allMultiplicationAnkiTxt(limit: 20) {
        nodes {
          question
          answer
        }
      }
    }
  `)
  let data = tmp.allMultiplicationAnkiTxt.nodes
  //data = _.shuffle(data)

  const [question, setQuestion] = useState(data[0]["question"])
  const [answer, setAnswer] = useState(data[0]["answer"])
  const [userAnswer, setUserAnswer] = useState("")
  const [answerValid, setAnswerValid] = useState(false)
  const [remainder, setRemainder] = useState(0)

  useEffect(() => { // Must use or infinite render error
    if(localStorage.getItem('remainder')) {
      const tmp = parseFloat(localStorage.getItem('remainder'))
      setRemainder(tmp)

      console.log("Storage: " + tmp)
    } else {
      setRemainder(0)
    }
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setUserAnswer(value)
    //setRun(false)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault() // Page refreshes otherwise

    console.log("1. Question: " + question + " Answer: " + answer + " UserAnswer: " + userAnswer + " Count: " + count)

    const isValid = validateField(userAnswer)
    setAnswerValid(isValid)

    const tmp = count < data.length ? (count + 1) : (data.length - 2)
    setCount(tmp)
    setQuestion(data[count]["question"])
    setAnswer(data[count]["answer"])

    console.log("2. Question: " + question + " Answer: " + answer + " UserAnswer: " + userAnswer + " Count: " + count)
  }

  const validateField = (value) => {
    //const fieldType = /^-?\d+$/.test(value) ? "number" : "string"
    const fieldType = "number"

    console.log("Answer: " + answer + " UserAnswer: " + value + " FieldType: " + fieldType)

    let isValid = null

    switch(fieldType) {
      case 'number':
        const formattedNumber = parseInt(value)
        isValid = formattedNumber == answer
  
        console.log("Answer: " + answer + " UserAnswer: " + formattedNumber + " IsValid: " + isValid)

        setAnswerValid(isValid)

        setParty(true)
        setRun(true)

        if(isValid) {
          setColors(greens)
          setPieces(2000)
          
          let curCorrectCount = correctCount + 1
          setCorrectCount(curCorrectCount)
        } else {
          setColors(reds)
          setPieces(20)

          let curCorrectCount = correctCount > 0 ? correctCount - 1 : 0
          setCorrectCount(curCorrectCount)
        }

        confettiDrop()

        break
      case 'string':
        // FIXME
        const formattedString = value.toLowerCase().trim()
        const formattedAnswer = answer.toLowerCase().trim()

        isValid = formattedString == formattedAnswer

        console.log("Answer: " + formattedAnswer + " UserAnswer: " + formattedString + " IsValid: " + isValid)

        setAnswerValid(isValid)

        setParty(true)
        setRun(true)

        if(isValid) {
          setColors(greens)
          setPieces(2000)
        } else {
          setColors(reds)
          setPieces(20)
        }

        confettiDrop()

        break
      default:
        break
    }

    const isReady = count > 1 && count % 10 == 0
    console.log("Count: " + count + " Test: " + JSON.stringify(isReady))

    if(isReady) {
      //console.log("HIT")
      let tmp = remainder + (correctCount * payout)
      tmp = tmp.toFixed(3)
      localStorage.setItem('remainder', tmp)

      setRemainder(tmp)
    }
  }

  const confettiDrop = () => setParty(party)

  return (
    <Layout>
      <div className="container text-center my-5">
        <Confetti 
          width={ windowWidth } 
          height={ windowHeight } //FIXME WebpackError: ReferenceError: window is not defined
          style={{ pointerEvents: 'none' }}
          numberOfPieces={ pieces }
          recycle={ false }
          colors={ colors }
          run={ run }
          onConfettiComplete={ confetti => {
            setParty(false)
            setRun(false)
            confetti.reset()
          }}
        />
        <h1>Game: { game }</h1>
        
        <p>Payout: { payout.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p>
        <p>Remainder: { remainder.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p>

        <p>Clicked: { count }</p>
        <p>Correct: { correctCount }; Payout: { (correctCount * payout).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p>
        
        <div className="party-container">
          <button
            type="button"
            className="btn btn-primary"
            onClick={ () => { setParty(!party); setRun(true); setPieces(2000); setColors(allColors) } }
          >
            Drop Confetti
          </button>
        </div>

        <h3>Question</h3>
        <p>{ question }</p>

        <form className="question-answer" onSubmit={ handleOnSubmit }>
          <div className="form-group col-xs-3 py-1">
            <label htmlFor="answer" className="form-label">Answer</label>
            <input type="text" className="form-control" id="answer" value={ userAnswer } onChange={ handleInputChange } />
          </div>
          <button id="answer-question" type="submit" className="btn btn-primary">Done</button>
        </form>

        <p><b>{ JSON.stringify(data) }</b></p>

        <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  )
}

export default Game

export const Head = () => (
    <Seo title="Game" />
)
