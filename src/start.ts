import { createStartClient } from "@tanstack/react-start";
import { getRouter } from "./router";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start";

const router = getRouter();

const client = createStartClient({
  router,
});

hydrateRoot(document.getElementById("root")!, <StartClient client={client} />);
