import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CanteenManagementLanding from './pages/landingPage'
import SignInPage from './pages/signInPage'
import GetStartedPage from './pages/getStartedPage'
import RegisterCanteenOwnerPage from './pages/registerCanteenOwnerPage'
import RegisterStaffPage from './pages/registerStaffPage'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CanteenManagementLanding />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/register-canteen-owner" element={<RegisterCanteenOwnerPage />} />
          <Route path="/register-staff" element={<RegisterStaffPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
