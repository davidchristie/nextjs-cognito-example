import { useRouter } from "next/router";
import { signInPath } from "../paths";
import { setUsername } from "../storage/username";
import { trpc } from "../utilities/trpc";

export type VerifyEmail = (input: {
  email: string;
  code: string;
}) => Promise<void>;

export function useVerifyEmail(): VerifyEmail {
  const verifyEmail = trpc.auth.verifyEmail.useMutation();
  const router = useRouter();
  return async (input) => {
    setUsername(input.email);
    await verifyEmail.mutateAsync({
      email: input.email,
      code: input.code,
    });
    router.push(signInPath);
  };
}
