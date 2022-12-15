import { z } from "zod";
import { cognito } from "../../auth/cognito";
import { procedure } from "../../trpc";

export const verifyMfa = procedure
  .input(
    z.object({
      username: z.string(),
      session: z.string(),
      code: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const result = await cognito.verifyMfa({
      username: input.username,
      session: input.session,
      code: input.code,
    });
    return result;
  });
