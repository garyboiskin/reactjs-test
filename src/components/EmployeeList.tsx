import type { Employee } from '../types/Employee';
import '../styles/EmployeeList.css';

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string | number) => void;
  isLoading: boolean;
}

export default function EmployeeList({
  employees,
  onEdit,
  onDelete,
  isLoading,
}: EmployeeListProps) {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <p>No employees found. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="employee-list-container">
      <h2>Employees ({employees.length})</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.salary ? `$${employee.salary.toLocaleString()}` : 'N/A'}</td>
              <td className="actions">
                <button
                  onClick={() => onEdit(employee)}
                  disabled={isLoading}
                  className="btn btn-sm btn-edit"
                  title="Edit employee"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${employee.name}?`)) {
                      onDelete(employee.id!);
                    }
                  }}
                  disabled={isLoading}
                  className="btn btn-sm btn-delete"
                  title="Delete employee"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
