const key = "session";

export function getSession(): string | undefined {
  return sessionStorage.getItem(key) ?? undefined;
}

export function getRequiredSession(): string {
  const session = getSession();
  if (session === undefined) {
    throw new Error("Missing session.");
  }
  return session;
}

export function setSession(session: string): void {
  sessionStorage.setItem(key, session);
}
