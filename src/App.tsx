import { ThemeProvider } from "@material-ui/styles";
import { createBrowserHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import "./App.css";
import PageLayout from "./components/PageLayout/PageLayout";
import { TCRouterHistory } from "./routes/routeInterfaces";
import TCRoutes from "./routes/TCRoutes";
import themeWithOverrides from "./theme";

function App(): JSX.Element {
  return (
    <>
      <Router history={createBrowserHistory<TCRouterHistory>()}>
        <ThemeProvider theme={themeWithOverrides}>
          <PageLayout>
            <TCRoutes />
          </PageLayout>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
