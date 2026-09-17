import { afterEach, describe, expect, it, vi } from 'vitest';
import authService from './authService';

const mockResponse = (body: unknown, ok = true, status = 200) =>
  ({ ok, status, json: vi.fn().mockResolvedValue(body) }) as unknown as Response;

afterEach(() => {
  sessionStorage.clear();
  vi.restoreAllMocks();
});

describe('authService', () => {
  it('posts credentials to the login endpoint and stores the returned JWT', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      mockResponse({ token: 'test-jwt' }),
    );

    await expect(authService.login('ada', 'secret')).resolves.toBe('test-jwt');
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/auth/login'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'ada', password: 'secret' }),
      }),
    );
    expect(authService.getToken()).toBe('test-jwt');
  });

  it('reports invalid credentials', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse(null, false, 403));

    await expect(authService.login('ada', 'wrong-password')).rejects.toThrow(
      'Invalid username or password',
    );
  });
});
