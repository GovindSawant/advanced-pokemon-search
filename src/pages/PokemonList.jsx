import React, { useContext, useState, useMemo } from "react";
import { PokemonContext } from "../contexts/PokemonContext";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { Link } from "react-router-dom";
import SearchFilterBar from "../components/SearchFilterBar";
import axios from "axios";

const PokemonList = () => {
  const { pokemonList, loading, page, setPage, limit, setLimit } = useContext(PokemonContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(null);

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      setRandomPokemon(response.data);
    } catch (error) {
      console.error("Error fetching random Pokémon", error);
    }
  };

  const filteredList = useMemo(() => {
    return pokemonList.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(search.toLowerCase());
      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.every((type) => pokemon.types.map((t) => t.type.name).includes(type));
      return matchesName && matchesType;
    });
  }, [pokemonList, search, selectedTypes]);

  const isFavorite = (id) => favorites.some((pokemon) => pokemon.id === id);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-600">Pokémon Explorer</h1>

      <div className="mb-4 text-center">
        <Link to="/favorites" className="text-blue-500 hover:underline text-xl">
          View Your Favorites
        </Link>
      </div>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
      />

      <div className="mb-6 text-center">
        <button
          onClick={fetchRandomPokemon}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition-all transform hover:scale-105"
        >
          Show Random Pokémon
        </button>
      </div>

      {randomPokemon && (
        <div className="mb-6 p-6 bg-white rounded-lg shadow-xl flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold mb-2 text-blue-500">Random Pokémon: {randomPokemon.name}</h2>
          <img
            src={randomPokemon.sprites.front_default}
            alt={randomPokemon.name}
            className="w-32 h-32 mx-auto mb-4 rounded-md shadow-lg"
          />
          <p className="capitalize text-lg">ID: {randomPokemon.id}</p>
          <p className="text-lg">Height: {randomPokemon.height} dm</p>
          <p className="text-lg">Weight: {randomPokemon.weight} hg</p>

          <div className="mt-4">
            <button
              onClick={() => toggleFavorite(randomPokemon)}
              className={`p-2 rounded-full ${isFavorite(randomPokemon.id) ? "bg-yellow-400" : "bg-gray-200"}`}
              title={isFavorite(randomPokemon.id) ? "Remove from favorites" : "Add to favorites"}
            >
              ⭐
            </button>
          </div>
        </div>
      )}

      {/* Styled Items per Page Dropdown */}
      <div className="mb-6 flex justify-center items-center space-x-4">
        <label className="text-lg font-semibold text-gray-700">Items per page:</label>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border-2 border-blue-500 p-3 rounded-lg bg-white shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          {[10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : (
        <>
          {/* Pokémon Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredList.map((pokemon) => (
              <div
                key={pokemon.id}
                className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transform transition-all hover:scale-105 relative"
              >
                <Link to={`/pokemon/${pokemon.id}`} className="block text-center">
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-32 h-32 mx-auto mb-4 rounded-md"
                  />
                  <p className="capitalize text-lg font-semibold">{pokemon.name}</p>
                </Link>

                <button
                  onClick={() => toggleFavorite(pokemon)}
                  className={`absolute top-2 right-2 p-2 rounded-full ${isFavorite(pokemon.id) ? "bg-yellow-400" : "bg-gray-200"}`}
                  title={isFavorite(pokemon.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  ⭐
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-6 py-3 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 text-lg"
            >
              Previous
            </button>
            <span className="text-xl text-gray-700">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-3 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 text-lg"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonList;
