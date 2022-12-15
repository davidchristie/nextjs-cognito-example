import { z } from "zod";
import { cognito } from "../../auth/cognito";
import { procedure } from "../../trpc";

export const verifyIdToken = procedure
  .input(
    z.object({
      idToken: z.string(),
    })
  )
  .query(async ({ input }) => {
    const result = await cognito.verifyIdToken({
      idToken: input.idToken,
    });
    return result;
  });
