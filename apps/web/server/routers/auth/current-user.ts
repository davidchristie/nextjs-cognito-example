import { cognito } from "../../auth/cognito";
import { procedure } from "../../trpc";
import { getIdTokenCookie } from "../../utilities/get-id-token-cookie";

export const currentUser = procedure.query(async ({ ctx }) => {
  const idToken = getIdTokenCookie(ctx);
  if (idToken === undefined) {
    return undefined;
  }
  const result = await cognito.verifyIdToken({
    idToken,
  });
  return result;
});
