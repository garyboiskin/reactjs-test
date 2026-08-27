export interface Employee {
  id?: string | number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
