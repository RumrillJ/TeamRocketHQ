import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateUser } from './components/Create-User-Component/Create-User-Component';
import { LoginComponent } from './components/Login-Component/Login-Component';
import { RegistrationComponent } from './components/Registration-Component/Registration-Component';
import { HomePage } from './components/Home/HomePage';
import { ManageUsers } from './components/Home/Manage-Users/Manage-Users';
import { Welcome } from './components/Welcome/Welcome';
import { DeleteUser } from './components/Home/Manage-Users/Delete-User';
import { CreateReimbursement } from './components/Home/Reimbursement/CreateReimbursement';
import { AllReimbursementsForUser } from './components/Home/Reimbursement/AllReimbursementsForUser';
import { AllReimbursements } from './components/Home/Reimbursement/AllReimbursements';

function App() {
  return (
    <div className="App">
     
        <BrowserRouter>
          <Routes>
            <Route path='' element={<Welcome/>}></Route>
            <Route path='/login' element={<LoginComponent/>}/>
            <Route path='/register' element={<RegistrationComponent/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/home/manage-users' element={<ManageUsers/>}/>
            <Route path='/home/manage-users/delete-user' element={<DeleteUser/>}/>
            <Route path='/home/reimbursement/createReimbusement' element={<CreateReimbursement/>}/>
            <Route path='/home/gruntHome' element={<AllReimbursementsForUser/>}/>
            <Route path='/home/captainHome' element={<AllReimbursements/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
