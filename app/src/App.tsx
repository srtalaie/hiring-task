import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import "./App.css";
import { fetchBookCollection } from "./api/reducers/bookCollReducer";
import { fetchBooks } from "./api/reducers/bookReducer";

function App() {
  const [userCheck, setUserCheck] = useState(false);

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchBookCollection());
  }, [dispatch]);

  return (
    <Grid container>
    </Grid>
  );
}

export default App;
