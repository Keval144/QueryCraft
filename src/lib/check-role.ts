import { authClient } from "./auth-client";

export const CheckRole = async () => {
  const { data } = await authClient.getSession();
  const role = data?.user?.role;
  return role;
};
