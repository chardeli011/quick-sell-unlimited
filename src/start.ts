console.log("[Debug] Executing src/start.ts");
import { hydrateStart } from "@tanstack/react-start-client";
import { getRouter } from "./router";

console.log("[Debug] Initializing router in src/start.ts");
const router = getRouter();

console.log("[Debug] Calling hydrateStart()");
export const startInstance = hydrateStart();
console.log("[Debug] hydrateStart() completed");
