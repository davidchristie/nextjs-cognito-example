import { useRouter } from "next/router";
import { homePath } from "../paths";
import { setAuthResult } from "../storage/auth-result";
import { trpc } from "../utilities/trpc";

export type ConfirmMfa = (input: {
  username: string;
  code: string;
}) => Promise<void>;

export function useConfirmMfa(): ConfirmMfa {
  const confirmMfa = trpc.auth.confirmMfa.useMutation();
  const router = useRouter();
  return async (input) => {
    const result = await confirmMfa.mutateAsync({
      username: input.username,
      code: input.code,
    });
    setAuthResult(result);
    router.push(homePath);
  };
}
