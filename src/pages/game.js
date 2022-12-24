import * as React from "react"
import { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby'

import _ from "lodash"

import Layout from "../components/layout"
import { Seo } from "../components/seo"

import Confetti from 'react-confetti'

import { useWindowSize } from "react-use"

import AnimatedText from 'react-animated-text-content'

import config from "../../site-config"

/*
TODO
* Show correct answer
* Daily limit
* Pin
* Stats: Total payout, total games
* Fix innerWidth
* Better error
* Test other questions
* Stopwatch
* Add logo
* Confetti green all the way down
* Offline 
* Better background (IGNORE)
* Better home (DONE)
* Netlify ENV (DONE)
* Animate (DONE)
* Smaller input box (DONE)
* About (DONE)
*/

const allColors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', 
    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', 
    '#FF5722', '#795548']
const reds = ['#8C0000', '#BD2000', '#FA1E0E', '#FFBE0F']
const greens = ['#425F57', '#749F82', '#A8E890', '#CFFF8D']

const Game = () => {
  let windowWidth = 2048
  let windowHeight = 1536

  if(typeof window !== 'undefined') {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
  }

  const [count, setCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  
  const [party, setParty] = useState(false)
  const [colors, setColors ] = useState(allColors)
  const [pieces, setPieces] = useState(0)
  const [run, setRun] = useState(false)

  // Parameters
  const payout = config.payout
  const game = config.game
  const payoutQuestions = config.payoutQuestions
  const dailyLimit = config.dailyLimit
  const dailyQuestions = dailyLimit / payout

  const tmp = useStaticQuery(graphql`
    query {
      allQuestionsTxt(limit: 1000) {
        nodes {
          question
          answer
        }
      }
    }
  `)
  let data = tmp.allQuestionsTxt.nodes
  data = _.shuffle(data)

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
  }, [])

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
    if(questionsRemaining == 0) {
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

          setShowAnswer("initial")
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

    const isReady = count > 1 && count % payoutQuestions == 0
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
        
        <p>Payout Per Question: { payout.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p>
        <p>Payout Remainder: { remainder.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p>

        <p>Answered: { count }; Daily Remaining: { dailyRemaining }</p>
        <p>Correct: { correctCount }; Payout: { (correctCount * payout).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</p>
        <p>Questions Remaining for Payout: { questionsRemaining }</p>

        <h2>Question</h2>
        <p>{ question }</p>

        <h2>Answer</h2>
        <div className="container">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
              <fieldset disabled={disableSubmit}>
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

      </div>
    </Layout>
  )
}

/*        <div className="party-container py-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={ () => { setParty(!party); setRun(true); setPieces(2000); setColors(allColors) } }
          >
            Drop Confetti
          </button>
        </div>*/

//        <p><b>{ JSON.stringify(data) }</b></p>

/*        <AnimatedText
          type="chars"
          animation={{
            x: '200px',
            y: '-20px',
            scale: 1.1,
            ease: 'ease-in-out',
          }}
          animationType="wave"
          interval={0.06}
          duration={0.8}
          tag="p"
          className="animated-text"
          includeWhiteSpaces
          threshold={0.1}
          rootMargin="20%"
        >
          Winner!
        </AnimatedText>*/

/*        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Question: { question }</p>
                <p>Correct Answer: { answer }</p>
                <p>Your Answer: { userAnswer }</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
*/

export default Game

export const Head = () => (
    <Seo title="Game" />
)
