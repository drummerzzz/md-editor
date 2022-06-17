import React from 'react';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Editor from './pages/Editor';

export const  App = () => (
  <div className='container'>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:url" element={<Editor />} />
        </Routes>
    </BrowserRouter>
  </div>
)
