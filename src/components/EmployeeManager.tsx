import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Employee } from '../types/Employee';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import '../styles/EmployeeManager.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import authService from '../services/authService';
import {
  addEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from '../store/employeeSlice';

export default function EmployeeManager() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { employees, isLoading, error } = useSelector((state: RootState) => state.employees);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAddEmployee = async (employee: Omit<Employee, 'id'>) => {
    const result = await dispatch(addEmployee(employee));
    if (addEmployee.fulfilled.match(result)) {
      setShowForm(false);
    }
  };

  const handleUpdateEmployee = async (employee: Employee) => {
    if (employee.id === undefined || employee.id === null) return;
    const result = await dispatch(updateEmployee(employee));
    if (updateEmployee.fulfilled.match(result)) {
      setEditingEmployee(null);
      setShowForm(false);
    }
  };

  const handleDeleteEmployee = async (id: string | number) => {
    await dispatch(deleteEmployee(id));
  };

  const handleEditClick = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleFormSubmit = (employee: Omit<Employee, 'id'> | Employee) => {
    if (editingEmployee && 'id' in employee) {
      handleUpdateEmployee(employee as Employee);
    } else {
      handleAddEmployee(employee as Omit<Employee, 'id'>);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="employee-manager">
      <div className="manager-header">
        <h1>Employee Management</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="manager-layout">
        <aside className="manager-navigation" aria-label="Employee management actions">
        <div className="manager-actions">
          <Link className="btn btn-secondary" to="/employees/max-salary">
            View Highest Salary
          </Link>
          <Link className="btn btn-secondary" to="/employees/min-salary">
            View Lowest Salary
          </Link>
          <button
            onClick={() => {
              setEditingEmployee(null);
              setShowForm(!showForm);
            }}
            className="btn btn-primary"
            disabled={isLoading}
          >
            {showForm ? 'Cancel' : '+ Add Employee'}
          </button>
          <button type="button" onClick={handleLogout} className="btn btn-secondary">
            Log out
          </button>
        </div>
        </aside>

        <div className="manager-content">
        {showForm && (
          <div className="form-section">
            <EmployeeForm
              employee={editingEmployee}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          </div>
        )}

        <div className="list-section">
          <EmployeeList
            employees={employees}
            onEdit={handleEditClick}
            onDelete={handleDeleteEmployee}
            isLoading={isLoading}
          />
        </div>
        </div>
      </div>
    </div>
  );
}
