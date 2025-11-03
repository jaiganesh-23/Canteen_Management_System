import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CanteenManagementLanding from './pages/landingPage'
import SignInPage from './pages/signInPage'
import GetStartedPage from './pages/getStartedPage'
import RegisterCanteenOwnerPage from './pages/registerCanteenOwnerPage'
import RegisterStaffPage from './pages/registerStaffPage'
import ProfileDashboardPage from './pages/profileDashboardPage'
import CompleteProfilePage from './pages/completeProfilePage';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

function App() {
  
  return (
    <>
      <Analytics />
      <Toaster position="bottom-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<CanteenManagementLanding />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/register-canteen-owner" element={<RegisterCanteenOwnerPage />} />
          <Route path="/register-staff" element={<RegisterStaffPage />} />
          <Route path="/profile-dashboard" element={<ProfileDashboardPage />} />
          {/* Use path="/complete-profile" for query params, access them via useLocation or useSearchParams in CompleteProfilePage */}
          <Route path="/complete-profile" element={<CompleteProfilePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
