import React, { FunctionComponent, useEffect } from 'react';
import { ethers } from 'ethers';

type Props = {
    account : any,
    setAccount : any
  };

const Navigation: FunctionComponent<Props> = ({ account, setAccount }) => {

   const connectHandler = async () => {//permet de recuperer le compte connecté
        const accounts = await window.ethereum?.request!({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

    useEffect(() => {
      connectHandler();
  }, []);

    

return (
    <nav className="navbar">
        <a href="/"><img className="logo" src='/logo.png' /></a>
          <div>
              {account === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" && 
                <a href="/add" className="nav-item">Ajouter</a>
              }
              {account !== "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" &&
                <a href="/myOrders" className="nav-item">Mes commandes</a>
              }
              {account === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" &&
                <a href="/allOrders" className="nav-item">Commandes clients</a>
              }
              {account ? ( //si il y a un compte co
                <button
                    type="button"
                    className='nav-connect'
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : ( //sinon btn de connexion
                <button
                    type="button"
                    className='nav-connect'
                    onClick={connectHandler}
                >
                    Connexion
                </button>
            )}
          </div>
      </nav>
)
}

export default Navigation;