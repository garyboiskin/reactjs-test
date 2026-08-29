import { Route, Routes } from 'react-router-dom';
import EmployeeManager from './components/EmployeeManager';
import MaxSalaryEmployee from './components/MaxSalaryEmployee';
import './App.css';

function App() {
  return (
    <main className="app">
      <Routes>
        <Route path="/" element={<EmployeeManager />} />
        <Route path="/employees/max-salary" element={<MaxSalaryEmployee />} />
      </Routes>
    </main>
  );
}

export default App;
