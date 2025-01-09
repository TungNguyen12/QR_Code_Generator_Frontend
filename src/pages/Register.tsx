import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Box, Typography, Container, Grid, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import api from '../utils/api'
import { RegisterForm } from '../types/registerForm'
import { registerSchema } from '../validation/schemas'
import InputField from '../components/InputField'

const Register: React.FC = () => {
  const navigate = useNavigate()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      await api.post('/auth/register', data)
      navigate('/login')
      reset()
    } catch (error) {
      alert('Registration failed!')
    }
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <InputField
            label="Username"
            name="username"
            register={register}
            error={errors.username}
          />
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
              Register
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={() => navigate(`/`)} sx={{ cursor: 'pointer' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Register
