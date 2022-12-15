import { router } from "../../trpc";
import { confirmMfa } from "./confirm-mfa";
import { setupMfa } from "./setup-mfa";
import { signIn } from "./sign-in";
import { signUp } from "./sign-up";
import { verifyEmail } from "./verify-email";
import { verifyIdToken } from "./verify-id-token";
import { verifyMfa } from "./verify-mfa";

export const authRouter = router({
  confirmMfa,
  setupMfa,
  signIn,
  signUp,
  verifyEmail,
  verifyIdToken,
  verifyMfa,
});
