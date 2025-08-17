import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'

const registerStaffPage = () => {
  const navigate = useNavigate()

  return (
    <div className='register-staff-page'>
        <div className="register-staff-card">
            <div className="register-staff-form">
                <p className='register-staff-form-header'>Welcome to Canteen Pro</p>
                <p className='register-staff-form-text'>Enter your details to register as staff</p>
                <form action="post">
                    <div className="register-staff-form-input">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="register-staff-form-input">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <div className="register-staff-form-input">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input type="password" id="confirm-password" placeholder="Confirm your password" />
                    </div>
                    <div className="register-staff-form-input">
                        <Label htmlFor="staff-id">Staff Name</Label>
                        <Input type="text" id="staff-id" placeholder="Enter your Name" />
                    </div>
                    <div className="register-staff-form-input">
                        <Label htmlFor="canteen-id">Canteen Name</Label>
                        <Input type="text" id="canteen-id" placeholder="Enter your Canteen Name" />
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