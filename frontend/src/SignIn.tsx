import React, { useState } from 'react'
import { TextField, Button, Typography, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// import { useUser } from './context/UserContext'

interface LoginFormProps {
	onLogin: (email: string, password: string) => void
}

export const SignIn: React.FC<LoginFormProps> = ({ onLogin }) => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onLogin(email, password)
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Typography component='h1' variant='h5'>
				Sign In
			</Typography>
			<form onSubmit={handleSubmit}>
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
					Sign In
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
						onClick={() => navigate('/register')}
					>
						Sign Up
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
