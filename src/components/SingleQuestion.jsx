import React from 'react'
import {decode} from 'html-entities'

const SingleQuestion = ({question, allAnswers, updateAnswer, selectedAnswer, showResult, correctAnswer}) => {
    // console.log(question);
    function clickAnswer(answer, currentQuestion){
        // console.log( answer ) // checks each question
        updateAnswer(currentQuestion, answer);
        // console.log(  answer)

    }
  return (
    <div className="single-question">
        <h2 >{decode(question)}</h2>
        <>
        {allAnswers.map((answer, index) =>(
            <button key={index} onClick={()=> clickAnswer(answer, question)} className={`answer-btn 
                    ${
                    answer === selectedAnswer
                        ? 'selected'
                            : ''
                    }
                    
                    ${showResult && answer === correctAnswer ? 'correct' : ''}
                    ${showResult && answer === selectedAnswer && 
                        answer !== correctAnswer ? 'incorrect' : ''
                    }
                    ${showResult && answer !== correctAnswer ? 'dimmed' : ''}
                    `}
                    disabled={showResult}
                    >
                        {decode(answer)}
            </button>
        ))
        }

        </>       
    </div> 
  )
}

export default SingleQuestion