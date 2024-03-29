import { UserRole } from "./const";

export function compareRole(name, role) {
  const compareRole = String(UserRole[name]);
  return String(role) === String(compareRole);
}
