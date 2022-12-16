import { trpc } from "../utilities/trpc";

export function useCurrentUser(): ReturnType<
  typeof trpc.auth.currentUser.useQuery
> {
  return trpc.auth.currentUser.useQuery();
}
