import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthContextProvider } from "context/AuthContext";

import App from "./App";
import { InvoiceProvider } from "context/InvoiceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <InvoiceProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </InvoiceProvider>
  </AuthContextProvider>
);
