import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import EmployeeManager from './components/EmployeeManager';
import Login from './components/Login';
import MaxSalaryEmployee from './components/MaxSalaryEmployee';
import MinSalaryEmployee from './components/MinSalaryEmployee';
import authService from './services/authService';
import './App.css';

function ProtectedRoute() {
  return authService.isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <main className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<EmployeeManager />} />
          <Route path="/employees/max-salary" element={<MaxSalaryEmployee />} />
          <Route path="/employees/min-salary" element={<MinSalaryEmployee />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;
