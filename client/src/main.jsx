import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <Toaster
        expand={true}
        richColors
        position="top-right"
        toastOptions={{ className: "sonner-font" }}
      />
      <App />
    </BrowserRouter>
  );
}
