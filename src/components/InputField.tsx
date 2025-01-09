import React from 'react'
import { TextField } from '@mui/material'
import { FieldError, UseFormRegister } from 'react-hook-form'

interface InputFieldProps {
  label: string
  name: string
  type?: string
  error?: FieldError
  register: UseFormRegister<any>
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  error,
  register,
}) => (
  <TextField
    fullWidth
    label={label}
    type={type}
    {...register(name)}
    error={!!error}
    helperText={error?.message}
    margin="normal"
    variant="outlined"
  />
)

export default InputField
