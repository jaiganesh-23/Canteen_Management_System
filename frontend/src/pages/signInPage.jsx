import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const signInPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
            email,
            password,
        });
        if (response.data.success) {
            toast.success("Login successful as " + response.data.user.name);
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            // Redirect to profile dashboard
            navigate('/profile-dashboard');
        } else {
            console.log("Login failed:", response.data.message);
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error("Login error:", error);
        // Handle error response from the server
        if (error.response && error.response.data && error.response.data.message) {
            // Use the server's error message (e.g., for 400 Bad Request)
            toast.error(error.response.data.message);
        } else {
            // Fallback for network or unknown errors
            toast.error("Something went wrong. Please try again.");
        }
        return;
    }
  }

  return (
    <div className='login-page'>
        <div className="login-card">
            <div className="login-form">
                <p className='login-form-header'>Welcome Back to Canteen Pro</p>
                <p className='login-form-text'>Login into your canteen pro account</p>
                <form onSubmit={handleSubmit}>
                    <div className="login-form-input">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="login-form-input">
                        <Label htmlFor="password">Password</Label>
                        <p className='forgot-password'>Forgot Password?</p>
                        <Input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='button-div'>   
                        <Button type="submit" className='login-form-button'>Sign In</Button>
                    </div>
                    <div className="google-button-div">
                        <Button className='google-button' type='button' onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`}>
                            <i class='bxl  bx-google google-icon'  ></i> 
                            Sign in with Google
                        </Button>
                    </div>
                </form>
                <p className='login-form-text'>Don't have an account? <span className='sign-up-link' onClick={() => navigate('/get-started')}>Get Started</span></p>
            </div>
            <div className="login-image">
                <img src="/hero_image3.png" alt="Canteen Pro Software" />
            </div>
        </div>
    </div>
  )
}

export default signInPage