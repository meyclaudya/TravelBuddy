import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (destination) => {
    setFavorites((prev) => {
      if (prev.find((d) => d.id === destination.id)) return prev;
      return [...prev, destination];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((d) => d.id !== id));
  };

  const isFavorite = (id) => favorites.some((d) => d.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);