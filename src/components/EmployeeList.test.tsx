import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import EmployeeList from './EmployeeList';
import type { Employee } from '../types/Employee';

const employees: Employee[] = [
  {
    id: 1,
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    department: 'Engineering',
    position: 'Principal Engineer',
    salary: 125000,
  },
  {
    id: 2,
    name: 'Grace Hopper',
    email: 'grace@example.com',
    department: 'Operations',
    position: 'Director',
  },
];

describe('EmployeeList', () => {
  it('renders an empty state when there are no employees', () => {
    render(<EmployeeList employees={[]} onEdit={vi.fn()} onDelete={vi.fn()} isLoading={false} />);

    expect(screen.getByText('No employees found. Add one to get started!')).toBeInTheDocument();
  });

  it('renders employee details and formats salary values', () => {
    render(<EmployeeList employees={employees} onEdit={vi.fn()} onDelete={vi.fn()} isLoading={false} />);

    expect(screen.getByRole('heading', { name: 'Employees (2)' })).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('$125,000')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('calls onEdit with the selected employee', async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();
    render(<EmployeeList employees={employees} onEdit={onEdit} onDelete={vi.fn()} isLoading={false} />);

    await user.click(screen.getAllByRole('button', { name: 'Edit' })[0]);

    expect(onEdit).toHaveBeenCalledWith(employees[0]);
  });

  it('deletes an employee only after confirmation', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<EmployeeList employees={employees} onEdit={vi.fn()} onDelete={onDelete} isLoading={false} />);

    await user.click(screen.getAllByRole('button', { name: 'Delete' })[0]);

    expect(window.confirm).toHaveBeenCalledWith('Delete Ada Lovelace?');
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('disables actions while loading', () => {
    render(<EmployeeList employees={employees} onEdit={vi.fn()} onDelete={vi.fn()} isLoading />);

    expect(screen.getAllByRole('button')).toEqual(
      expect.arrayContaining([expect.objectContaining({ disabled: true })]),
    );
  });
});
