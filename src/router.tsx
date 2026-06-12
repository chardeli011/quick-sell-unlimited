console.log("[Debug] Loading src/router.tsx");
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  console.log("[Debug] Creating QueryClient");
  const queryClient = new QueryClient();

  console.log("[Debug] Creating Router with routeTree:", !!routeTree);
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
