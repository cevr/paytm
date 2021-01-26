import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = createMuiTheme();
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
