import "./lib/error-capture";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env?: unknown, ctx?: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  serverEntryPromise ??= import("@tanstack/react-start/server-entry").then(
    (mod) => (mod.default ?? mod) as ServerEntry,
  );

  return serverEntryPromise;
}

async function normalizeSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;

  const contentType = response.headers.get("content-type") ?? "";
  const body = await response.clone().text();
  const isMaskedSsrError =
    body.includes('"unhandled":true') ||
    body.includes('"message":"HTTPError"') ||
    body.includes("Internal Server Error");

  if (!contentType.includes("application/json") && !isMaskedSsrError) {
    return response;
  }

  console.error("[Debug] SSR 500 response:", consumeLastCapturedError() ?? body);

  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    console.log(`[Debug] Server request: ${request.method} ${request.url}`);
    try {
      const entry = await getServerEntry();
      const response = await entry.fetch(request, env, ctx);
      console.log(`[Debug] Server response status: ${response.status}`);
      return await normalizeSsrResponse(response);
    } catch (error) {
      console.error("[Debug] Server catch error:", error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
