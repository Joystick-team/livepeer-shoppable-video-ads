import { useState, useEffect, useRef } from 'react';
import './App.css';
import Editor from './components/editor';
import AdClient from './components/adclient';
import Home from './home';
import {Routes,Route,BrowserRouter as Router } from "react-router-dom"

function App() {
  return (
      <div 
          className="w-full h-screen px-4 bg-[#1b1e2a] font-mono"   
         >
           <Routes>
              <Route exact path="/"  element={<Home/>} />
              <Route exact path="/~editor"  element={<Editor/>} />
              <Route exact path="/~ads"  element={<AdClient/>} />
          </Routes>
      </div>
  );
}

export default App;
