// import styled from "styled-components";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./Components/Menu";
import Navbar from "./Components/Navbar";
import { darkTheme } from "./Utils/Theme";
import { lightTheme } from "./Utils/Theme";
import { useState } from "react";
import { Route, Routes } from 
"react-router-dom"
import Home from "../src/pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";

const Container = styled.div`
display:flex;

` ;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Container>
    <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
        <Navbar/>
        <Wrapper>
       <Routes>
          <Route path="/">
            <Route path="signin" element={<SignIn/>}>

            </Route>
         <Route index element={<Home path="random" type="random"/>}/>
         <Route path="trend" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />

         <Route path="video/:id" element = {<Video/>}/>


          </Route>
       </Routes>

        </Wrapper>
      </Main>
    </Container>
      </ThemeProvider>
    
    );
  }
  
  export default App;
  