import { cognito } from "../../auth/cognito";
import { procedure } from "../../trpc";
import { getSessionCookie } from "../../utilities/get-session-cookie";
import { setCookies } from "../../utilities/set-cookies";

export const setupMfa = procedure.mutation(async ({ input, ctx }) => {
  const result = await cognito.setupMfa({
    session: getSessionCookie(ctx),
  });
  setCookies(result, ctx);
  return result;
});
