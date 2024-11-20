import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Your styles
import {AuthProvider} from '../hooks/AuthContext' 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
    <AuthProvider>

    <App />
    </AuthProvider>
  </ChakraProvider>
);
