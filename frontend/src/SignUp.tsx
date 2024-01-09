import React, { useState } from 'react'
import { TextField, Button, Typography, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface RegistrationFormProps {
	onRegister: (email: string, password: string, fullName: string) => void
}

export const SignUp: React.FC<RegistrationFormProps> = ({ onRegister }) => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [fullName, setFullName] = useState('')

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onRegister(email, password, fullName)
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Typography component='h1' variant='h5'>
				Sign Up
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					label='Full name'
					autoComplete='fullName'
					autoFocus
					value={fullName}
					onChange={e => setFullName(e.target.value)}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					label='Email address'
					autoComplete='email'
					autoFocus
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					label='Password'
					type='password'
					autoComplete='current-password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<Button type='submit' fullWidth variant='contained' color='primary'>
					Sign Up
				</Button>
				<div
					style={{
						display: 'grid',
						placeItems: 'center',
					}}
				>
					<Button
						fullWidth
						variant='outlined'
						color='primary'
						sx={{
							marginTop: '10px',
							width: '50%',
						}}
						onClick={() => navigate('/login')}
					>
						Sign In
					</Button>
					<Button
						fullWidth
						variant='outlined'
						color='primary'
						sx={{
							marginTop: '10px',
							width: '50%',
						}}
						onClick={() => navigate('/')}
					>
						Home
					</Button>
				</div>
			</form>
		</Container>
	)
}
