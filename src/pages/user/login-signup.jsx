import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { purple } from '@mui/material/colors'
import { login, signup } from '../../store/actions/user.action.js'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'


export const LoginSignup = () => {

    const params = useParams()
    const [status, setStatus] = useState(params.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const data = new FormData(ev.currentTarget)
        const loggedInUser = {
            username: data.get('username'),
            password: data.get('password')
        }
        if (status === 'signup') {
            loggedInUser.fullname = data.get('fullname')
            dispatch(signup(loggedInUser))
        } else {
            dispatch(login(loggedInUser))
        }
        navigate('/toy')
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: purple[500],
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {status === 'login' ? 'Login' : 'Sign Up'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {status === 'signup' && <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullname"
                            label="Fullname"
                            name="fullname"
                            autoComplete="fullname"
                            autoFocus
                        />}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                            control={<Checkbox name="checkbox" value={true} color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {status === 'login' ? 'Login' : 'Sign Up'}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/#/signup" variant="body2"
                                    onClick={() => {
                                        if (status === 'login')
                                            setStatus('signup')
                                        if (status === 'signup')
                                            setStatus('login')
                                    }}>
                                    {status === 'login' && "Don't have an account? Sign Up"}
                                    {status === 'signup' && "Do you already have an account? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}