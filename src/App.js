import "./App.css";
import styled from "styled-components";
function App() {
  return (
    <Wrapper className="App">
      <h1>Movie App</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  h1 {
    color: white;
    text-align: center;
  }
`;
export default App;
