// import reactLogo from './../../assets/react.svg'
// import viteLogo from '/vite.svg'
import Logout from '../components/Logout'

export default function Home() {
  
  return <>
    <h2>Fruits App</h2>
    {/* <div>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div> */}

    <div className="card">
      <Logout />
    </div>
    </>
}