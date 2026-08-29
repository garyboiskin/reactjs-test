import type { Employee } from '../types/Employee';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const EMPLOYEES_ENDPOINT = `${API_BASE_URL}/api/employees`;

class EmployeeService {
  /*
  * Fetch employee with max salary   
  */
  async getEmployeeWithMaxSalary(): Promise<Employee> {
    try {
      const response = await fetch(`${EMPLOYEES_ENDPOINT}/employeewithmaxsalary`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || data || null;
    } catch (error) {
      console.error('Error fetching employee with max salary:', error);
      throw error;
    }
  }

  /**
   * Fetch all employees from the API
   */
  async getAllEmployees(): Promise<Employee[]> {
    try {
      const response = await fetch(EMPLOYEES_ENDPOINT);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Handle both array response (json-server) and object response with data property
      return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  /**
   * Fetch a single employee by ID
   */
  async getEmployeeById(id: string | number): Promise<Employee> {
    try {
      const response = await fetch(`${EMPLOYEES_ENDPOINT}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Handle both direct object response (json-server) and wrapped response
      return data.data || data || null;
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new employee
   */
  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    try {
      const response = await fetch(EMPLOYEES_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Handle both direct object response (json-server) and wrapped response
      return data.data || data || null;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  }

  /**
   * Update an existing employee
   */
  async updateEmployee(id: string | number, employee: Partial<Employee>): Promise<Employee> {
    try {
      const response = await fetch(`${EMPLOYEES_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Handle both direct object response (json-server) and wrapped response
      return data.data || data || null;
    } catch (error) {
      console.error(`Error updating employee ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete an employee
   */
  async deleteEmployee(id: string | number): Promise<void> {
    try {
      const response = await fetch(`${EMPLOYEES_ENDPOINT}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting employee ${id}:`, error);
      throw error;
    }
  }
}

export default new EmployeeService();
