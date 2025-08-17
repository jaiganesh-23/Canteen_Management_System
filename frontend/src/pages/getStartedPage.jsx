import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'

const getStartedPage = () => {
  const navigate = useNavigate()
  return (
    <div className='get-started-page'>
        <div className="get-started-card">
            <div className="get-started-info">
                <p className='get-started-header'>Welcome to Canteen Pro, Create an account</p>
                <div className='get-started-button-div' onClick={() => navigate('/register-staff')}><Button className='get-started-button'>Register as Staff</Button></div>
                <div className='get-started-button-div' onClick={() => navigate('/register-canteen-owner')}><Button className='get-started-button'>Register as Canteen Owner</Button></div>
            </div>
            <div className="get-started-image">
                <img src="/hero_image3.png" alt="Canteen Pro Software" />
            </div>
        </div>
    </div>
  )
}

export default getStartedPage;