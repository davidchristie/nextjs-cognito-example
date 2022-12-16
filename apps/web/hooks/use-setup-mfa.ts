import { trpc } from "../utilities/trpc";

export function useSetupMfa() {
  return trpc.auth.setupMfa.useQuery(undefined, {
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
