import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router';

const Layout = React.lazy(() => import('../components/organisms/Layout'));
const NotFound = React.lazy(() => import('../components/organisms/NotFound'));
const Login = React.lazy(() => import('../components/templates/LoginPage'));
const Register = React.lazy(
  () => import('../components/templates/RegisterPage'),
);
const Home = React.lazy(() => import('../components/templates/HomePage'));
const Posts = React.lazy(() => import('../components/templates/PostsPage'));

const AppRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/login',
      element: (
        <Suspense>
          <Login />
        </Suspense>
      ),
    },
    {
      path: '/register',
      element: (
        <Suspense>
          <Register />
        </Suspense>
      ),
    },
    {
      path: '/',
      element: (
        <Suspense>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path: 'posts',
          element: (
            <Suspense>
              <Posts />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '/',
      index: true,
      element: (
        <Suspense>
          <Home />
        </Suspense>
      ),
    },
    {
      path: '*',
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
