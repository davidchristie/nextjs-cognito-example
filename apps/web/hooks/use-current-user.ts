import { getAccessToken } from "../storage/access-token";
import { getIdToken } from "../storage/id-token";
import { trpc } from "../utilities/trpc";

export function useCurrentUser():
  | {
      loading: true;
    }
  | {
      loading: false;
      data: {
        id: string;
        email: string;
      };
    } {
  if (typeof window !== "undefined") {
    const idToken = getIdToken();
    const verifyIdToken = trpc.auth.verifyIdToken.useQuery(
      {
        idToken: idToken ?? "",
      },
      {
        enabled: idToken !== undefined,
        trpc: {
          ssr: false,
        },
      }
    );
    if (verifyIdToken.isLoading) {
      return {
        loading: true,
      };
    }
    return {
      loading: false,
      data: {
        id: verifyIdToken.data?.id ?? "",
        email: verifyIdToken.data?.email ?? "",
      },
    };
  }
  return {
    loading: true,
  };
}
