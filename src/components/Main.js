import React from 'react';
import {Routes, Route} from 'react-router-dom';

import UserPage from "./UserPage";
import {AdminPage} from "./AdminPage";
import MuudaValuuta from "./MuudaValuuta";
import LisaValuuta from "./LisaValuuta";


const Main = () => {
    return (
        <Routes>
            <Route exact path='/' element={<UserPage/>}></Route>
            <Route exact path='/admin' element={<AdminPage/>}></Route>
            <Route exact path='/muuda' element={<MuudaValuuta/>}></Route>
            <Route exact path='/lisa' element={<LisaValuuta/>}></Route>
        </Routes>
    );
}

export default Main;