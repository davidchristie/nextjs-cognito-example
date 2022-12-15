import { useRouter } from "next/router";
import { mfaPath, setupMfaPath } from "../paths";
import { setSession } from "../storage/session";
import { setUsername } from "../storage/username";
import { trpc } from "../utilities/trpc";

export type SignIn = (input: {
  email: string;
  password: string;
}) => Promise<void>;

export function useSignIn(): SignIn {
  const signIn = trpc.auth.signIn.useMutation();
  const router = useRouter();
  return async (input) => {
    setUsername(input.email);
    const result = await signIn.mutateAsync({
      email: input.email,
      password: input.password,
    });
    if ("session" in result) {
      setSession(result.session);
    }
    if ("challengeName" in result) {
      if (result.challengeName === "MFA_SETUP") {
        router.push(setupMfaPath);
        return;
      }
      if (result.challengeName === "MFA") {
        router.push(mfaPath);
        return;
      }
    }
  };
}
