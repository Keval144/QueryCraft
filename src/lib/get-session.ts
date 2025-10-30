import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
  const cookieStore = cookies();
  const cookieString = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return auth.api.getSession({
    headers: new Headers({
      cookie: cookieString,
    }),
  });
});
