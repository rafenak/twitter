import React from "react";

import "../src/assets/global.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import { Landing } from "./pages/Landing";
import { Theme } from "./utils/GlobalInterfaces";

const theme:Theme = {
  colors: {
    blue: "#1DA1F2",
    black: "#14171A",
    darkGray: "#657786",
    gray: "#AAB8C2",
    lightGray: "#E1E8ED",
    white: "#F5F8FA",
    error: "red",
  }
};

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Landing></Landing>
    </ThemeProvider>
  );
};

export default App;
