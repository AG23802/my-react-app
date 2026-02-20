import "./App.css";
import { FruitProvider } from "./context/FruitContext";
import { Route, Routes } from "react-router-dom";
import Home from "./ui/pages/Home";
import FruitsPage from "./ui/pages/FruitsPage";
import FruitDetails from "./ui/pages/FruitsDetails";
import Cart from "./ui/pages/Cart/Cart";
import { Sidebar } from "./ui/components/Sidebar/Sidebar";
import { SidebarToggle } from "./ui/components/SidebarToggle";
import { Register } from "./ui/pages/Register/Register";
import { UserContext, UserProvider } from "./context/UserContext";
import { useContext } from "react";
import Login from "./ui/components/Login";
import ProtectedRoute from "./ui/components/ProtectedRoute";

function App() {
  function MainApp() {
    const { user } = useContext(UserContext);

    return user ? (
      <>
      <div>
        <div>
          <SidebarToggle />
          <Sidebar />
        </div>

        <div className="p-5">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/fruits" element={<FruitsPage />} />
            <Route path="/fruits/:id" element={<FruitDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
        </div>
      </div>
      </>
    ) : (
      <>
        <div className="flex flex-col p-4">
          <h2>Fruits App</h2>
        <Login />
        <Register />
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
