import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [typesFilter, setTypesFilter] = useState([]);
  const [sortOption, setSortOption] = useState("id");

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const results = await Promise.all(
        res.data.results.map((p) => axios.get(p.url).then((r) => r.data))
      );
      setPokemonList(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        loading,
        page,
        setPage,
        limit,
        setLimit,
        typesFilter,
        setTypesFilter,
        sortOption,
        setSortOption,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
