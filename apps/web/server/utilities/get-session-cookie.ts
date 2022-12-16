import { TRPCError } from "@trpc/server";
import { Context } from "../context";

export function getSessionCookie(ctx: Context): string {
  const { session } = ctx.req.cookies;
  if (session === undefined) {
    throw new TRPCError({
      message: "Missing context.",
      code: "UNAUTHORIZED",
    });
  }
  return session;
}
