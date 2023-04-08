import React, { FunctionComponent, useState, useEffect } from 'react';
import  WatchModels  from '../models/watch';
import  OrderModels  from '../models/order';
import { ethers } from 'ethers';
import Watch from '../artifacts/contracts/Watch.sol/Watch.json';

type Props = {
  order : OrderModels,
};

const WatchAddress : any = process.env.REACT_APP_CONTRACT_ADDRESS

const OrderCard: FunctionComponent<Props> = ({order}) => {
   
    const [watch, setWatch] = useState<WatchModels>();
    const [error, setError] = useState<String>();

    useEffect(() => {
        getWatch();
          }
      ,[]);

    async function getWatch() {
        if(typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(WatchAddress, Watch.abi, provider);
            try {
              const data = await contract.getWatch(order.idWatch);
              const watch = new WatchModels
                    (
                      Number(data[0]), 
                      String(data[1]), 
                      String(data[2]), 
                      Number(data[3]), 
                      String(data[4]), 
                      Number(data[5])
                    );
              setWatch(watch);
            }
            catch(err) {
              setError("The watch cannot be displayed")
            }
        }
      }
      
      
      return (
                  <div className='order'>
                    {error && <p className="error">{error}</p>}
                    <img className='img-order' src={`${watch?.image}`} alt="" height="100" />
                    <div className='item-order'>
                      <div><h4>Modèle de la montre : </h4>{watch?.name}</div>
                      <div><h4>Acheteur : </h4>{order.buyer} ETH</div>
                      <div><h4>Date : </h4>{order.date?.toDateString()}</div>
                      <div><h4>Quantité : </h4>{order.quantity}</div>
                      <div><h4>Montant : </h4>{order.amount} ETH</div>
                    </div>
                  </div>
      );
    }
    
    export default OrderCard;