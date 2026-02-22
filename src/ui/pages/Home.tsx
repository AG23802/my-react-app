// import reactLogo from './../../assets/react.svg'
// import viteLogo from '/vite.svg'
import Logout from '../components/Logout'
import Login from "../components/Login/Login";
import useUser from '../../hooks/useUser';

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="status-container warning-container">
        <h2>Welcome to the Fruit Store!</h2>
        <p>Please log in to access more features.</p>
        <Login />
      </div>
    );
  }

  return (
    <div className="status-container warning-container">
      <h1>Hello, {user.username}!</h1>
      <p>Check out our latest arrivals.</p>
      {/* Rest of your logged-in Home content */}
      <Logout />
    </div>
  );
}