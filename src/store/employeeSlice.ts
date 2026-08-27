import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Employee } from '../types/Employee';
import employeeService from '../services/employeeService';

interface EmployeeState {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  isLoading: false,
  error: null,
};

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const fetchEmployees = createAsyncThunk<Employee[], void, { rejectValue: string }>(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      return await employeeService.getAllEmployees();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(
          error,
          'Failed to fetch employees. Make sure your API endpoint is configured correctly.',
        ),
      );
    }
  },
);

export const addEmployee = createAsyncThunk<
  Employee,
  Omit<Employee, 'id'>,
  { rejectValue: string }
>('employees/addEmployee', async (employee, { rejectWithValue }) => {
  try {
    return await employeeService.createEmployee(employee);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Failed to add employee'));
  }
});

export const updateEmployee = createAsyncThunk<
  Employee,
  Employee,
  { rejectValue: string }
>('employees/updateEmployee', async (employee, { rejectWithValue }) => {
  if (employee.id === undefined || employee.id === null) {
    return rejectWithValue('Unable to update employee without an ID');
  }

  try {
    return await employeeService.updateEmployee(employee.id, employee);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Failed to update employee'));
  }
});

export const deleteEmployee = createAsyncThunk<
  string | number,
  string | number,
  { rejectValue: string }
>('employees/deleteEmployee', async (id, { rejectWithValue }) => {
  try {
    await employeeService.deleteEmployee(id);
    return id;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Failed to delete employee'));
  }
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to fetch employees';
      })
      .addCase(addEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to add employee';
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee,
        );
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to update employee';
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = state.employees.filter((employee) => employee.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to delete employee';
      });
  },
});

export const { clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
