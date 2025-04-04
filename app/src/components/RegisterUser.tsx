import { Button, Grid, TextField } from "@mui/material"
import { useState } from "react"

const RegisterUser = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const createUser = async () => {
    const pwRe: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const emailRe: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!name || !email || !password) {
      alert("Please fill in all fields")
    } else if (!(pwRe.test(password))) {
      alert("Password must contain at least one letter, one number, and one special character");
    } else if (!(emailRe.test(email))) {
      alert("Please enter a valid email");
    } else {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
      if (response.ok) {
        alert("User created successfully")
      } else {
        alert("Error creating user")
      }
    }
  }

  return (
    <Grid container>
      <Grid size={12} component="div">
        <TextField label="name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" onClick={createUser}>Create User</Button>
      </Grid>
    </Grid>
  )
}

export default RegisterUser