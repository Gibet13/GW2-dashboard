import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import AchievementsPage from './achievements';
import AccountPage from './account';
import header from './layouts/header';
import Footer from './layouts/footer';

function App() {
    return(
        <BrowserRouter>
            {header}
            <Routes>
                <Route path='/' element={<AchievementsPage />}/>
                <Route path='/account/*' element={<AccountPage />}/>
            </Routes>
            {Footer}
        </BrowserRouter>
    )
}

export default App;