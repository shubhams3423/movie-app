import React from "react";
import styled from "styled-components";
import dummyPlaceholder from "../assets/dummy_345x260.png";
const Movie = ({ movie, onMovieSelect }) => {
  return (
    <MovieContainer onClick={() => onMovieSelect(movie.imdbID)}>
      <CoverImage
        src={movie?.Poster === "N/A" ? dummyPlaceholder : movie?.Poster}
      />
      <MovieInfo title={movie?.Title}>
        <h1>{movie?.Title}</h1>
      </MovieInfo>
    </MovieContainer>
  );
};

export default Movie;

const MovieContainer = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: white;
  cursor: pointer;
  width: 285px;
  @media (max-width: 500px) {
    width: 175px;
    height: 100%;
  }
`;
const CoverImage = styled.img`
  height: 345px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  object-fit: fill;
  @media (max-width: 500px) {
    width: 100%;
    height: 210px;
  }
`;
const MovieInfo = styled.div`
  overflow: hidden;
  h1 {
    margin-top: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    font-weight: 700;
    background-color: white;
    color: black;
    text-align: center;
  }
`;
