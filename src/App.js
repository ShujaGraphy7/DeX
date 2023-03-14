import './styles.css';
import { Route, Routes } from "react-router-dom";
import Pool from "./Components/Pool/Pool";
import Swap from "./Components/Swap/Swap";

import React from 'react';
export const ContractContext = React.createContext();

function App() {
  return (

        <Routes>
          
          <Route path="/" element={<Swap/>}/>
          <Route path="/Swap" element={<Swap/>}/>
          <Route path="/Pool" element={<Pool/>}/>
         
        </Routes>
  );
}

export default App;
