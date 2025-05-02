import React, { useEffect, useState } from "react";

const typesList = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
  "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark",
  "steel", "fairy"
];

export default function SearchFilterBar({ search, setSearch, selectedTypes, setSelectedTypes }) {
  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        className="border p-2 w-full mb-2"
      />

      <div className="flex flex-wrap gap-2">
        {typesList.map((type) => (
          <label key={type} className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeChange(type)}
            />
            <span className="capitalize">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
