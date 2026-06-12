import { createStartHandler, defaultRenderHandler } from "@tanstack/react-start/server";
import { getRouter } from "./router";
import "./lib/error-capture";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

const handler = createStartHandler({
  handler: defaultRenderHandler,
});

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    console.log(`[Debug] Server request: ${request.method} ${request.url}`);
    try {
      const response = await handler(request, { getRouter } as any);
      console.log(`[Debug] Server response status: ${response.status}`);
      if (response.status >= 500) {
        const body = await response.clone().text();
        if (body.includes("unhandled") || body.includes("Internal Server Error")) {
          const lastError = consumeLastCapturedError();
          console.error("[Debug] Server internal error detected:", lastError);
          return new Response(renderErrorPage(), {
            status: 500,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }
      }
      return response;
    } catch (error) {
      console.error("[Debug] Server catch error:", error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
  },
};
