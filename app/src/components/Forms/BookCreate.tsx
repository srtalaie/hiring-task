import { Button, Grid, List, ListItem, ListItemText, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { User } from "../../../../types"
import { useAppDispatch } from "../../../hooks/hooks"
import { addABook } from "../../api/reducers/bookReducer"

const BookCreate = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [summary, setSummary] = useState('')
  const [genre, setGenre] = useState('')
  const [genreArray, setGenreArray] = useState<string[]>([])
  const [isbn, setIsbn] = useState('')
  const [owner, setOwner] = useState<User | null>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // Get logged in user id for owner field
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      setOwner(JSON.parse(loggedInUserJSON))
    }
  }, [])

  const handleGenreAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (genre) {
      setGenreArray([...genreArray, genre])
      setGenre('')
    }
  }

  const handleBookCreate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !author || !summary || !isbn) {
      alert('Please fill in all fields')
      return
    }

    if (!owner) {
      alert('Owner information is missing')
      return
    }

    const book = {
      title,
      author,
      summary,
      genre: genreArray,
      isbn,
      owner,
    }
    try {
      await dispatch(addABook(book))
      alert('Book created successfully')
      // Reset form fields after successful creation
      setTitle('')
      setAuthor('')
      setGenre('')
      setSummary('')
      setIsbn('')
      setGenreArray([])
    } catch (error) {
      console.error('Error creating book:', error)
      alert('Error creating book. Please try again.')
    }
  }

  return (
    <Grid container component="div" direction={"column"} justifyContent="center" alignItems="center" spacing={2}>
      <h1>Create a Book</h1>
      <Grid>
        <TextField label="title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Grid>
      <Grid>
        <TextField label="author" variant="outlined" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </Grid>
      <Grid>
        <TextField label="isbn" variant="outlined" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      </Grid>
      <Grid>
        <TextField label="summary" variant="outlined" value={summary} onChange={(e) => setSummary(e.target.value)} />
      </Grid>
      <Grid container direction={"column"} justifyContent="center" alignItems="center" spacing={2}>
        <Grid>
          <TextField label="genre" variant="outlined" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </Grid>
        <Grid>
          <Button variant="contained" onClick={handleGenreAdd}>Add Genre</Button>
        </Grid>
        <Grid>
          <List>
            {genreArray.length > 0 ? (
              genreArray.map((g) => (
                <ListItem key={g}>
                  <ListItemText primary={g} />
                </ListItem>
              ))
            ) : (<></>)}
          </List>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleBookCreate}>Create Book</Button>
    </Grid>
  )
}

export default BookCreate