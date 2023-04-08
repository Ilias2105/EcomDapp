import React, { FunctionComponent} from 'react';

const Footer: FunctionComponent = () => {


  return(
    <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-col">
                    <h3>Contact</h3>
                    <p className='p-footer'>Email: info@decentralizedwatches.com</p>
                    <p className='p-footer'>Telephone: 555-555-5555</p>
                    <p className='p-footer'>Adresse: 123 Main St, Anytown USA</p>
                </div>
                <div className="footer-col">
                    <h3>A propos</h3>
                    <p className='p-footer'>Vente de montres de qualité.</p>
                </div>
                <div className="footer-col">
                    <h3>Nos réductions</h3>
                    <p className='p-footer'>Soyez au courants de nos nouvelles réductions rapidement.</p>
                    <form>
                        <input type="email" placeholder="Entez votre email"/>
                    </form>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright &copy; 2023 Decentralized Watches</p>
            </div>
    </footer>
  )



}

export default Footer;