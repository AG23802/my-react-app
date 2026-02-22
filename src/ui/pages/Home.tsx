// import reactLogo from './../../assets/react.svg'
// import viteLogo from '/vite.svg'
import Logout from '../components/Logout'
import Login from "../components/Login/Login";
import useAuth from '../../hooks/useAuth';
import { ImSpinner } from 'react-icons/im';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <ImSpinner className="animate-spin text-teal-400 w-6 h-6" />;
  }

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