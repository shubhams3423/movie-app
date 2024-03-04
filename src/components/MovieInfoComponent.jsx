import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { API_KEY, API_URL } from "../constants";
import { useMovie } from "./ContextProvider";
import dummyPlaceholder from "../assets/dummy_345x260.png";
const MovieInfoComponent = ({ selectedMovie }) => {
  const [singleMovieData, setSingleMovieData] = useState();
  const [lodder, setLodder] = useState(true);
  const { setShowMovieInfo } = useMovie();
  useEffect(() => {
    axios
      .get(`${API_URL}?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => {
        setSingleMovieData(response?.data);
        if (response?.status === 429) {
          window.alert("Too many requests, please try again later");
        }
        setLodder(false);
      })
      .catch((error) => console.log(error));
  }, [selectedMovie]);
  return (
    <>
      {lodder ? (
        <Lodder>
          <div className="lodderContaner">
            <div className="lodder"></div>
          </div>
        </Lodder>
      ) : (
        <MoveInfoContainer>
          <div className="coverImageContainer">
            <CoverImage
              src={
                singleMovieData?.Poster === "N/A"
                  ? dummyPlaceholder
                  : singleMovieData?.Poster
              }
            />
          </div>
          <MovieInfo>
            <MovieDetails>
              <h1>Details</h1>
              <div>
                <h2>{singleMovieData?.Title}</h2>
              </div>
              <div className="movieBox">
                <div>
                  <p className="title">Time</p>
                  <p className="info">{singleMovieData?.Runtime}</p>
                </div>
                <div>
                  <p className="title">Genre</p>
                  <p className="info">{singleMovieData?.Genre}</p>
                </div>
                <div>
                  <p className="title">Rated</p>
                  <p className="info">{singleMovieData?.imdbRating}/10</p>
                </div>
                <div>
                  <p className="title">Release Date</p>
                  <p className="info">{singleMovieData?.Released}</p>
                </div>
              </div>
            </MovieDetails>
            <PlotSummary>
              <h3>Plot Summary</h3>
              <p>{singleMovieData?.Plot}</p>
            </PlotSummary>
          </MovieInfo>
          <Close>
            <IoMdClose
              className="crossIcon"
              onClick={() => setShowMovieInfo(false)}
            />
          </Close>
        </MoveInfoContainer>
      )}
    </>
  );
};
{
}

export default MovieInfoComponent;

const MoveInfoContainer = styled.div`
  border-radius: 10px;
  display: flex;
  width: fit-content;
  margin: auto;
  background-color: white;
  padding: 15px;
  position: relative;
  margin-bottom: 2rem;
  padding-right: 25px;
  .coverImageContainer {
    margin: auto;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    row-gap: 10px;
    padding-top: 1.5rem;
  }
`;
const Close = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
  .crossIcon {
    font-size: 18px;
    cursor: pointer;
    color: black;
  }
  @media (max-width: 500px) {
    right: 5px;
    top: 8px;
    .crossIcon {
      font-size: 22px;
    }
  }
`;
const CoverImage = styled.img`
  height: 300px;
  width: 220px;
  object-fit: fill;
  border-radius: 10px;
  @media (max-width: 500px) {
    height: 300px;
    width: 220px;
    margin: auto;
  }
`;
const MovieInfo = styled.div`
width: 20rem;
margin-left: 2rem;
display: flex;
flex-direction: column;
row-gap: 2rem;
background-color: #c3c2c25e;
padding: 8px;
border-radius: 10px;
@media (max-width:500px){
  margin-left:0px;
}
}
`;
const MovieDetails = styled.div`
h1{
  margin-bottom:10px;
  font-size:22px;
  color:#434242;
}
h2{
  font-size:20px;
  margin-bottom:10px;

}
  .movieBox {
    display: grid;
    grid-template-columns: 1fr 2fr;
    background-color: #9898985e;
    row-gap: 1rem;
    padding: 8px;
    border-radius: 10px;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #c26a0e;
  }
  .info{
    font-size: 15px;
    color: #343434;
    margin-top: 2px;
    font-weight: 600;
}
  }
`;
const PlotSummary = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  p {
    background-color: #9898985e;
    color: #343434;
    padding: 8px;
    border-radius: 10px;
  }
`;

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
