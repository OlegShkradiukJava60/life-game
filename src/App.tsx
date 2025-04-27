import { randomNumber } from "./utils/random"



function App() {

  return <div>
    {Array.from({length: 20},() =>randomNumber(0, 1)).map(n => <div>{n}</div>)}
  </div>
}

export default App
