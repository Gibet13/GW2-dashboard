import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from './layout/header';
import Footer from './layout/footer';

import AccountPage from './pages/AccountPage';
import AchievementsPage from './pages/AchievementPage';
import HomePage from './pages/HomePage';

function App() {
  return(
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/Account' element={<AccountPage />}/>
            <Route path='/Achievements' element={<AchievementsPage />}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}

export default App;
