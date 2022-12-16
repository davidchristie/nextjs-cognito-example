import { NotAuthorizedException } from "@aws-sdk/client-cognito-identity-provider";
import { initTRPC } from "@trpc/server";
import { Context } from "./context";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  errorFormatter: ({ error, shape }) => {
    if (error.cause instanceof NotAuthorizedException) {
      console.error("ERROR:", error);
      return {
        ...shape,
        data: {
          ...shape.data,
          httpStatus: 401,
        },
      };
    }
    return shape;
  },
});

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
