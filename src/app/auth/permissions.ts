import type { Role } from '~/app/auth/auth-session';

const roleRank: Record<Role, number> = {
  user: 0,
  moderator: 1,
  admin: 2,
  'super-admin': 3,
};

export function canAccessRole(currentRole: Role, minimumRole: Role): boolean {
  return roleRank[currentRole] >= roleRank[minimumRole];
}

export function hasAnyRole(currentRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(currentRole);
}
