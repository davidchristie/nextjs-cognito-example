import { TRPCError } from "@trpc/server";
import { Context } from "../context";

export function getIdTokenCookie(ctx: Context): string | undefined {
  return ctx.req.cookies.idToken;
}
