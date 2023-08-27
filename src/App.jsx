import { useState } from 'react'
import './App.css'
import ContributionTable from './components/ContributionTable'

function App() {
  const [count, setCount] = useState(0)

  return <ContributionTable/>
}

export default App
