
const OpenScreen = ({setShowQuestions}) => {

    function setNumValue(){
        setShowQuestions(oldValue => !oldValue)
    }
  return (
    <div className="open-screen">
        <h1>Quizzical</h1>
        <p className="description">
            <button className="start-btn" onClick={()=> setNumValue()}>Start Quiz</button>
        </p>
    </div>
  )
}

export default OpenScreen