import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../components/home/Home";
import ErrorPage from "./error-page";
import { About } from "../components/about/About"
import { Support } from "../components/support/Support";


const routes = createBrowserRouter([{
  path: "/",
  element: <Layout />,
  errorElement: <ErrorPage />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/support", element: <Support /> },
  ]
}])

export default routes