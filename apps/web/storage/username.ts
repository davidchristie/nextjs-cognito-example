const key = "username";

export function getUsername(): string | undefined {
  return sessionStorage.getItem(key) ?? undefined;
}

export function getRequiredUsername(): string {
  const username = getUsername();
  if (username === undefined) {
    throw new Error("Missing username.");
  }
  return username;
}

export function setUsername(username: string): void {
  sessionStorage.setItem(key, username);
}
