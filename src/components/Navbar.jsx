import React, { useState } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useMovie } from "./ContextProvider";
import logo from "../assets/logo.png";
import axios from "axios";
import { API_KEY, API_URL, movieList } from "../constants";
import { IoMdClose } from "react-icons/io";
const Navbar = () => {
  const {
    setMovieData,
    inputText,
    setInputText,
    showLodder,
    setShowLodder,
    isScrolled,
    setShowMovieInfo,
  } = useMovie();
  const [timeoutId, setTimeoutId] = useState(0);
  const fetchData = async (searchString) => {
    const inputString = searchString.toLowerCase();
    setShowMovieInfo(false);
    setShowLodder(false);
    const response = await axios.get(
      `${API_URL}?s=${inputString}&apikey=${API_KEY}`
    );
    if (response?.status === 429) {
      window.alert("Too many requests, please try again later");
    }
    setMovieData(response?.data);
  };
  const onSearchGetMovieData = () => {
    setShowLodder(true);
    let index;
    index = Math.floor(Math.random() * movieList.length);
    axios
      .get(`${API_URL}?s=${movieList[index]}&apikey=${API_KEY}`)
      .then((response) => {
        if (response?.status === 429) {
          window.alert("Too many requests, please try again later");
        }
        setMovieData(response?.data);

        setShowLodder(false);
      })
      .catch((error) => console.log(error));
  };
  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    setInputText(e.target.value.trim());
    setShowLodder(true);
    if (e.target.value) {
      const timeout = setTimeout(() => fetchData(e.target.value), 500);
      setTimeoutId(timeout);
    } else {
      onSearchGetMovieData();
    }
  };
  return (
    <Wrapper isScrolled={isScrolled}>
      <div className="logoContainer">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <h2 className="web-name">Netflixso</h2>
      </div>
      <SearchBox>
        <div>
          <IoSearch className="searchIcon" />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Search Movie"
            value={inputText}
            onChange={onTextChange}
          />
        </div>
        {showLodder && (
          <SearchBoxLoadder>
            <img
              src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
              alt=""
            />
          </SearchBoxLoadder>
        )}
        {inputText && (
          <ClearButton
            onClick={() => {
              setInputText("");
              onSearchGetMovieData();
              setShowMovieInfo(false);
            }}
          >
            <IoMdClose className="clearText" />
          </ClearButton>
        )}
      </SearchBox>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  background-color: ${(props) => (props.isScrolled ? "black" : "transparent")};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  z-index: 999;
  .logoContainer {
    display: flex;
    align-items: center;
  }
  img {
    width: 48px;
    height: 48px;
  }
  h2 {
    font-size: 2rem;
  }
  @media (max-width: 500px) {
    h2 {
      font-size: 1.8rem;
    }
    img {
      height: 35px;
      width: 35px;
    }
  }
`;
const SearchBox = styled.div`
  position: relative;
  width: 30%;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 8px 10px 8px 8px;
  div {
    display: flex;
    align-items: center;
  }
  .inputContainer {
    flex-grow: 1;
  }
  .searchIcon {
    color: black;
    cursor: not-allowed;
    font-size: 20px;
  }
  input {
    border: 0px;
    font-size: 20px;
    outline: none;
    width: 100%;
    background-color: transparent;
    margin-left: 5px;
    &::placeholder {
      font-size: 17px;
    }
    @media (max-width: 500px) {
      &::placeholder {
        font-size: 14px;
      }
    }
  }
  @media (max-width: 512px) {
    width: 50%;
    padding: 7px 10px;
    background-color: white;
    input {
      display: block;
      font-size: 14px;
    }
    .searchIcon {
      color: black;
      font-size: 18px;
    }
  }
`;
const ClearButton = styled.div`
  .clearText {
    color: black;
    font-size: 18px;
    cursor: pointer;
  }
`;
const SearchBoxLoadder = styled.div`
  img {
    width: 20px;
    height: 20px;
  }
`;
