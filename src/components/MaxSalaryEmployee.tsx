import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { Employee } from '../types/Employee';
import type { AppDispatch, RootState } from '../store/store';
import { fetchEmployeeWithMaxSalary } from '../store/employeeSlice';
import '../styles/MaxSalaryEmployee.css';

export default function MaxSalaryEmployee() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.employees);
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const loadEmployee = async () => {
      const result = await dispatch(fetchEmployeeWithMaxSalary());
      if (fetchEmployeeWithMaxSalary.fulfilled.match(result)) {
        setEmployee(result.payload);
      }
    };

    void loadEmployee();
  }, [dispatch]);

  return (
    <section className="max-salary-employee">
      <Link className="back-link" to="/">
        ← Back to employees
      </Link>
      <h1>Highest Paid Employee</h1>

      {isLoading && <p>Loading employee...</p>}
      {error && <div className="error-message">{error}</div>}

      {!isLoading && !error && employee && (
        <article className="employee-card">
          <h2>{employee.name}</h2>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>{employee.email}</dd>
            </div>
            <div>
              <dt>Department</dt>
              <dd>{employee.department}</dd>
            </div>
            <div>
              <dt>Position</dt>
              <dd>{employee.position}</dd>
            </div>
            <div>
              <dt>Salary</dt>
              <dd>{employee.salary ? `$${employee.salary.toLocaleString()}` : 'N/A'}</dd>
            </div>
          </dl>
        </article>
      )}
    </section>
  );
}
