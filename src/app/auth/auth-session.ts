export type Role = 'user' | 'moderator' | 'admin' | 'super-admin';

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
};

const AUTH_STORAGE_KEY = 'vitra.auth.user';

const parseAuthUser = (value: string | null): AuthUser | null => {
  if (!value) return null;

  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    return null;
  }
};

export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedUser = parseAuthUser(window.localStorage.getItem(AUTH_STORAGE_KEY));

  if (storedUser) {
    return storedUser;
  }

  if (import.meta.env.DEV) {
    return {
      id: 'dev-user',
      email: 'dev@vitra.local',
      role: 'super-admin',
    };
  }

  return null;
}

export function setAuthUser(user: AuthUser): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearAuthUser(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
