import { useState, useEffect } from 'react'
import OpenScreen from './components/OpenScreen'
import Questions from './components/Questions'
import yellowBlob from './assets/images/blobs-yellow.png'
import blueBlob from './assets/images/blobs-blue.png'

function App() {
const [showQuestions, setShowQuestions] = useState(false);


  return (
    <div className="App">
      <img src={yellowBlob} className="blobs-yellow"/>
      {showQuestions ? <Questions   setShowQuestions={setShowQuestions}/> : <OpenScreen path="/"  setShowQuestions={setShowQuestions}/>}
      <img src={blueBlob} className="blobs-blue"/>
      </div>
  )
}

export default App
