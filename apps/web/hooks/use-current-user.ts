import { trpc } from "../utilities/trpc";

export function useCurrentUser() {
  return trpc.auth.currentUser.useQuery();
}
