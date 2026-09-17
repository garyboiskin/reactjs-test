import { describe, expect, it } from 'vitest';
import type { Employee } from '../types/Employee';
import reducer, {
  addEmployee,
  deleteEmployee,
  fetchEmployeeWithMaxSalary,
  fetchEmployeeWithMinSalary,
  fetchEmployees,
  updateEmployee,
} from './employeeSlice';

const employee: Employee = {
  id: 1,
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  department: 'Engineering',
  position: 'Principal Engineer',
  salary: 125000,
};

describe('employee reducer', () => {
  it('stores fetched employees and clears loading', () => {
    const state = reducer(
      { employees: [], isLoading: true, error: null },
      fetchEmployees.fulfilled([employee], 'request-1'),
    );

    expect(state).toEqual({ employees: [employee], isLoading: false, error: null });
  });

  it('updates an existing employee from a maximum-salary request', () => {
    const maxSalaryEmployee = { ...employee, salary: 150000 };
    const state = reducer(
      { employees: [employee], isLoading: true, error: null },
      fetchEmployeeWithMaxSalary.fulfilled(maxSalaryEmployee, 'request-max-salary'),
    );

    expect(state).toEqual({ employees: [maxSalaryEmployee], isLoading: false, error: null });
  });

  it('adds a new employee from a minimum-salary request', () => {
    const minSalaryEmployee = { ...employee, id: 2, salary: 50000 };
    const state = reducer(
      { employees: [employee], isLoading: true, error: null },
      fetchEmployeeWithMinSalary.fulfilled(minSalaryEmployee, 'request-min-salary'),
    );

    expect(state).toEqual({
      employees: [employee, minSalaryEmployee],
      isLoading: false,
      error: null,
    });
  });

  it('adds, updates, and deletes employees from fulfilled requests', () => {
    const added = { ...employee, id: 2 };
    const updated = { ...employee, position: 'Chief Engineer' };
    const newEmployee = {
      name: employee.name,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      salary: employee.salary,
    };
    const afterAdd = reducer(
      { employees: [employee], isLoading: true, error: null },
      addEmployee.fulfilled(added, 'request-2', newEmployee),
    );
    const afterUpdate = reducer(
      afterAdd,
      updateEmployee.fulfilled(updated, 'request-3', employee),
    );
    const afterDelete = reducer(
      afterUpdate,
      deleteEmployee.fulfilled(1, 'request-4', 1),
    );

    expect(afterAdd.employees).toEqual([employee, added]);
    expect(afterUpdate.employees).toEqual([updated, added]);
    expect(afterDelete.employees).toEqual([added]);
    expect(afterDelete.isLoading).toBe(false);
  });

  it('stores rejected thunk messages as errors', () => {
    const state = reducer(
      { employees: [], isLoading: true, error: null },
      fetchEmployees.rejected(new Error('request failed'), 'request-5', undefined, 'request failed'),
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('request failed');
  });
});
