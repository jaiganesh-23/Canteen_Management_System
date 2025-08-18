import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const registerStaffPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [staffName, setStaffName] = React.useState('');
  const [canteenNames, setCanteenNames] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      console.log("Passwords do not match");
      return;
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, {
            email,
            password,
            name:staffName,
            canteenNames:canteenNames,
            role: 'staff',
        });
        if (response.data.success) {
            toast.success("Staff registered successfully as " + response.data.user.name);
            // Redirect to login page or dashboard
            navigate('/sign-in');
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error("Registration error:", error);
        toast.error("Something went wrong. Please try again.");
    }
  }

return (
    <div className='register-staff-page'>
            <div className="register-staff-card">
                    <div className="register-staff-form">
                            <p className='register-staff-form-header'>Welcome to Canteen Pro</p>
                            <p className='register-staff-form-text'>Enter your details to register as staff</p>
                            <form onSubmit={handleSubmit}>
                                    <div className="register-staff-form-input">
                                            <Label htmlFor="email">Email</Label>
                                            <Input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="register-staff-form-input">
                                            <Label htmlFor="password">Password</Label>
                                            <Input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="register-staff-form-input">
                                            <Label htmlFor="confirm-password">Confirm Password</Label>
                                            <Input type="password" id="confirm-password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <div className="register-staff-form-input">
                                            <Label htmlFor="staff-name">Staff Name</Label>
                                            <Input type="text" id="staff-name" placeholder="Enter your Name" value={staffName} onChange={(e) => setStaffName(e.target.value)} />
                                    </div>
                                    <div className="register-staff-form-input">
                                            <Label htmlFor="canteen-name">Canteen Names(Not required if canteens are not created.)</Label>
                                            <Label htmlFor='canteen-name'>Seperate Canteen Names with comma.</Label>
                                            <Input
                                                type="text"
                                                id="canteen-name"
                                                placeholder="Enter your Canteen Names"
                                                value={canteenNames.join(',')}
                                                onChange={(e) => setCanteenNames(e.target.value.split(',').map(name => name.trim()))}
                                            />
                                    </div>
                                    <div className='register-staff-button-div'>   
                                            <Button type="submit" className='register-staff-form-button'>Register(Staff)</Button>
                                    </div>
                            </form>
                            <p className='register-staff-form-text'>Want to register as canteen owner? <span className='sign-up-link' onClick={() => navigate('/get-started')}>Get Started</span></p>
                    </div>
                    <div className="login-image">
                            <img src="/hero_image3.png" alt="Canteen Pro Software" />
                    </div>
            </div>
    </div>
)
}

export default registerStaffPage;