// Import libraries
import { v4 } from "uuid";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Import MUI Components
import { Box } from "@mui/material";

// Import Higher-Order Component
const Private = lazy(() => import(`./routes/private`));

// Import Pages and Components
const Login = lazy(() => import(`./pages/auth/login`));
const Register = lazy(() => import(`./pages/auth/register`));
const Loader = lazy(() => import(`./components/loader`));
const Error404 = lazy(() => import(`./pages/errors/error404`));
const Error500 = lazy(() => import(`./pages/errors/error500`));

// Import static data
import { routes } from "./routes/routes";
import { routesType } from "./utils/types";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <Suspense
      fallback={
        // Componentlar render bo'lgunga qadar ushbu loader UI da ko'rinib turadi!
        <Box className="w-full h-screen flex items-center justify-center">
          <Loader />
        </Box>
      }
    >
      <SnackbarProvider maxSnack={3}>
        <Routes>
          {/* All public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<Register />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="/*" element={<Error404 />} />

          {/* All private routes */}
          {routes?.map(({ path, roles, component }: routesType) => (
            <Route
              key={v4()}
              path={path}
              element={<Private roles={roles} component={component} />}
            />
          ))}
        </Routes>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
