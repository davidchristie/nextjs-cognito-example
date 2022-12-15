import { useRouter } from "next/router";
import { verifyEmailPath } from "../paths";
import { trpc } from "../utilities/trpc";

export type SignUp = (input: {
  email: string;
  password: string;
}) => Promise<void>;

export function useSignUp(): SignUp {
  const signUp = trpc.auth.signUp.useMutation();
  const router = useRouter();
  return async (input) => {
    const result = await signUp.mutateAsync({
      email: input.email,
      password: input.password,
    });
    console.debug("Sign up result:", result);
    router.push(verifyEmailPath);
  };
}
