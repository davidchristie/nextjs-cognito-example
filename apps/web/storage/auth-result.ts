import { setAccessToken } from "./access-token";
import { setRefreshToken } from "./refresh-token";

export function setAuthResult(input: {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}): void {
  setAccessToken(input.accessToken);
  setRefreshToken(input.refreshToken);
}
