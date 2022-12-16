import { z } from "zod";
import { cognito } from "../../auth/cognito";
import { procedure } from "../../trpc";
import { getSessionCookie } from "../../utilities/get-session-cookie";
import { setCookies } from "../../utilities/set-cookies";

export const verifyMfa = procedure
  .input(
    z.object({
      username: z.string(),
      code: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const session = getSessionCookie(ctx);
    const result = await cognito.verifyMfa({
      session,
      username: input.username,
      code: input.code,
    });
    setCookies(result, ctx);
    return result;
  });
