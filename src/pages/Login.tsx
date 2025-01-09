import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../validation/schemas'
import { loginAsync } from '../redux/slices/authSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'

import { Button, Box, Typography, Container, Grid, Link } from '@mui/material'

import { Credentials } from '../types/credentials'
import InputField from '../components/InputField'

const Login: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    dispatch(loginAsync(data))
    reset()
  }

  useEffect(() => {
    if (token) {
      const timeoutId = setTimeout(() => {
        navigate('/dashboard')
        console.log(token)
      }, 450)
      return () => clearTimeout(timeoutId)
    }
  }, [token, navigate])

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
          <InputField
            label="Email"
            name="email"
            register={register}
            error={errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
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
