import React, {FunctionComponent, useState, useEffect } from "react";
import { ethers } from 'ethers';
import Watch from '../artifacts/contracts/Watch.sol/Watch.json';
import OrderModels from '../models/order';
import OrderCard from '../components/order-card';

const WatchAddress : any = process.env.REACT_APP_CONTRACT_ADDRESS

const MyOrders: FunctionComponent = () => {

  const [orders, setOrders] = useState<OrderModels[]>([]);
  const [error, setError] = useState<String>();
  
  useEffect(() => {
    getMyorders();
}, []);
  
  async function getMyorders() {
    if(typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request!({method:'eth_requestAccounts'});
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(WatchAddress, Watch.abi, provider);
        try {
          const data = await contract.getMyOrders(accounts[0]); 
          setOrders([]); //pour pas de doublon
              for(let i = 0; i < data.length; i++){ 
                const order = new OrderModels
                (
                  Number(data[i][0]), 
                  String(data[i][1]), 
                  Number(data[i][2]), 
                  Number(data[i][3]), 
                  new Date(new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' }).format(data[i][4]*1000)), 
                  Number(data[i][5])
                );
                setOrders(orders => [...orders, order]);
              }
            }
        catch(err) {
          setError('Une erreur est survenue.');
        }
    }
  }

    return (
      <div className="App">
        <h2 className='text-center mt-5'>Mes commandes</h2>
        {error && <p className="error">{error}</p>}
                         {orders.map(order => (
                            <OrderCard key={order.id} order={order} />
                         ))}
      </div>
    );
  }
  
  export default MyOrders;