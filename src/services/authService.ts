const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/login`;
const TOKEN_STORAGE_KEY = 'employee-management.jwt';

interface LoginResponse {
  token?: string;
  accessToken?: string;
  jwt?: string;
}

class AuthService {
  async login(username: string, password: string): Promise<string> {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(response.status === 401 || response.status === 403 ? 'Invalid username or password' : `HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as LoginResponse;
    const token = data.token ?? data.accessToken ?? data.jwt;
    if (!token) {
      throw new Error('Login response did not contain a JWT token');
    }

    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    return token;
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export default new AuthService();
