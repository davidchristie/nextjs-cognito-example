import { router } from "../../trpc";
import { confirmMfa } from "./confirm-mfa";
import { currentUser } from "./current-user";
import { setupMfa } from "./setup-mfa";
import { signIn } from "./sign-in";
import { signUp } from "./sign-up";
import { verifyEmail } from "./verify-email";
import { verifyMfa } from "./verify-mfa";

export const authRouter = router({
  confirmMfa,
  currentUser,
  setupMfa,
  signIn,
  signUp,
  verifyEmail,
  verifyMfa,
});
