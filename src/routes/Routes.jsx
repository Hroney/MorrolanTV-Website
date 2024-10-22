import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../components/home/Home";
import ErrorPage from "./error-page";
import { About } from "../components/about/About"
import { Tools } from "../components/tools/Tools";


const routes = createBrowserRouter([{
  path: "/",
  element: <Layout />,
  errorElement: <ErrorPage />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/tools", element: <Tools /> },
    { path: "/about", element: <About /> }
  ]
}])

export default routes