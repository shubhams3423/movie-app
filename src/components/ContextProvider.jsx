import { createContext, useContext, useState } from "react";
import React from "react";

const movieContext = createContext();

const ContextProvider = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showLodder, setShowLodder] = useState(false);
  const [showMovieInfo, setShowMovieInfo] = useState(false);

  return (
    <movieContext.Provider
      value={{
        inputText,
        setInputText,
        movieData,
        setMovieData,
        isScrolled,
        setIsScrolled,
        showLodder,
        setShowLodder,
        showMovieInfo,
        setShowMovieInfo,
      }}
    >
      {children}
    </movieContext.Provider>
  );
};
const useMovie = () => useContext(movieContext);
export { ContextProvider, useMovie };
