import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { SignupPage } from "../auth/pages/SignupPage";
import { PrivateRoute } from "./PrivateRoute";
import { HomePage } from "../home/pages/HomePage";

export const routes = [
    {
      path: 'auth',
      element: 
        <PublicRoute>
          <Outlet />
        </PublicRoute>,
      children: [
        {
          index: true,
          element: <Navigate to='/auth/signup' />
        },
        {
          path: 'signup',
          element: <SignupPage />
        },
        {
          path: '*',
          element: <Navigate to='/auth/signup' />
        }
      ]
    },
    {
      path: '/',
      element: 
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '*',
          element: <Navigate to='/' />
        }
      ]
    }
];

export const router = createBrowserRouter(routes);

export const AppRouter = () => {
  return (
    <RouterProvider router={ router } />
  )
}