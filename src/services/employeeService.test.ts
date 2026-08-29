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
  it('gets employees from the API and supports wrapped responses', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockResponse({ data: [employee] }),
    );

    await expect(employeeService.getAllEmployees()).resolves.toEqual([employee]);
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/employees'));
  });

  it('gets one employee by ID', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse({ data: employee }));

    await expect(employeeService.getEmployeeById(7)).resolves.toEqual(employee);
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/employees/7'));
  });

  it('gets the employee with the maximum salary', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse({ data: employee }));

    await expect(employeeService.getEmployeeWithMaxSalary()).resolves.toEqual(employee);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/employees/employeewithmaxsalary'),
    );
  });

  it('creates an employee with a JSON POST request', async () => {
    const newEmployee = { ...employee, id: undefined };
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(employee));

    await expect(employeeService.createEmployee(newEmployee)).resolves.toEqual(employee);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/employees'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      }),
    );
  });

  it('updates an employee with a JSON PUT request', async () => {
    const changes = { position: 'Chief Engineer' };
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(employee));

    await expect(employeeService.updateEmployee(7, changes)).resolves.toEqual(employee);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/employees/7'),
      expect.objectContaining({ method: 'PUT', body: JSON.stringify(changes) }),
    );
  });

  it('deletes an employee with a DELETE request', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(null));

    await expect(employeeService.deleteEmployee(7)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/employees/7'), {
      method: 'DELETE',
    });
  });

  it('throws an HTTP error for unsuccessful responses', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(null, false, 500));

    await expect(employeeService.getAllEmployees()).rejects.toThrow('HTTP error! status: 500');
  });
});
