import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import AchievementsPage from './achievements';
import AccountPage from './account';
import header from './layouts/header';

function App() {
    return(
        <BrowserRouter>
            <div>
                {header}
                <Routes>
                    <Route path='/' element={<AchievementsPage />}/>
                    <Route path='/account/*' element={<AccountPage />}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;