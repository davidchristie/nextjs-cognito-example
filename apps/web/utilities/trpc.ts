import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { TRPCError } from "@trpc/server";
import Router from "next/router";
import { signInPath } from "../paths";
import type { AppRouter } from "../server/routers/_app";

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

function isAuthenticationError(error: unknown): boolean {
  return (
    error instanceof TRPCClientError &&
    (error.meta?.response as Response)?.status === 401
  );
}

function onError(error: unknown): void {
  if (isAuthenticationError(error)) {
    Router.push(signInPath);
  }
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            onError,
          },
          mutations: {
            onError,
          },
        },
      },
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: true,
});
