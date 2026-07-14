import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

export const AUTH_ROLES = ['user', 'moderator', 'admin', 'super-admin'] as const;

export type Role = (typeof AUTH_ROLES)[number];

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
};

const AUTH_STORAGE_KEY = 'vitra.auth.user';

type AuthSessionState = {
  user: AuthUser | null;
};

type AuthUserListener = (user: AuthUser | null, previousUser: AuthUser | null) => void;

const authRoleSet: ReadonlySet<string> = new Set(AUTH_ROLES);

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const isRole = (value: unknown): value is Role => {
  return typeof value === 'string' && authRoleSet.has(value);
};

const isAuthUser = (value: unknown): value is AuthUser => {
  return isRecord(value) && typeof value.id === 'string' && typeof value.email === 'string' && isRole(value.role);
};

const parseAuthUser = (value: string | null): AuthUser | null => {
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(value);
    return isAuthUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const readStoredAuthUser = (): AuthUser | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return parseAuthUser(window.localStorage.getItem(AUTH_STORAGE_KEY));
};

const authSessionStore = createStore<AuthSessionState>(() => ({
  user: readStoredAuthUser(),
}));

export function getAuthUser(): AuthUser | null {
  return authSessionStore.getState().user;
}

export function useAuthUser(): AuthUser | null {
  return useStore(authSessionStore, (state) => state.user);
}

export function subscribeAuthUser(listener: AuthUserListener): () => void {
  return authSessionStore.subscribe((state, previousState) => {
    if (state.user !== previousState.user) {
      listener(state.user, previousState.user);
    }
  });
}

export function signIn(user: AuthUser): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }

  authSessionStore.setState({ user });
}

export function signOut(): void {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  authSessionStore.setState({ user: null });
}
