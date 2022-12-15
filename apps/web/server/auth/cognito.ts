import {
  AssociateSoftwareTokenCommand,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
  SignUpCommand,
  VerifySoftwareTokenCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { createHmac } from "crypto";

export class Cognito {
  private readonly client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
  });
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly userPoolId: string;
  private readonly accessIdVerifier: ReturnType<
    typeof CognitoJwtVerifier.create
  >;

  public constructor() {
    const clientId = process.env.COGNITO_CLIENT_ID;
    if (clientId === undefined) {
      throw new Error("COGNITO_CLIENT_ID is undefined.");
    }
    const clientSecret = process.env.COGNITO_CLIENT_SECRET;
    if (clientSecret === undefined) {
      throw new Error("COGNITO_CLIENT_SECRET is undefined.");
    }
    const userPoolId = process.env.COGNITO_USER_POOL_ID;
    if (userPoolId === undefined) {
      throw new Error("COGNITO_USER_POOL_ID is undefined.");
    }
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.userPoolId = userPoolId;
    this.accessIdVerifier = CognitoJwtVerifier.create({
      userPoolId,
      clientId,
      tokenUse: "id",
    });
  }

  public async signUp(input: {
    email: string;
    password: string;
  }): Promise<void> {
    await this.client.send(
      new SignUpCommand({
        ClientId: this.clientId,
        Username: input.email,
        Password: input.password,
        SecretHash: this.secretHash(input.email),
      })
    );
  }

  public async confirmSignUp(input: {
    email: string;
    code: string;
  }): Promise<void> {
    await this.client.send(
      new ConfirmSignUpCommand({
        ClientId: this.clientId,
        Username: input.email,
        ConfirmationCode: input.code,
        SecretHash: this.secretHash(input.email),
      })
    );
  }

  public async signIn(input: { email: string; password: string }): Promise<
    | {
        challengeName: "MFA_SETUP" | "MFA";
        userIdForSrp: string;
        session: string;
      }
    | {}
  > {
    const result = await this.client.send(
      new InitiateAuthCommand({
        ClientId: this.clientId,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: input.email,
          PASSWORD: input.password,
          SECRET_HASH: this.secretHash(input.email),
        },
      })
    );
    console.log(">>> Sign in result:", result);
    if (result.ChallengeName === "MFA_SETUP") {
      return {
        challengeName: "MFA_SETUP",
        session: result.Session,
      };
    }
    if (result.ChallengeName === "SOFTWARE_TOKEN_MFA") {
      return {
        challengeName: "MFA",
        session: result.Session,
      };
    }
    return {};
  }

  public async setupMfa(input: {
    session: string;
  }): Promise<{ secretCode: string; session: string }> {
    try {
      console.log(">>> Setting up MFA...");
      const result = await this.client.send(
        new AssociateSoftwareTokenCommand({
          Session: input.session,
        })
      );
      console.log(">>> Setup MFA result:", result);
      if (result.SecretCode === undefined) {
        throw new Error("Setup MFA result is missing secret code.");
      }
      if (result.Session === undefined) {
        throw new Error("Setup MFA result is missing session.");
      }
      return {
        secretCode: result.SecretCode,
        session: result.Session,
      };
    } catch (error) {
      throw error;
    }
  }

  public async confirmMfa(input: {
    session: string;
    username: string;
    code: string;
  }): Promise<{ accessToken: string; refreshToken: string; idToken: string }> {
    const verifyResult = await this.client.send(
      new VerifySoftwareTokenCommand({
        UserCode: input.code,
        Session: input.session,
      })
    );
    console.log(">>> Verify MFA result:", verifyResult);
    const authResult = await this.client.send(
      new RespondToAuthChallengeCommand({
        ClientId: this.clientId,
        ChallengeName: "MFA_SETUP",
        ChallengeResponses: {
          USERNAME: input.username,
          SECRET_HASH: this.secretHash(input.username),
        },
        Session: verifyResult.Session ?? "",
      })
    );
    console.log(">>> Auth result:", authResult);
    return {
      accessToken: authResult.AuthenticationResult?.AccessToken ?? "",
      refreshToken: authResult.AuthenticationResult?.RefreshToken ?? "",
      idToken: authResult.AuthenticationResult?.IdToken ?? "",
    };
  }

  public async verifyMfa(input: {
    username: string;
    session: string;
    code: string;
  }): Promise<{ accessToken: string; refreshToken: string; idToken: string }> {
    const result = await this.client.send(
      new RespondToAuthChallengeCommand({
        ClientId: this.clientId,
        ChallengeName: "SOFTWARE_TOKEN_MFA",
        ChallengeResponses: {
          USERNAME: input.username,
          SOFTWARE_TOKEN_MFA_CODE: input.code,
          SECRET_HASH: this.secretHash(input.username),
        },
        Session: input.session,
      })
    );
    console.log(">>> Verify MFA result:", result);
    return {
      accessToken: result.AuthenticationResult?.AccessToken ?? "",
      refreshToken: result.AuthenticationResult?.RefreshToken ?? "",
      idToken: result.AuthenticationResult?.IdToken ?? "",
    };
  }

  public async verifyIdToken(input: {
    idToken: string;
  }): Promise<{ id: string; email: string }> {
    const payload = await this.accessIdVerifier.verify(input.idToken);
    console.log(">>> ID token payload:", payload);
    return {
      id: payload.sub,
      email: (payload as any).email,
    };
  }

  private secretHash(username: string): string {
    const hasher = createHmac("sha256", this.clientSecret);
    hasher.update(`${username}${this.clientId}`);
    return hasher.digest("base64");
  }
}

export const cognito = new Cognito();
