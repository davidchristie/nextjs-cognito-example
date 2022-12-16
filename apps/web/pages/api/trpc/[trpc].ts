import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: ({ req, res }) => ({ req, res }),
  onError: ({ error }) => {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      console.error(error);
    }
  },
});
