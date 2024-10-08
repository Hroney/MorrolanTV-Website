import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);