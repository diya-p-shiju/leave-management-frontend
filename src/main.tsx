import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppWrapper } from "./components/context/DataProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWrapper>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </AppWrapper>
  </StrictMode>
);
