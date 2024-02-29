import React, { useState } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useMovie } from "./ContextProvider";
import axios from "axios";
import { API_KEY, API_URL } from "../constants";
const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { isScrolled } = useMovie();
  const { setMovieData, inputText, setInputText } = useMovie();
  const [timeoutId, setTimeoutId] = useState(0);
  const fetchData = async (searchString) => {
    const response = await axios.get(
      `${API_URL}?s=${searchString}&apikey=${API_KEY}`
    );
    setMovieData(response.data?.Search);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    setInputText(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    setTimeoutId(timeout);
  };
  return (
    <Wrapper isScrolled={isScrolled}>
      <div className="logoNameContainer">
        <div className="logo">
          <img src="/movie-icon.svg" alt="" />
        </div>
        <h2 className="web-name">Netflixso</h2>
      </div>
      <SearchBox showSearch={showSearch}>
        <IoSearch
          className="searchIcon"
          onMouseEnter={() => setShowSearch(true)}
        />
        <input
          type="text"
          placeholder="Search Movie"
          value={inputText}
          onChange={onTextChange}
        />
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
  .logoNameContainer {
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
  .searchIcon {
    color: black;
    user-select: none;
  }
  input {
    border: 0px;
    font-size: 19px;
    outline: none;
    width: 100%;
    background-color: transparent;
    margin-left: 5px;
  }
  @media (max-width: 512px) {
    width: ${(props) => (props.showSearch ? "50%" : "fit-content")};
    padding: 4px 10px;
    background-color: ${(props) =>
      props.showSearch ? "white" : "transparent"};
    input {
      display: ${(props) => (props.showSearch ? "block" : "none")};
      font-size: 14px;
    }
    .searchIcon {
      color: ${(props) => (props.showSearch ? "black" : "white")};
    }
  }
`;
