import { Button, Grid, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../../api/services/authService"

const RegisterUser = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const createUser = async () => {
    const pwRe: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRe: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!name || !email || !password) {
      alert("Please fill in all fields")
    } else if (!(pwRe.test(password))) {
      alert("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character");
    } else if (!(emailRe.test(email))) {
      alert("Please enter a valid email");
    } else {
      const user = { name, email, password }
      const response = await register(user)
      if (response.message === "User created successfully") {
        alert("User created successfully")
        navigate("/login")
      } else {
        alert("Error creating user")
      }
    }
  }

  return (
    <Grid container component="div" direction={"column"} justifyContent="center" alignItems="center" spacing={2}>
      <h1>Register</h1>
      <Grid>
        <TextField label="name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
      </Grid>
      <Grid>
        <TextField label="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Grid>
      <Grid>
        <TextField label="password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Grid>
      <Button variant="contained" onClick={createUser}>Create User</Button>
    </Grid>
  )
}

export default RegisterUser