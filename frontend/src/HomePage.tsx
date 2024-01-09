import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Cookies from 'js-cookie'

export default function HomePage() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const navigate = useNavigate()
	useEffect(
		function () {
			const cookies = Cookies.get('token')
			if (!cookies) {
				setIsLoggedIn(false)
				navigate('/login')
			}
			if (cookies) setIsLoggedIn(true)
		},
		[navigate, isLoggedIn]
	)
	return (
		isLoggedIn && (
			<div>
				<h1>Welcome!</h1>
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
						onClick={() => navigate('/register')}
					>
						Sign Up
					</Button>
				</div>
			</div>
		)
	)
}
