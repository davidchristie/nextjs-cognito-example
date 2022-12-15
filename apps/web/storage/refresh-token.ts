const key = "refresh_token";

export function getRefreshToken(): string | undefined {
  return localStorage.getItem(key) ?? undefined;
}

export function getRequiredRefreshToken(): string {
  const refreshToken = getRefreshToken();
  if (refreshToken === undefined) {
    throw new Error("Missing refresh token.");
  }
  return refreshToken;
}

export function setRefreshToken(refreshToken: string): void {
  localStorage.setItem(key, refreshToken);
}
