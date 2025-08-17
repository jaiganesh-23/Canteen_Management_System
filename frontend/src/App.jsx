import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CanteenManagementLanding from './pages/landingPage'
import SignInPage from './pages/signInPage'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CanteenManagementLanding />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
