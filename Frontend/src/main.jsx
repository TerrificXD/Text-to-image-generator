import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter> {/* Wrap the app with BrowserRouter for routing */} 
    <AppContextProvider> {/* Wrap the app with AppContextProvider for global state management */}
      <App /> {/* Render the main App component */}
    </AppContextProvider>
  </BrowserRouter>
  // </StrictMode>,
);
