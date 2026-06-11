import { hydrateStart } from "@tanstack/react-start";
import { getRouter } from "./router";

const router = getRouter();

hydrateStart(router);
