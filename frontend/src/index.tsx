import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/assets/global.css";
import { Provider } from "react-redux";
import { store } from "./redux/Store";

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
} else {
  console.error("Root element not found");
}
