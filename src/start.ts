import { hydrateStart } from "@tanstack/react-start-client";
import { getRouter } from "./router";

const router = getRouter();

hydrateStart();
console.log("Hydration complete");
