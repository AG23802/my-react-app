import "./App.css";
import { FruitProvider } from "./context/FruitContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./ui/pages/Home";
import FruitsPage from "./ui/pages/FruitsPage";
import FruitDetails from "./ui/pages/FruitsDetails";
import Cart from "./ui/pages/Cart/Cart";
import { Overlay } from "./ui/components/Overlay/Overlay";
import { Register } from "./ui/pages/Register/Register";
import { UserProvider } from "./context/UserContext";
import Login from "./ui/components/Login/Login";
import ProtectedRoute from "./ui/components/ProtectedRoute";
import Header from "./ui/components/Header/Header";
import Checkout from "./ui/pages/Checkout";
import useAuth from "./hooks/useAuth";

function App() {
  function MainApp() {
    const { user } = useAuth()

    return (
      <>
        <Header />
        <Overlay />

        <div className="p-5">
          <Routes>
            {/* 1. PUBLIC ROUTES */}
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            {/* 2. THE DYNAMIC HOME PATH */}
            <Route path="/" element={<Home />} />

            <Route path="/fruits" element={<FruitsPage />} />
              <Route path="/fruits/:id" element={<FruitDetails />} />
              <Route path="/cart" element={<Cart />} />

            {/* 3. PROTECTED ROUTES */}
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </div>
      </>
    );
  }

  return (
    <UserProvider>
      <FruitProvider>
        <MainApp />
      </FruitProvider>
    </UserProvider>
  );
}

export default App;
