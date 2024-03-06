import { useEffect, useState } from "react";

import { Section } from "../style";
import { Box, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Header from "./header";
import Sidebar from "./sidebar";

interface CustomProps {
  component: () => JSX.Element;
}

const Layout = ({ component: Component }: CustomProps) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(true);

  useEffect(() => {
    localStorage.setItem("theme", mode ? "dark" : "light");
  }, [mode]);

  const theme = createTheme(mode ? { palette: { mode: "dark" } } : {});

  return (
    <ThemeProvider theme={theme}>
      <Section className="flex">
        <Box
          className={`${
            open ? "w-full" : "w-[18rem]"
          } absolute top-0 duration-300 z-50 ${
            open ? "left-0" : "-left-[20rem]"
          }`}
        >
          <Sidebar open={open} setOpen={setOpen} />
        </Box>
        <Section
          className={`w-full h-screen flex flex-col items-center justify-start duration-300 relative ${
            open ? "blur-[10px]" : ""
          }`}
        >
          <Header mode={mode} setMode={setMode} setOpen={setOpen} />
          <Component />
        </Section>
      </Section>
    </ThemeProvider>
  );
};

export default Layout;
