import { setAccessToken } from "./access-token";
import { setIdToken } from "./id-token";
import { setRefreshToken } from "./refresh-token";

export function setAuthResult(input: {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}): void {
  setAccessToken(input.accessToken);
  setRefreshToken(input.refreshToken);
  setIdToken(input.idToken);
}
