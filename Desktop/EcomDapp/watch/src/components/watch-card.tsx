import './watch-card.css';
import React, { FunctionComponent, useState, useEffect } from 'react';
import  WatchModels  from '../models/watch';
import { useNavigate } from 'react-router';

type Props = {
  watch : WatchModels,
};

const WatchCard: FunctionComponent<Props> = ({watch}) => {

  const navigate = useNavigate();

    const goToWatch = (id : number)=>{
      navigate(`/buy/${id}`)
    }

    
    
    return (
                <div className='product' onClick={() => goToWatch(watch.id)}>
                  <img src={`${watch.image}`} className="product-image" />
                  <span className='product-name'>{watch.name}</span><br/>
                  <span className='product-price'>{watch.price} ETH</span>
                </div>
    );
  }
  
  export default WatchCard;