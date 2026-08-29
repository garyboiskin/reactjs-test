import type { Employee } from '../types/Employee';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const GRAPHQL_ENDPOINT = `${API_BASE_URL}/graphql`;

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

const EMPLOYEE_FIELDS = 'id name email department position salary';

async function requestGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = (await response.json()) as GraphQLResponse<T>;
  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join(', '));
  }

  if (!result.data) {
    throw new Error('GraphQL response did not contain data');
  }

  return result.data;
}

class EmployeeService {
  async getEmployeeWithMaxSalary(): Promise<Employee> {
    try {
      const data = await requestGraphQL<{ employeeWithMaxSalary: Employee }>(
        `{ employeeWithMaxSalary { ${EMPLOYEE_FIELDS} } }`,
      );
      return data.employeeWithMaxSalary;
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
      const data = await requestGraphQL<{ employees: Employee[] }>(
        `{ employees { ${EMPLOYEE_FIELDS} } }`,
      );
      return data.employees;
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
      const data = await requestGraphQL<{ employee: Employee }>(
        `query GetEmployee($id: ID!) { employee(id: $id) { ${EMPLOYEE_FIELDS} } }`,
        { id },
      );
      return data.employee;
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
      const data = await requestGraphQL<{ createEmployee: Employee }>(
        `mutation CreateEmployee($input: EmployeeInput!) {
          createEmployee(input: $input) { ${EMPLOYEE_FIELDS} }
        }`,
        { input: employee },
      );
      return data.createEmployee;
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
      const input = { ...employee };
      delete input.id;
      const data = await requestGraphQL<{ updateEmployee: Employee }>(
        `mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
          updateEmployee(id: $id, input: $input) { ${EMPLOYEE_FIELDS} }
        }`,
        { id, input },
      );
      return data.updateEmployee;
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
      await requestGraphQL<{ deleteEmployee: string }>(
        'mutation DeleteEmployee($id: ID!) { deleteEmployee(id: $id) }',
        { id },
      );
    } catch (error) {
      console.error(`Error deleting employee ${id}:`, error);
      throw error;
    }
  }
}

export default new EmployeeService();
