import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
  Navigate,
} from "react-router";
import React, { Suspense } from "react";

const Layout = React.lazy(() => import("../components/organisms/Layout"));
const NotFound = React.lazy(() => import("../components/organisms/NotFound"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));

const AppRouter = () => {
  const allRouteModules = import.meta.glob("./pages/**/*.tsx", {
    eager: true,
  }) as Record<string, { default: RouteObject[] }>;

  const userModule = allRouteModules["./pages/index.tsx"];
  const selectedRoutes: RouteObject[] = userModule?.default || [];

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Navigate to="/" replace={true} />,
    },
    {
      path: "/login",
      element: (
        <Suspense>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense>
          <Register />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: (
        <Suspense>
          <Layout />
        </Suspense>
      ),
      children: selectedRoutes,
    },
    {
      path: "*",
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      ),
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRouter;
