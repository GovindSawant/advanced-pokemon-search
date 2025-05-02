import React, { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Pokémon</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {favorites.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id} className="border p-2 rounded hover:shadow">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto" />
              <p className="text-center capitalize">{pokemon.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
