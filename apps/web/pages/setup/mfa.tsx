import { TRPCClientError } from "@trpc/client";
import { FormEventHandler, useState } from "react";
import { useConfirmMfa } from "../../hooks/use-confirm-mfa";
import { useSetupMfa } from "../../hooks/use-setup-mfa";
import { getRequiredUsername } from "../../storage/username";

export default function SetupMfaPage(): JSX.Element {
  const setupMfa = useSetupMfa();
  const confirmMfa = useConfirmMfa();
  const [code, setCode] = useState("");
  const [submitError, setSubmitError] = useState<string>();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      await confirmMfa({
        username: getRequiredUsername(),
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
    <div>
      <h1>Setup MFA</h1>
      <pre>{JSON.stringify(setupMfa.data, null, 2)}</pre>
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
        <button type="submit">Verify MFA</button>
      </form>
    </div>
  );
}
