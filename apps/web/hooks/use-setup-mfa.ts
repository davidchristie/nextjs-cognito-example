import { useEffect, useState } from "react";
import { trpc } from "../utilities/trpc";

type Data = {
  secretCode: string;
};

export type SetupMfa =
  | { loading: true; data: undefined }
  | { loading: false; data: Data };

export function useSetupMfa(): SetupMfa {
  const setupMfa = trpc.auth.setupMfa.useMutation();
  const [secretCode, setSecretCode] = useState<string>();
  useEffect(() => {
    setupMfa.mutateAsync().then((result) => {
      setSecretCode(result.secretCode);
    });
  }, []);
  return secretCode === undefined
    ? { loading: true, data: undefined }
    : { loading: false, data: { secretCode } };
}
