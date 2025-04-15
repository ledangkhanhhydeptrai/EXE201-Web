import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { Analytics } from "@vercel/analytics/react";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
