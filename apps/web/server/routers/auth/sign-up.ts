import { z } from "zod";
import { cognito } from "../../auth/cognito";
import { procedure } from "../../trpc";

export const signUp = procedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    await cognito.signUp({
      email: input.email,
      password: input.password,
    });
    return {};
  });
