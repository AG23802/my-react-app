import { LoginButton } from "../components/LoginButton"
import reactLogo from './../../assets/react.svg'
import viteLogo from '/vite.svg'
import { useAppStore } from "../../store/useAppStore"
import { useCounterStore } from "../../store/useCounterStore"
import Greeting from "../components/Greeting/Greeting"

export default function Home() {
  const user = useAppStore(state => state.user)
  const count = useCounterStore(state => state.count)
  const incrementAsync = useCounterStore(state => state.incrementAsync)
  
  return <>
    <h2>Home page</h2>
    <Greeting name={user?.name} userID={4} />
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
    <h1>Vite + React</h1>

    <div className="card">
      {user ? <p>Welcome back, {user.name}!</p> : <LoginButton />}
    </div>

    <button onClick={incrementAsync}>
      Count: {count}
    </button>
    </>
}