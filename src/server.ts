import { createStartHandler, defaultRenderHandler } from "@tanstack/react-start/server";
import { getRouter } from "./router";
import "./lib/error-capture";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

const handler = createStartHandler({
  handler: defaultRenderHandler,
})({
  getRouter,
} as any);

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const response = await handler(request, env as any);
      if (response.status >= 500) {
        const body = await response.clone().text();
        if (body.includes("unhandled") || body.includes("Internal Server Error")) {
          console.error(consumeLastCapturedError() ?? new Error(`Server error: ${body}`));
          return new Response(renderErrorPage(), {
            status: 500,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }
      }
      return response;
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
  },
};
