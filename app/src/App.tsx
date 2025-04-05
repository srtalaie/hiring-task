import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { fetchBookCollection } from "./api/reducers/bookCollReducer";
import { fetchBooks } from "./api/reducers/bookReducer";
import NavBar from "./components/NavBars/NavBar";
import CreateBookPage from "./pages/CreateBookPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

const loggedInNavItems = [{ text: 'Home', loc: '/' }, { text: 'Logout', loc: '/logout' }, { text: 'Create Book', loc: '/createbook' }];
const loggedOutNavItems = [{ text: 'Home', loc: '/' }, { text: 'login', loc: '/login' }, { text: 'Register', loc: '/register' }];

function App() {
  const [userCheck, setUserCheck] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if user is logged in, if not change navbar to show only login and register options
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      setUserCheck(true)
    }
  }, [])

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchBookCollection());
  }, [dispatch]);

  return (
    <>
      <Container>
        {userCheck ? <NavBar navItems={loggedInNavItems} /> : <NavBar navItems={loggedOutNavItems} />}
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createbook" element={<CreateBookPage />} />
      </Routes>
    </>

  );
}

export default App;
