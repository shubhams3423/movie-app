import "./App.css";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import backImg from "./assets/login.jpg";
import MovieListContainer from "./components/MovieListContainer";
function App() {
  return (
    <Wrapper className="App">
      <BackImg src={backImg} />
      <Container>
        <Navbar />
        <MovieListContainer />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;
const BackImg = styled.img`
position: fixed;
width: 100%;
height: 100%;
object-fit: cover; 
filter: blur(3px)
 
}`;
const Container = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
`;
export default App;
