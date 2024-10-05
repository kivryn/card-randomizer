import styled from "styled-components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { COLORS } from "./constants/constants";
import { Header } from "./components/header";
import { CardsProvider } from "./contexts/cardsContext";
import { Game } from "./components/game";
import { Configure } from "./components/setup";

const AppContainer = styled.div`
  background-color: ${COLORS.gunmetal};
  width: 100vw;
  height: 100vh;
`;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppContainer className="App">
        <Header />
        <CardsProvider>
          <>
            <Configure />
            <Game />
          </>
        </CardsProvider>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
