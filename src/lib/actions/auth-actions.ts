"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export const getCurrentUser = async () => {
  const res = await auth.api.getSession({ headers: await headers() });

  return res?.user || null;
};

export const signUp = async (email: string, password: string) => {
  const res = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: "",
      callbackURL: "/fill-your-information",
    },
  });

  return res;
};

export const signIn = async (email: string, password: string) => {
  const res = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/dashboard",
    },
  });

  return res;
};

export const signOut = async () => {
  const res = await auth.api.signOut({ headers: await headers() });

  return res;
};
