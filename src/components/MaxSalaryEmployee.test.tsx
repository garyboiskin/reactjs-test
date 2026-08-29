import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MaxSalaryEmployee from './MaxSalaryEmployee';
import employeeReducer from '../store/employeeSlice';
import employeeService from '../services/employeeService';
import type { Employee } from '../types/Employee';

vi.mock('../services/employeeService', () => ({
  default: {
    getEmployeeWithMaxSalary: vi.fn(),
  },
}));

const maxSalaryEmployee: Employee = {
  id: 1,
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  department: 'Engineering',
  position: 'Principal Engineer',
  salary: 150000,
};

const renderComponent = () => {
  const store = configureStore({
    reducer: { employees: employeeReducer },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <MaxSalaryEmployee />
      </MemoryRouter>
    </Provider>,
  );
};

describe('MaxSalaryEmployee', () => {
  beforeEach(() => {
    vi.mocked(employeeService.getEmployeeWithMaxSalary).mockResolvedValue(maxSalaryEmployee);
  });

  it('fetches and displays the employee with the highest salary', async () => {
    renderComponent();

    expect(await screen.findByRole('heading', { name: 'Ada Lovelace' })).toBeInTheDocument();
    expect(screen.getByText('$150,000')).toBeInTheDocument();
    expect(employeeService.getEmployeeWithMaxSalary).toHaveBeenCalledOnce();
    expect(screen.getByRole('link', { name: '← Back to employees' })).toHaveAttribute('href', '/');
  });
});
