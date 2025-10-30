import { createAuthClient } from "better-auth/client";
import { adminClient, lastLoginMethodClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  plugins: [adminClient(), lastLoginMethodClient(),nextCookies()],
});
