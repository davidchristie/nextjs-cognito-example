import { useEffect, useState } from "react";
import { getRequiredSession, getSession, setSession } from "../storage/session";
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
    setupMfa
      .mutateAsync({
        session: getRequiredSession(),
      })
      .then((result) => {
        setSecretCode(result.secretCode);
        setSession(result.session);
      });
  }, []);
  return secretCode === undefined
    ? { loading: true, data: undefined }
    : { loading: false, data: { secretCode } };
}
