import { TRPCClientError } from "@trpc/client";
import { FormEventHandler, useState } from "react";
import { useVerifyMfa } from "../hooks/use-verify-mfa";

export default function VerifyEmailPage() {
  const verifyMfa = useVerifyMfa();
  const [code, setCode] = useState("");
  const [submitError, setSubmitError] = useState<string>();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      await verifyMfa({
        code,
      });
    } catch (error) {
      console.error(error);
      setSubmitError(
        error instanceof TRPCClientError
          ? error.message
          : "Something went wrong."
      );
    }
  };
  return (
    <main>
      <h1>Verify MFA Code</h1>
      <form onSubmit={handleSubmit}>
        {submitError && <div style={{ color: "red" }}>{submitError}</div>}
        <label>
          Code:
          <input
            name="code"
            type="text"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
            }}
          />
        </label>
        <button type="submit">Verify</button>
      </form>
    </main>
  );
}
