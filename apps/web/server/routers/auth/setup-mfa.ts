import { z } from "zod";
import { cognito } from "../../auth/cognito";
import { procedure } from "../../trpc";

export const setupMfa = procedure
  .input(
    z.object({
      session: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const result = await cognito.setupMfa({
      session: input.session,
    });
    return result;
  });
