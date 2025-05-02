import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPokemonDetails = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(response.data);
      const speciesResponse = await axios.get(response.data.species.url);
      const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);
      setEvolutionChain(evolutionResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon details", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">{pokemon.name}</h1>

      <div className="flex flex-col md:flex-row items-center justify-center mb-6">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 md:w-40 md:h-40 mb-4 md:mb-0"
        />
        <div className="text-center md:text-left mt-4 md:mt-0 md:ml-6">
          <p className="text-lg font-medium text-gray-700">ID: {pokemon.id}</p>
          <p className="text-lg font-medium text-gray-700">Height: {pokemon.height} dm</p>
          <p className="text-lg font-medium text-gray-700">Weight: {pokemon.weight} hg</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-6 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-blue-500">Stats:</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-200 text-blue-900">
              <th className="border px-4 py-2 text-left">Stat</th>
              <th className="border px-4 py-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {pokemon.stats.map((stat) => (
              <tr key={stat.stat.name} className="odd:bg-blue-50 hover:bg-blue-100 transition-all">
                <td className="border px-4 py-2 capitalize">{stat.stat.name}</td>
                <td className="border px-4 py-2">{stat.base_stat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Abilities Section */}
      <div className="mb-6 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-green-500">Abilities:</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-green-200 text-green-900">
              <th className="border px-4 py-2 text-left">Ability</th>
            </tr>
          </thead>
          <tbody>
            {pokemon.abilities.map((ability) => (
              <tr key={ability.ability.name} className="odd:bg-green-50 hover:bg-green-100 transition-all">
                <td className="border px-4 py-2 capitalize">{ability.ability.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Moves Section */}
      <div className="mb-6 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-purple-500">Moves:</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-purple-200 text-purple-900">
              <th className="border px-4 py-2 text-left">Move</th>
            </tr>
          </thead>
          <tbody>
            {pokemon.moves.slice(0, 10).map((move) => (
              <tr key={move.move.name} className="odd:bg-purple-50 hover:bg-purple-100 transition-all">
                <td className="border px-4 py-2 capitalize">{move.move.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Evolution Chain Section */}
      {evolutionChain && (
        <div className="mb-6 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 text-yellow-500">Evolution Chain:</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-yellow-200 text-yellow-900">
                <th className="border px-4 py-2 text-left">Evolution</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-yellow-50 hover:bg-yellow-100 transition-all">
                <td className="border px-4 py-2 capitalize">
                  {evolutionChain.chain.species.name}
                  {evolutionChain.chain.evolves_to.length > 0 && (
                    <span className="ml-2">→ {evolutionChain.chain.evolves_to.map((evolution) => (
                      <span key={evolution.species.name} className="capitalize">{evolution.species.name}</span>
                    ))}</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center mt-6">
        <Link to="/" className="text-blue-500 hover:underline">Back to Pokémon List</Link>
      </div>
    </div>
  );
};

export default PokemonDetail;
