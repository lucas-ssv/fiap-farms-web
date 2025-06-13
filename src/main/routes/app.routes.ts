import { Dashboard } from "@/presentation/pages/app";
import { createBrowserRouter } from "react-router";

export const appRoutes = createBrowserRouter([{
  path: '/',
  Component: Dashboard
}])