import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { API_KEY, API_URL } from "../constants";

const MovieInfoComponent = ({ selectedMovie, setShowMovieInfo }) => {
  const [singleMovieData, setSingleMovieData] = useState();
  useEffect(() => {
    axios
      .get(`${API_URL}?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => setSingleMovieData(response?.data))
      .catch((error) => console.log(error));
  }, [selectedMovie]);
  return (
    <MoveInfoContainer>
      <CoverImage src={singleMovieData?.Poster} />
      <MovieInfo>
        <h1>Movie:{singleMovieData?.Title}</h1>
        <p>
          IMDB Rating :<span>{singleMovieData?.imdbRating}</span>
        </p>
        <p>
          Language :<span>{singleMovieData?.Language}</span>
        </p>
        <p>
          Type :<span>{singleMovieData?.Type}</span>
        </p>
        <p>
          Runtime :<span>{singleMovieData?.Runtime}</span>
        </p>
        <p>
          Genre :<span>{singleMovieData?.Genre}</span>
        </p>
        <p>
          Director :<span>{singleMovieData?.Director}</span>
        </p>
        <p>
          Actors :<span>{singleMovieData?.Actors}</span>
        </p>
        <p>
          Country :<span>{singleMovieData?.Country}</span>
        </p>
      </MovieInfo>
      <Close>
        <IoMdClose
          className="crossIcon"
          onClick={() => setShowMovieInfo(false)}
        />
      </Close>
    </MoveInfoContainer>
  );
};

export default MovieInfoComponent;

const MoveInfoContainer = styled.div`
  border-radius: 10px;
  display: flex;
  width: 80%;
  margin: auto;
  background-color: white;
  padding: 10px;
  position: relative;
  margin-bottom: 2rem;
  @media (max-width: 500px) {
    flex-direction: column;
    row-gap: 10px;
    padding-top: 2rem;
  }
`;
const Close = styled.div`
  position: absolute;
  right: 10px;
  .crossIcon {
    font-size: 24px;
    cursor: pointer;
    color: black;
  }
  @media (max-width: 500px) {
    right: 2px;
    top: 3px;
    .crossIcon {
      font-size: 28px;
    }
  }
`;
const CoverImage = styled.img`
  height: 265px;
  width: 200px;
  object-fit: fill;
  @media (max-width: 500px) {
    height: 295px;
    width: 85%;
    margin: auto;
  }
`;
const MovieInfo = styled.div`
  h1 {
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin: 15px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-transform: capitalize;
    text-overflow: ellipsis;
  }
  p {
    font-size: 16px;
    font-weight: 500;
    color: black;
    margin: 4px 10px;
    & span {
      opacity: 0.7;
      text-transform: capitalize;
    }
  }
`;
