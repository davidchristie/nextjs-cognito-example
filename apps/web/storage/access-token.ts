const key = "access_token";

export function getAccessToken(): string | undefined {
  return localStorage.getItem(key) ?? undefined;
}

export function getRequiredAccessToken(): string {
  const accessToken = getAccessToken();
  if (accessToken === undefined) {
    throw new Error("Missing access token.");
  }
  return accessToken;
}

export function setAccessToken(accessToken: string): void {
  localStorage.setItem(key, accessToken);
}
