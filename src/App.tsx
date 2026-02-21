import "./App.css";
import { FruitProvider } from "./context/FruitContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./ui/pages/Home";
import FruitsPage from "./ui/pages/FruitsPage";
import FruitDetails from "./ui/pages/FruitsDetails";
import Cart from "./ui/pages/Cart/Cart";
import { Overlay } from "./ui/components/Overlay/Overlay";
import { Register } from "./ui/pages/Register/Register";
import { UserContext, UserProvider } from "./context/UserContext";
import { useContext } from "react";
import Login from "./ui/components/Login/Login";
import ProtectedRoute from "./ui/components/ProtectedRoute";
import Header from "./ui/components/Header/Header";

function App() {
  function MainApp() {
    const { user } = useContext(UserContext);

    return (
      <>
        <Header />
        {user && <Overlay />}

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

            {/* 3. PROTECTED ROUTES */}
            <Route element={<ProtectedRoute />}>
              <Route path="/fruits" element={<FruitsPage />} />
              <Route path="/fruits/:id" element={<FruitDetails />} />
              <Route path="/cart" element={<Cart />} />
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
