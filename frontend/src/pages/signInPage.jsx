import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInPage = () => {

  return (
    <div className='login-page'>
        <div className="login-card">
            <div className="login-form">
                <p className='login-form-header'>Welcome Back to Canteen Pro</p>
                <p className='login-form-text'>Login into your canteen pro account</p>
                <form action="post">
                    <div className="login-form-input">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="login-form-input">
                        <Label htmlFor="password">Password</Label>
                        <p className='forgot-password'>Forgot Password?</p>
                        <Input type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <div className='button-div'>   
                        <Button type="submit" className='login-form-button'>Sign In</Button>
                    </div>
                    <div className="google-button-div">
                        <Button className='google-button'>
                            <i class='bxl  bx-google google-icon'  ></i> 
                            Sign in with Google
                        </Button>
                    </div>
                </form>
                <p className='login-form-text'>Don't have an account? <span className='sign-up-link'>Sign Up</span></p>
            </div>
            <div className="login-image">
                <img src="/hero_image3.png" alt="Canteen Pro Software" />
            </div>
        </div>
    </div>
  )
}

export default signInPage