import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  type: string
  label: string
  size: 'medium' | 'small'
}

const DataInput = ({ onChange, value, type, label, size }: Props) => {
  return (
    <Box
      sx={{
        width: '200',
        maxWidth: '100%',
      }}
    >
      <TextField
        fullWidth
        sx={{
          '& .MuiInputBase-root': {
            height: 40,
          },
        }}
        size={size}
        type={type}
        label={label}
        value={value}
        onChange={onChange}
      />
    </Box>
  )
}

export default DataInput
