import App from "./App.tsx";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// Import langs method
import "./utils/i18next";

// import styles
import "./style/index.css";
import "flag-icon-css/css/flag-icons.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { store } from "./store/index.ts";
import { SnackbarProvider } from "notistack";
import { StyledEngineProvider } from "@mui/material";

ReactDOM.createRoot(
  document.getElementById("crm_market") as HTMLDivElement
).render(
  <BrowserRouter>
    <StyledEngineProvider>
      <Provider store={store}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </Provider>
    </StyledEngineProvider>
  </BrowserRouter>
);
