import { useRouter } from "next/router";
import { homePath } from "../paths";
import { setAuthResult } from "../storage/auth-result";
import { getRequiredSession } from "../storage/session";
import { getRequiredUsername } from "../storage/username";
import { trpc } from "../utilities/trpc";

export type VerifyMfa = (input: { code: string }) => Promise<void>;

export function useVerifyMfa(): VerifyMfa {
  const verifyMfa = trpc.auth.verifyMfa.useMutation();
  const router = useRouter();
  return async (input) => {
    const result = await verifyMfa.mutateAsync({
      username: getRequiredUsername(),
      session: getRequiredSession(),
      code: input.code,
    });
    setAuthResult(result);
    router.push(homePath);
  };
}
