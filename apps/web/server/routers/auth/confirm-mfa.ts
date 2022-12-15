import { z } from "zod";
import { cognito } from "../../auth/cognito";
import { procedure } from "../../trpc";

export const confirmMfa = procedure
  .input(
    z.object({
      session: z.string(),
      username: z.string(),
      code: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const result = await cognito.confirmMfa({
      session: input.session,
      username: input.username,
      code: input.code,
    });
    return result;
  });
