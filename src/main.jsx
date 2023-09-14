import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CalPointContextProvider from "./Context/pointContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CalPointContextProvider>
    <App />
  </CalPointContextProvider>
);
