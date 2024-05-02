import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateUser } from './components/Create-User-Component/Create-User-Component';
import { LoginComponent } from './components/Login-Component/Login-Component';
import { RegistrationComponent } from './components/Registration-Component/Registration-Component';
import { HomePage } from './components/Home/HomePage';
import { Reimbursement } from './components/Home/Reimbursement/Reimbursement';
import { GetAllUsersComponent } from './components/Home/Manage-Users/Get-All-Users-Component';
import { ManageUsers } from './components/Home/Manage-Users/Manage-Users';
import { Welcome } from './components/Welcome/Welcome';
import { DeleteUser } from './components/Home/Manage-Users/Delete-User';

function App() {
  return (
    <div className="App">
     
        <BrowserRouter>
          <Routes>
            <Route path='' element={<Welcome/>}></Route>
            <Route path='/login' element={<LoginComponent/>}/>
            <Route path='/register' element={<RegistrationComponent/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/home/reimbursement' element={<Reimbursement/>}/>
            <Route path='/home/manage-users' element={<ManageUsers/>}/>
            <Route path='/home/get-all-users' element={<GetAllUsersComponent/>}/>
            <Route path='/home/manage-users/delete-user' element={<DeleteUser/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
