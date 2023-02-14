import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import WorkoutsContextProvider from "./contexts/WorkoutContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const colors = {
  primary: {
    300: "#76E4F7",
    400: "#0BC5EA",
    500: "#00B5D8",
    600: "#00A3C4",
  },
};

const fonts = {
  heading: "Inter",
  body: "Poppins",
};

const theme = extendTheme({ colors, fonts });

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
