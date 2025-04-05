import { Button, Grid, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../hooks/hooks"
import { loginUser } from "../../api/reducers/userReducer"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    const credentials = {
      email,
      password,
    }
    try {
      await dispatch(loginUser(credentials))
      navigate("/")
    } catch (error) {
      console.error("Login failed:", error)
      alert("Invalid email or password")
    }
  }
  return (
    <Grid container component="div" direction={"column"} justifyContent="center" alignItems="center" spacing={2}>
      <h1>Login</h1>
      <Grid>
        <TextField label="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Grid>
      <Grid>
        <TextField label="password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Grid>
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Grid>
  )
}

export default Login