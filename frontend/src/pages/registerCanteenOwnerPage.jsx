import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const registerCanteenOwnerPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [canteenOwnerName, setCanteenOwnerName] = React.useState('');
  const [canteenNames, setCanteenNames] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, {
            email,
            password,
            name: canteenOwnerName,
            canteenNames: canteenNames,
            role: 'canteenOwner',
        });
        if (response.data.success) {
            toast.success("Canteen Owner registered successfully as " + response.data.user.name);
            // Redirect to login page or dashboard
            navigate('/sign-in');
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error("Registration error:", error);
        toast.error("Something went wrong. Please try again.", error);
    }
  }

  return (
    <div className='register-canteen-owner-page'>
        <div className="register-canteen-owner-card">
            <div className="register-canteen-owner-form">
                <p className='register-canteen-owner-form-header'>Welcome to Canteen Pro</p>
                <p className='register-canteen-owner-form-text'>Enter your details to register as canteen owner</p>
                <form onSubmit={handleSubmit}>
                    <div className="register-canteen-owner-form-input">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="register-canteen-owner-form-input">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="register-canteen-owner-form-input">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input type="password" id="confirm-password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <div className="register-canteen-owner-form-input">
                        <Label htmlFor="canteen-owner-name">Canteen Owner Name</Label>
                        <Input type="text" id="canteen-owner-name" placeholder="Enter your Name" value={canteenOwnerName} onChange={(e) => setCanteenOwnerName(e.target.value)} />
                    </div>
                    <div className="register-canteen-owner-form-input">
                        <Label htmlFor="canteen-name">Canteen Names(Not Required if canteen is not created.)</Label>
                        <Label htmlFor='canteen-name'>Seperate Canteen Names with comma.</Label>
                        <Input type="text" id="canteen-name" 
                            placeholder="Enter your Canteen Name" 
                            value={canteenNames.join(',')}
                            onChange={(e) => setCanteenNames(e.target.value.split(',').map(name => name.trim()))}
                        />
                    </div>
                    <div className='register-canteen-owner-button-div'>   
                        <Button type="submit" className='register-canteen-owner-form-button'>Register(Canteen Owner)</Button>
                    </div>
                </form>
                <p className='register-canteen-owner-form-text'>Want to register as staff? <span className='sign-up-link' onClick={() => navigate('/get-started')}>Get Started</span></p>
            </div>
            <div className="login-image">
                <img src="/hero_image3.png" alt="Canteen Pro Software" />
            </div>
        </div>
    </div>
  )
}

export default registerCanteenOwnerPage;