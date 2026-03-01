import React, { Suspense } from "react";
import { Navigate, type RouteObject } from "react-router-dom";

const Home = React.lazy(() => import("../../components/templates/Home"));

const routes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="home" replace={true} />,
  },
  {
    path: "home",
    element: (
      <Suspense>
        <Home />
      </Suspense>
    ),
  },
];

export default routes;
