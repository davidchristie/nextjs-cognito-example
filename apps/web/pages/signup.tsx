import { TRPCClientError } from "@trpc/client";
import { FormEventHandler, useState } from "react";
import { useSignUp } from "../hooks/use-sign-up";

export default function SignUpPage() {
  const signUp = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState<string>();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      await signUp({
        email,
        password,
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
      <h1>Sign Up</h1>
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
          Password:
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
}
