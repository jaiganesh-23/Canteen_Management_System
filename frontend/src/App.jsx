import { useState } from 'react'
import CanteenManagementLanding from './pages/landingPage'
import useScrollAnimation from './hooks/useScrollAnimation'
function App() {
  useScrollAnimation();
  
  return (
    <>
      <CanteenManagementLanding />
    </>
  )
}

export default App
