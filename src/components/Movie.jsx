import React from "react";
import styled from "styled-components";

const Movie = ({ movie, onMovieSelect }) => {
  return (
    <MovieContainer onClick={() => onMovieSelect(movie.imdbID)}>
      <CoverImage src={movie?.Poster} />
      <MovieInfo title="">
        <h1>{movie?.Title}</h1>
        <div>
          <p>year:{movie?.Year}</p>
          <p>{movie?.Type}</p>
        </div>
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
  @media (max-width: 500px) {
    width: 175px;
    height: 100%;
  }
`;
const CoverImage = styled.img`
  height: 343px;
  width: 260px;
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
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    font-weight: 700;
    background-color: white;
    color: black;
    text-align: center;
  }
  div {
    display: flex;
    justify-content: space-between;
    margin-top: 3px;
  }
`;
