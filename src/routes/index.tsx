import React, { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
  useLocation,
  useOutlet,
} from "react-router";
import { AnimatePresence, motion } from "framer-motion";

const Layout = React.lazy(() => import("../components/organisms/Layout"));
const NotFound = React.lazy(() => import("../components/organisms/NotFound"));
const Home = React.lazy(() => import("../components/templates/HomePage"));

const Posts = React.lazy(
  () => import("../components/templates/Post/PostsPage"),
);
const CreatePost = React.lazy(
  () => import("../components/templates/Post/CreatePostPage"),
);

const AnimatedWrapper = () => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full"
      >
        {element}
      </motion.div>
    </AnimatePresence>
  );
};

const AppRouter = () => {
  const routes: RouteObject[] = [
    {
      element: <AnimatedWrapper />,
      children: [
        {
          path: "/",
          element: (
            <Suspense>
              <Layout />
            </Suspense>
          ),
          children: [
            {
              path: "posts",
              element: (
                <Suspense>
                  <Posts />
                </Suspense>
              ),
            },
            {
              path: "posts/create",
              element: (
                <Suspense>
                  <CreatePost />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "/",
          index: true,
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRouter;

