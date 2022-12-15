const key = "id_token";

export function getIdToken(): string | undefined {
  return localStorage.getItem(key) ?? undefined;
}

export function getRequiredIdToken(): string {
  const idToken = getIdToken();
  if (idToken === undefined) {
    throw new Error("Missing ID token.");
  }
  return idToken;
}

export function setIdToken(idToken: string): void {
  localStorage.setItem(key, idToken);
}
