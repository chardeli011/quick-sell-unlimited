import { createStartClient } from "@tanstack/react-start";
import { getRouter } from "./router";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start";
import React from "react";

const router = getRouter();

const client = createStartClient({
  router,
});

hydrateRoot(document.getElementById("root")!, React.createElement(StartClient, { client }));
