import { afterEach, describe, expect, it, vi } from 'vitest';
import employeeService from './employeeService';
import type { Employee } from '../types/Employee';

const employee: Employee = {
  id: 7,
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  department: 'Engineering',
  position: 'Principal Engineer',
  salary: 125000,
};

const mockResponse = (body: unknown, ok = true, status = 200) =>
  ({ ok, status, json: vi.fn().mockResolvedValue(body) }) as unknown as Response;

afterEach(() => {
  vi.restoreAllMocks();
});

describe('employeeService', () => {
  it('gets employees through GraphQL', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockResponse({ data: { employees: [employee] } }),
    );

    await expect(employeeService.getAllEmployees()).resolves.toEqual([employee]);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/graphql'),
      expect.objectContaining({ method: 'POST', body: expect.stringContaining('employees') }),
    );
  });

  it('gets one employee by ID', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockResponse({ data: { employee } }),
    );

    await expect(employeeService.getEmployeeById(7)).resolves.toEqual(employee);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/graphql'),
      expect.objectContaining({ method: 'POST', body: expect.stringContaining('GetEmployee') }),
    );
  });

  it('gets the employee with the maximum salary', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockResponse({ data: { employeeWithMaxSalary: employee } }),
    );

    await expect(employeeService.getEmployeeWithMaxSalary()).resolves.toEqual(employee);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/graphql'),
      expect.objectContaining({ method: 'POST', body: expect.stringContaining('employeeWithMaxSalary') }),
    );
  });

  it('gets the employee with the minimum salary from the REST endpoint', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(employee));

    await expect(employeeService.getEmployeeWithMinSalary()).resolves.toEqual(employee);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/employees/min-salary'),
      expect.objectContaining({ headers: {} }),
    );
  });

  it('creates an employee through a GraphQL mutation', async () => {
    const newEmployee = { ...employee, id: undefined };
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockResponse({ data: { createEmployee: employee } }),
    );

    await expect(employeeService.createEmployee(newEmployee)).resolves.toEqual(employee);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/graphql'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('CreateEmployee'),
      }),
    );
  });

  it('updates an employee through a GraphQL mutation', async () => {
    const changes = { position: 'Chief Engineer' };
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockResponse({ data: { updateEmployee: employee } }),
    );

    await expect(employeeService.updateEmployee(7, changes)).resolves.toEqual(employee);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/graphql'),
      expect.objectContaining({ method: 'POST', body: expect.stringContaining('UpdateEmployee') }),
    );
  });

  it('deletes an employee through a GraphQL mutation', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockResponse({ data: { deleteEmployee: '7' } }),
    );

    await expect(employeeService.deleteEmployee(7)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/graphql'),
      expect.objectContaining({ method: 'POST', body: expect.stringContaining('DeleteEmployee') }),
    );
  });

  it('throws an HTTP error for unsuccessful responses', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(null, false, 500));

    await expect(employeeService.getAllEmployees()).rejects.toThrow('HTTP error! status: 500');
  });
});
