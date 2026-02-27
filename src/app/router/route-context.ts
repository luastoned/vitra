import type { AuthUser } from '~/app/auth/auth-session';

export type RouterContext = {
  user: AuthUser | null;
};
