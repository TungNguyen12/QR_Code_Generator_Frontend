import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import React, { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Link,
} from '@mui/material'

import { loginAsync } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { Credentials } from '../../types/credentials'
import { useAppDispatch } from '../../hooks/useAppDispatch'

const login = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(1).max(20).required(),
  })
  .required()

const Login: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(login),
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Credentials> = (data) => {
    dispatch(loginAsync(data))
    navigate('/dashboard')
    reset()
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            value={email}
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email')}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 1, mt: 2 }}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            value={password}
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            autoComplete="new-password"
            {...register('password')}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 1, mt: 2 }}
          />
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                onClick={() => navigate(`/register`)}
                sx={{ cursor: 'pointer' }}
              >
                You don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
