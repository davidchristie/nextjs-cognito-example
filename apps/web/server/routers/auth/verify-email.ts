import { z } from "zod";
import { cognito } from "../../auth/cognito";
import { procedure } from "../../trpc";

export const verifyEmail = procedure
  .input(
    z.object({
      email: z.string(),
      code: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    await cognito.confirmSignUp({
      email: input.email,
      code: input.code,
    });
    return {};
  });
