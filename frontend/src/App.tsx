import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
import Cookies from 'js-cookie'
import HomePage from './HomePage'
import toast from 'react-hot-toast'

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path='/login' element={<SignIn onLogin={handleLogin} />} />
				<Route
					path='/register'
					element={<SignUp onRegister={handleRegister} />}
				/>
			</Routes>
		</Router>
	)
}

export default App

async function handleLogin(email: string, password: string) {
	try {
		const response = await fetch('http://localhost:5100/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})

		if (!response.ok) {
			toast.error('Wrong credentials!')
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const data = await response.json()

		if (data.status === 404) toast.error(data.message)

		if (data.accesToken) {
			Cookies.set('token', data.accesToken, { expires: 1 })
			toast.success('Welcome!')
		}
	} catch (error) {
		console.error('Error during login:', error)
	}
}

async function handleRegister(
	email: string,
	password: string,
	fullName: string
) {
	try {
		const res = await fetch('http://localhost:5100/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userName: fullName,
				email: email,
				password: password,
			}),
		})

		if (!res.ok) {
			toast.error(res.statusText)
			throw new Error(`HTTP error! Status: ${res.status}`)
		}

		const data = await res.json()
		if (data.accesToken) {
			Cookies.set('token', data.accesToken, { expires: 1 })
			toast.success('User created and logged in!')
		}

		return data
	} catch (error) {
		console.error('Error during user registration:', error)
	}
}
