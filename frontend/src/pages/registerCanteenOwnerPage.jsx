import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'

const registerCanteenOwnerPage = () => {
  const navigate = useNavigate()

  return (
    <div className='register-canteen-owner-page'>
        <div className="register-canteen-owner-card">
            <div className="register-canteen-owner-form">
                <p className='register-canteen-owner-form-header'>Welcome to Canteen Pro</p>
                <p className='register-canteen-owner-form-text'>Enter your details to register as canteen owner</p>
                <form action="post">
                    <div className="register-canteen-owner-form-input">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="register-canteen-owner-form-input">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <div className="register-canteen-owner-form-input">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input type="password" id="confirm-password" placeholder="Confirm your password" />
                    </div>
                    <div className="register-canteen-owner-form-input">
                        <Label htmlFor="staff-id">Canteen Owner Name</Label>
                        <Input type="text" id="staff-id" placeholder="Enter your Name" />
                    </div>
                    <div className="register-canteen-owner-form-input">
                        <Label htmlFor="canteen-id">Canteen Name</Label>
                        <Input type="text" id="canteen-id" placeholder="Enter your Canteen Name" />
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