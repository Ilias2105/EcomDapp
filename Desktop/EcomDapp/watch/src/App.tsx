import './App.css';
import React, { FunctionComponent, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/home';
import Add from './pages/add';
import Buy from './pages/buy';
import MyOrders from './pages/myOrders'
import Navigation from './components/navigation';
import AllOrders from './pages/allOrders';
import Footer from './components/footer';


const App: FunctionComponent = () => {
  
  const [account, setAccount] = useState()

  return (
    <BrowserRouter>
      < Navigation account={account} setAccount={setAccount} />
      <Routes>
        <Route>
          <Route path="/" element={<Home/>} />
          <Route path="/add" element={<Add />} />  
          <Route path="/buy/:id" element={<Buy />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/allOrders" element={<AllOrders account={account} setAccount={setAccount} />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;