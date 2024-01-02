import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Login from './Login'
import Home from './Home'
import Create from './Create';
import Edit from './Edit';
import View from './View';
import NotFound from './NotFound';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PublicRoute from "./components/PublicRoute";


const App = () => {
    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Routes>
                        <Route path="/" element={<PrivateRoute />} >
                            <Route index element={<Home />} />
                            <Route path="create" element={<Create />} />
                            <Route path="edit/:id" element={<Edit />} />
                            <Route path="view/:id" element={<View />} />
                        </Route>
                        <Route path="/" element={<PublicRoute />} >
                            <Route path="/login" element={<Login />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
            <ToastContainer/>
        </Router>
    );
};

export default App;


