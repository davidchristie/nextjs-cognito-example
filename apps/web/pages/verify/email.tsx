import { TRPCClientError } from "@trpc/client";
import { FormEventHandler, useState } from "react";
import { useVerifyEmail } from "../../hooks/use-verify-email";

export default function VerifyEmailPage() {
  const verifyEmail = useVerifyEmail();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [submitError, setSubmitError] = useState<string>();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      await verifyEmail({
        email,
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
      <h1>Verify Email</h1>
      <form onSubmit={handleSubmit}>
        {submitError && <div style={{ color: "red" }}>{submitError}</div>}
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
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
