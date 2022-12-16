import { z } from "zod";
import { cognito } from "../../auth/cognito";
import { procedure } from "../../trpc";
import { setCookies } from "../../utilities/set-cookies";

export const signIn = procedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const result = await cognito.signIn({
      email: input.email,
      password: input.password,
    });
    setCookies(result, ctx);
    return result;
  });
