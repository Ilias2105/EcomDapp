import React, { FunctionComponent, useState, useEffect, } from 'react';
import { ethers } from 'ethers';
import Watch from '../artifacts/contracts/Watch.sol/Watch.json';
import WatchModels from '../models/watch';
import WatchCard from '../components/watch-card';
import { useNavigate } from 'react-router';


const WatchAddress : any = process.env.REACT_APP_CONTRACT_ADDRESS;

const Home: FunctionComponent = () => {

    const [watches, setWatches] = useState<WatchModels[]>([]);
    //const [watch, setWatch] = useState<WatchModels>();
    const[account, setAccount] = useState<String>();
    const [error, setError] = useState<String>();
    const navigate = useNavigate();

    useEffect(() => {
        getWatches();
        connectHandler();
    }, []);

    const connectHandler = async () => {//permet de recuperer le compte connecté
      if(typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request!({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
      }
  }

    async function getWatches() {
        if(typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(WatchAddress, Watch.abi, provider);
            try {
              const data = await contract.getWatches();
              setWatches([]); //pour pas de doublon
              for(let i = 0; i < data.length; i++){ 
                const watch = new WatchModels
                (
                  Number(data[i][0]), 
                  String(data[i][1]), 
                  String(data[i][2]), 
                  Number(data[i][3]), 
                  String(data[i][4]), 
                  Number(data[i][5])
                );
                setWatches(watches => [...watches, watch]);
              }
            }
            catch(err) {
              setError('Une erreur est survenue.');
              console.log(err)
            }
        }
      }


    return (
      <div className="App">
        <img className="banimg" src='/banniere.jpg'/>
        <div className='search'>
          <h2>Trouvez la montre de vos rêves</h2>
          <input type="search" className="search-bar" placeholder="Recherche..."/>
          <button className="search-button">&#128269;</button>
        </div>
        <div className="watch">
          {error && <p className="error">{error}</p>}
          {watches.map(watch => (
            < WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      </div>
    );
  }
  
  export default Home;
  