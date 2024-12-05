import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { Provider } from "react-redux";
import store from "./utils/store";
import LoaderProvider from "./utils/providers/LoaderProvider.jsx";
import NotificationProvider from "./utils/providers/NotificationProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ShopContextProvider>
      <Provider store={store}>
        <NotificationProvider>
          <LoaderProvider>
            <App />
          </LoaderProvider>
        </NotificationProvider>
      </Provider>
    </ShopContextProvider>
  </BrowserRouter>
);
