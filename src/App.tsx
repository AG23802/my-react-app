import './App.css'
import useLogger from './effects/useLogger'
import { FruitProvider } from './context/FruitContext'
import { Route, Routes } from 'react-router-dom'
import Home from './ui/pages/Home'
import FruitsPage from './ui/pages/FruitsPage'
import FruitDetails from './ui/pages/FruitsDetails'
import Cart from './ui/pages/Cart/Cart'
import { Sidebar } from './ui/components/Sidebar/Sidebar'
import { SidebarToggle } from './ui/components/SidebarToggle'
import { useCounterStore } from './store/useCounterStore'
import { Register } from './ui/pages/Register/Register'

function App() {
  const count = useCounterStore(state => state.count)

  useLogger(count)

  return (
    <>
      <SidebarToggle />
      <Sidebar />
      <FruitProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fruits" element={<FruitsPage />} />
          <Route path="/fruits/:id" element={<FruitDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </FruitProvider>


    </>
  )
}

export default App
