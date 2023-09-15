import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CalPointContextProvider from "./Context/pointContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CalPointContextProvider>
      <App />
    </CalPointContextProvider>
  </BrowserRouter>
);
