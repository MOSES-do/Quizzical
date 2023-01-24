import {useState, useEffect} from 'react'
import SingleQuestion from './SingleQuestion'

const Questions = ({setShowQuestions}) => {
    const [questions, setQuestions] = useState([]);
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
    const [showWarning, setShowWarning] = useState();
    const [numCorrectAnswers, setNumCorrectAnswers] = useState(0)
    const [showResult, setshowResult] = useState(false);
    const [playAgain, setPlayAgain] = useState(false);
// console.log(questionsAndAnswers)


    useEffect(()=>{
        const fetchApi = async ()=>{
        const response = await fetch('https://opentdb.com/api.php?amount=5');
        const data = await response.json();
        // console.log("rendered")
        setQuestions(data.results);

        /*
        each item will be an object of
        -- question
        -- shuffled answers
        -- correct answer
        -- selected answer
        */ 
            setQuestionsAndAnswers(
                data.results.map((questionObject)=>{
                    return{
                        question: questionObject.question,
                        shuffledAnswers: shuffle([...questionObject.incorrect_answers, 
                            questionObject.correct_answer]),
                        correctAnswer: questionObject.correct_answer,
                        selectedAnswer: ""
                    }
                })
            )
        }

        fetchApi();
    }, [])

    // shuffle array of answers
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

       function updateAnswer(currentQuestion, answer){
            setQuestionsAndAnswers( questionsAndAnswers.map((questionObject) =>(
                questionObject.question === currentQuestion ? 
                {...questionObject, selectedAnswer:answer} : questionObject
                // console.log(questionObject.question, currentQuestion)
                ))    
            );
       }

    function checkAnswers(){
        //checking to see if selected answer in array is empty
        const notAllAnswered =  questionsAndAnswers.some((optionObject) => optionObject.selectedAnswer === ""); 
        // console.log(answered.length);
        setShowWarning(notAllAnswered);  

        if(!notAllAnswered) {
            questionsAndAnswers.forEach((optionObject) => {
             if(optionObject.selectedAnswer === optionObject.correctAnswer){
                    setNumCorrectAnswers(prevNum => prevNum + 1);
                }
            })
        }

        if( showWarning === false ){
            if(numCorrectAnswers || numCorrectAnswers === 0){
                setShowQuestions(false);
                setQuestions([]);
                 setNumCorrectAnswers([]);
            }
        }
        
        
        if(unattemptedQuestion.length === 0 ){
            setPlayAgain(true);
            setshowResult(true)
        }   
    }


    const unattemptedQuestion = questionsAndAnswers.filter((optionObject) => optionObject.selectedAnswer === "");
    // console.log(numCorrectAnswers)   

     
       
      
// console.log(questionsAndAnswers)
  return (
        <div className="questions">
            {questionsAndAnswers.map((question, index)=>(
                <SingleQuestion question={question.question} 
                allAnswers={question.shuffledAnswers} selectedAnswer={question.selectedAnswer}
                key={index}
                updateAnswer={updateAnswer}
                showResult={showResult}
                correctAnswer={question.correctAnswer}
                />
                 )
            )}
           

            {
            showWarning && unattemptedQuestion.length > 0 ? <p style={{color: showWarning ? "#ff5858":"#293264"}} className="message">
                There {unattemptedQuestion.length > 1 ? "are" : "is"} {unattemptedQuestion.length}
                 {unattemptedQuestion.length > 1 ? ' questions' : ' question'} not answered yet</p>
            : showWarning === false && <p style={{color: !showWarning ? "#293264":"#ff5858"}} 
            className="message">You scored {numCorrectAnswers} of {questionsAndAnswers.length} questions</p>  
            }
       
            {questions.length > 0 ? 
            <button onClick={checkAnswers} className="check-btn">{ playAgain === true ? "Play again" :"Check answers"}</button> 
            : null}     
        </div>
  )
}

export default Questions