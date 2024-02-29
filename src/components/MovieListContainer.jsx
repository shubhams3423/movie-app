import React, { useState } from "react";
import styled from "styled-components";
import Movie from "./Movie";
import { useMovie } from "./ContextProvider";
import MovieInfoComponent from "./MovieInfoComponent";

const MovieListContainer = () => {
  const { setIsScrolled, movieData } = useMovie();
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [showMovieInfo, setShowMovieInfo] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const onMovieSelect = (id) => {
    setSelectedMovie(id);
    setShowMovieInfo(true);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Container>
      {showMovieInfo && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          setShowMovieInfo={setShowMovieInfo}
        />
      )}
      <MovieContainer>
        {movieData?.length ? (
          movieData.map((movie, index) => {
            return (
              <Movie movie={movie} key={index} onMovieSelect={onMovieSelect} />
            );
          })
        ) : (
          <ErrorMessage> movie not found </ErrorMessage>
        )}
      </MovieContainer>
    </Container>
  );
};

export default MovieListContainer;
const MovieContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  row-gap: 1.5rem;
`;
const Container = styled.div`
  margin-top: 5rem;
`;
const ErrorMessage = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 700;
`;
