import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Movie from "./Movie";
import { useMovie } from "./ContextProvider";
import MovieInfoComponent from "./MovieInfoComponent";
import { API_KEY, API_URL, movieList } from "../constants";
import axios from "axios";

const MovieListContainer = () => {
  const {
    setIsScrolled,
    inputText,
    showLodder,
    setShowLodder,
    movieData,
    setMovieData,
    showMovieInfo,
    setShowMovieInfo,
  } = useMovie();
  const [selectedMovie, setSelectedMovie] = useState(0);
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

  useEffect(() => {
    setShowLodder(true);
    let index;
    index = Math.floor(Math.random() * movieList.length);
    axios
      .get(`${API_URL}?s=${movieList[index]}&apikey=${API_KEY}`)
      .then((response) => {
        setShowLodder(false);
        if (response.status === 429) {
          window.alert("Too many requests, please try again later");
        }
        setMovieData(response?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      {!showLodder && !movieData?.Error && showMovieInfo && (
        <MovieInfoComponent selectedMovie={selectedMovie} />
      )}
      <MovieContainer>
        <div>
          {showLodder && (
            <Lodder>
              <div className="lodderContaner">
                <div className="lodder"></div>
              </div>
            </Lodder>
          )}
        </div>
        <div className="movies">
          {movieData?.Search
            ? movieData?.Search?.map((movie, index) => {
                return (
                  <Movie
                    movie={movie}
                    key={index}
                    onMovieSelect={onMovieSelect}
                  />
                );
              })
            : movieData?.Error &&
              !showLodder &&
              inputText && (
                <ErrorMessage src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-7621869-6167023.png?f=webp"></ErrorMessage>
              )}
        </div>
      </MovieContainer>
    </Container>
  );
};

export default MovieListContainer;
const MovieContainer = styled.div`
  .movies {
    display: flex;
    flex-direction: row;
    padding: 10px;
    flex-wrap: wrap;
    justify-content: space-evenly;
    row-gap: 1.5rem;
  }
`;
const Container = styled.div`
  margin-top: 5rem;
  @media (max-width: 500px) {
    margin-top: 4rem;
  }
`;
const ErrorMessage = styled.img``;
const Lodder = styled.div`
  .lodderContaner {
    height: 5rem;
    width: 5rem;
    position: relative;
    margin: auto;
  }
  .lodder {
    position: absolute;
    top: 27px;
    right: 0;
    left: 0;
    margin: auto;
    --d: 22px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    color: #25b09b;
    box-shadow: calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
      calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px,
      calc(0 * var(--d)) calc(1 * var(--d)) 0 2px,
      calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 3px,
      calc(-1 * var(--d)) calc(0 * var(--d)) 0 4px,
      calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 5px,
      calc(0 * var(--d)) calc(-1 * var(--d)) 0 6px;
    animation: l27 1s infinite steps(8);
  }

  @keyframes l27 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
