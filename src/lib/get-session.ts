import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
  const cookieStore = await cookies();

  return auth.api.getSession({
    headers: new Headers({
      awCookie: cookieStore.toString(),
    }),
  });
});
