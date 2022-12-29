import * as React from "react"
import { graphql } from "gatsby"

import Layout from '../components/layout'
import { Seo } from "../components/seo"

import { useState, useEffect } from 'react'

import Confetti from 'react-confetti'
//import { useWindowSize } from "react-use"
import _ from "lodash"

import config from "../../site-config"

const reds = ['#8C0000', '#BD2000', '#FA1E0E', '#FFBE0F']
const greens = ['#425F57', '#749F82', '#A8E890', '#CFFF8D']
const confettiCount = 2000

// export default cannot be an anonymous function
export default function GameTemplate({data}) {
  // Data
  //console.log("DATA 1: " + JSON.stringify(data))
  data = _.shuffle(data.allQuestionsAllTxt.nodes)
  //console.log("DATA 2: " + JSON.stringify(data))

  // Parameters
  const payout = config.payout
  const game = config.game
  const payoutQuestions = config.payoutQuestions
  const dailyLimit = config.dailyLimit
  const dailyQuestions = dailyLimit / payout

  let windowWidth = 2048
  let windowHeight = 1536

  if(typeof window !== 'undefined') {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
  }

  // State Parameters
  const [count, setCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  
  const [party, setParty] = useState(false)
  const [colors, setColors ] = useState(greens)
  const [pieces, setPieces] = useState(0)
  const [run, setRun] = useState(false)

  const [question, setQuestion] = useState("Type '1' to Start")
  const [answer, setAnswer] = useState(1)
  const [userAnswer, setUserAnswer] = useState("")
  const [answerValid, setAnswerValid] = useState(false)
  const [remainder, setRemainder] = useState(0)
  const [questionsRemaining, setQuestionsRemaining] = useState(payoutQuestions)
  const [dailyRemaining, setDailyRemaining] = useState(0)
  const [showAnswer, setShowAnswer] = useState("none")

  const [previousQuestion, setPreviousQuestion] = useState("")
  const [previousAnswer, setPreviousAnswer] = useState("")

  const [disableSubmit, setDisableSubmit] = useState("")

  useEffect(() => { // Must use or infinite render error
    if(localStorage.getItem('remainder')) {
      const tmp = parseFloat(localStorage.getItem('remainder'))
      setRemainder(tmp)

      console.log("remainder Storage: " + tmp)
    } else {
      setRemainder(0)
    }

    if(localStorage.getItem('dailyRemaining')) {
      const tmp = parseFloat(localStorage.getItem('dailyRemaining'))
      setDailyRemaining(tmp)

      console.log("dailyRemaining Storage: " + tmp)
    } else {
      setDailyRemaining(dailyQuestions)
    }
  }, [ dailyQuestions ])

  const checkResetDaily = () => {
    let startTime = '0'
    let endTime = '5'

    let currentDate = new Date()

    let startDate = new Date(currentDate.getTime())
    startDate.setHours(startTime)

    let endDate = new Date(currentDate.getTime())
    endDate.setHours(endTime)

    let valid = startDate < currentDate && endDate > currentDate

    return(valid)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setUserAnswer(value)
    setShowAnswer("none")
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

    if(count > 0) {
      setPreviousQuestion(question)
      setPreviousAnswer(answer)
    }

    // Reset
    if(questionsRemaining === 0) {
      setQuestionsRemaining(payoutQuestions)
      setCorrectCount(0)
    } else {
      setQuestionsRemaining(questionsRemaining - 1)
    }

    // Reset
    if(dailyRemaining <= 0) {
      setDailyRemaining(0)
      setDisableSubmit(true)

      console.log("disableSubmit: " + disableSubmit)
    } else {
      setDailyRemaining(dailyRemaining - 1)
      localStorage.setItem('dailyRemaining', dailyRemaining)
    }

    console.log("2. Question: " + question + " Answer: " + answer + " UserAnswer: " + userAnswer + " Count: " + count)

    console.log("remainder Storage: " + remainder)
    console.log("dailyRemaining Storage: " + dailyRemaining)
  }

  const validateField = (value) => {
    const fieldType = /^-?\d+$/.test(value) ? "number" : "string"
    //const fieldType = "number"

    console.log("Answer: " + answer + " UserAnswer: " + value + " FieldType: " + fieldType)

    let isValid = null

    switch(fieldType) {
      case 'number':
        const formattedNumber = parseInt(value)
        isValid = formattedNumber === answer
  
        console.log("Answer: " + answer + " UserAnswer: " + formattedNumber + " IsValid: " + isValid)

        setAnswerValid(isValid)

        setParty(true)
        setRun(true)

        if(isValid) {
          setColors(greens)
          setPieces(confettiCount)
          
          let curCorrectCount = correctCount + 1
          setCorrectCount(curCorrectCount)
        } else {
          setColors(reds)
          setPieces(confettiCount)

          let curCorrectCount = correctCount > 0 ? correctCount - 1 : 0
          setCorrectCount(curCorrectCount)

          setShowAnswer("initial")
        }

        confettiDrop()

        break
      case 'string':
        // FIXME
        const formattedString = value.toLowerCase().trim()
        const formattedAnswer = answer.toLowerCase().trim()

        isValid = formattedString === formattedAnswer

        console.log("Answer: " + formattedAnswer + " UserAnswer: " + formattedString + " IsValid: " + isValid)

        setAnswerValid(isValid)

        setParty(true)
        setRun(true)

        if(isValid) {
          setColors(greens)
          setPieces(confettiCount)
          
          let curCorrectCount = correctCount + 1
          setCorrectCount(curCorrectCount)
        } else {
          setColors(reds)
          setPieces(confettiCount)

          let curCorrectCount = correctCount > 0 ? correctCount - 1 : 0
          setCorrectCount(curCorrectCount)

          setShowAnswer("initial")
        }

        confettiDrop()

        break
      default:
        break
    }

    const isReady = count > 1 && count % payoutQuestions === 0
    console.log("Count: " + count + " Test: " + JSON.stringify(isReady))

    if(isReady) {
      //console.log("HIT")
      let tmp = remainder + (correctCount * payout)
      //tmp = tmp.toFixed(2)
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
        
        {/* <p>Payout Per Question: { payout.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p> */}
        {/* <p>Answered: { count }; Daily Remaining: { dailyRemaining }</p> */}
        <p>Payout Remainder: { remainder.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p>
        <p>Correct: { correctCount }; Payout: { (correctCount * payout).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p>
        <p>Questions Remaining: { questionsRemaining }</p>

        <h2>Question</h2>
        <p>{ question }</p>

        <h2>Answer</h2>
        <div className="container">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
              <fieldset disabled={ disableSubmit }>
                <form className="question-answer" onSubmit={ handleOnSubmit }>
                  <div className="form-group py-2">
                    <input type="text" className="form-control" id="answer" value={ userAnswer } onChange={ handleInputChange } />
                  </div>
                  <button id="answer-question" type="submit" className="btn btn-primary">Done</button>
                </form>
              </fieldset>
            </div>
            <div className="col-4"></div>
          </div>
        </div>

        <div style={{ display: showAnswer }}>  
          <h2>Previous Question</h2>
          <p>Question: { previousQuestion }; Correct Answer: { previousAnswer }</p>
        </div>

        {/* <Animation isVisible={ true } text={ "Text" } isWinner={ !showAnswer } /> */}

      </div>
    </Layout>
  )
}

export const Head = () => (
    <Seo />
)

// graphql call cannot be a function
export const gameQuery = graphql`
  query($setFilter: String!) {
    allQuestionsAllTxt(filter: {set: {eq: $setFilter}}) {
      nodes {
        question
        answer
      }
    }
  }
`


