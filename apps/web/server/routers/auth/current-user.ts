import { z } from "zod";
import { cognito } from "../../auth/cognito";
import { procedure } from "../../trpc";
import { getIdTokenCookie } from "../../utilities/get-id-token-cookie";

const authenticated = "AUTHENTICATED";
const unauthenticated = "UNAUTHENTICATED";

export const currentUser = procedure
  .output(
    z
      .object({
        status: z.literal(unauthenticated),
      })
      .or(
        z.object({
          status: z.literal(authenticated),
          user: z.object({
            id: z.string(),
            email: z.string(),
          }),
        })
      )
  )
  .query(async ({ ctx }) => {
    const idToken = getIdTokenCookie(ctx);
    if (idToken === undefined) {
      return {
        status: unauthenticated,
      };
    }
    const result = await cognito.verifyIdToken({
      idToken,
    });
    return {
      status: authenticated,
      user: result,
    };
  });
