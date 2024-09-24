import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/AuthComponents/LoginComponent';
import WrapperComponent from './components/WrapperComponent/WrapperComponent';
import RegisterComponent from './components/AuthComponents/RegisterComponent';
import { UserProvider } from './contexts/UserContext';
import ProjectList from './components/ProjectList/ProjectList';
import ProductContainer from './components/ProductContainer/ProductContainer';
import { Header } from './components/Header/Header';

export default function App() {
  return (
    <UserProvider>
      <Header />
      <div className="main">
        <Routes>
          <Route
            path="/register"
            element={<RegisterComponent />}
          />
          <Route
            path="/dashboard"
            element={<WrapperComponent />}
          />
          <Route
            path="/projects/:id"
            element={<ProductContainer />}
          />
          <Route
            path="/"
            element={<LoginComponent />}
          />{' '}
          {/* Default route or landing page */}
        </Routes>
      </div>
    </UserProvider>
  );
}
