import { useState, useEffect } from 'react';
import type { Employee } from '../types/Employee';
import '../styles/EmployeeForm.css';

interface EmployeeFormProps {
  employee?: Employee | null;
  onSubmit: (employee: Omit<Employee, 'id'> | Employee) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function EmployeeForm({
  employee,
  onSubmit,
  onCancel,
  isLoading,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    name: '',
    email: '',
    department: '',
    position: '',
    salary: undefined,
  });

  useEffect(() => {
    if (employee) {
      const { id, ...rest } = employee;
      setFormData(rest);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salary' ? (value ? Number(value) : undefined) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee && 'id' in employee) {
      onSubmit({ id: employee.id, ...formData });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>

      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="John Doe"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="department">Department *</label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="position">Position *</label>
        <input
          id="position"
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          placeholder="Senior Developer"
        />
      </div>

      <div className="form-group">
        <label htmlFor="salary">Salary (Optional)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={formData.salary || ''}
          onChange={handleChange}
          placeholder="100000"
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? 'Saving...' : employee ? 'Update Employee' : 'Add Employee'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
