import cookie from "cookie";
import { Context } from "../context";

export function setCookies(result: {}, ctx: Context): void {
  if ("session" in result && typeof result.session === "string") {
    setCookie("session", result.session, ctx);
  }
  if ("accessToken" in result && typeof result.accessToken === "string") {
    setCookie("access_token", result.accessToken, ctx);
  }
  if ("refreshToken" in result && typeof result.refreshToken === "string") {
    setCookie("refresh_token", result.refreshToken, ctx);
  }
  if ("idToken" in result && typeof result.idToken === "string") {
    setCookie("id_token", result.idToken, ctx);
  }
}

function setCookie(name: string, value: string, ctx: Context): void {
  ctx.res.setHeader(
    "set-cookie",
    cookie.serialize(name, value, {
      httpOnly: true,
    })
  );
}
