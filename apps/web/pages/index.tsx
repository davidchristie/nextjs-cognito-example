import { useCurrentUser } from "../hooks/use-current-user";

export default function IndexPage() {
  const currentUser = useCurrentUser();
  return (
    <div>
      <h1>Index</h1>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  );
}
