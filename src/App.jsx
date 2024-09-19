import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/AuthComponents/LoginComponent';
import Dashboard from './components/WrapperComponent/WrapperComponent';
import RegisterComponent from './components/AuthComponents/RegisterComponent';
import { UserProvider } from './contexts/UserContext';

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="/register"
          element={<RegisterComponent />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/"
          element={<LoginComponent />}
        />{' '}
        {/* Default route or landing page */}
      </Routes>
    </UserProvider>
  );
}
