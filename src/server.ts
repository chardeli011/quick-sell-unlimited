import { createStartHandler, defaultRenderHandler } from "@tanstack/react-start/server";
import { getRouter } from "./router";

export default createStartHandler({
  handler: defaultRenderHandler,
})({
  // No options for now, just to see if it builds
} as any);
