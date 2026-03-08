import React, { useState } from "react";
import Header from './components/Header'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return(
    <BrowserRouter>
      <Header />
      <div className="flex justify-center items-center h-[calc(100vh - 6rem)]">
        <Routes>
          <Route path="/" element={
            
            <div><Home /></div>
        } />
        </Routes>
      </div>
    </BrowserRouter>

    
  )
}

export default App;