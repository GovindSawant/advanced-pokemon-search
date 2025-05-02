import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PokemonProvider } from "./contexts/PokemonContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <PokemonProvider>
          <App />
        </PokemonProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
