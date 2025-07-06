/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, createContext, useState, useEffect } from "react";

const favContext = createContext();

export default function FavProvider({ children }) {
  const [favItems, setFavItems] = useState(() => {
    const storedFav = localStorage.getItem("favItems");
    return storedFav ? JSON.parse(storedFav) : [];
  });



  const addToFav = (pro) => {
    setFavItems(() => [...favItems, pro]);
  };



  const removeFromFav = (productId) => {
    setFavItems(() => favItems.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    localStorage.setItem("favItems", JSON.stringify(favItems));
  }, [favItems]);
  return (
    <favContext.Provider
      value={{
        favItems,
        addToFav,
        setFavItems,
        removeFromFav,
      }}
    >
      {children}
    </favContext.Provider>
  );
}

export const useFav = () => useContext(favContext);
