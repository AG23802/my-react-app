import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useCounter from './hooks/useCounter'
import useLogger from './effects/useLogger'
import Fruits from './ui/components/Fruits/Fruits'
import { FruitProvider } from './context/FruitContext'
import { SearchBar } from './ui/components/SearchBar/SearchBar'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './ui/pages/Home'
import FruitsPage from './ui/pages/FruitsPage'

function App() {
  const { count, increment } = useCounter(0);
  useLogger(count)

  return (
    <>
    <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/fruits">Fruits</Link>
      </nav>

          <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fruits" element={<FruitsPage />} />
      </Routes>


      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <FruitProvider>
        <SearchBar />
        <Fruits />
      </FruitProvider>

      <div className="card">
        <button onClick={increment}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
