import { z } from "zod";
import { cognito } from "../../auth/cognito";
import { procedure } from "../../trpc";

export const signIn = procedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const result = await cognito.signIn({
      email: input.email,
      password: input.password,
    });
    return result;
  });
