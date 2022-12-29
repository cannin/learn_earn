import * as React from "react"
import PropTypes from "prop-types"

import AnimatedText from 'react-animated-text-content'

import "../styles/tmp.css"

const Animation = ({ text, isVisible, isWinner }) => {
  if (isWinner) {
    return (
      <AnimatedText
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
        className="animated-text-win"
        includeWhiteSpaces
        threshold={0.1}
        rootMargin="20%"
      >
        { text }
      </AnimatedText>
    )
  } else {
    return (
      <AnimatedText
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
        className="animated-text-loss"
        includeWhiteSpaces
        threshold={0.1}
        rootMargin="20%"
      >
        { text }
      </AnimatedText>   
    ) 
  }
}

Animation.propTypes = {
  text: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isWinner: PropTypes.string.isRequired
}

export default Animation
