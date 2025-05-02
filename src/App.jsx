import React from "react";
import { Routes, Route } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
}
