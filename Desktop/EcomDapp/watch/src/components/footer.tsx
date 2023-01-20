import React, { FunctionComponent} from 'react';

const Footer: FunctionComponent = () => {


  return(
    <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-col">
                    <h3>Contact Us</h3>
                    <p className='p-footer'>Email: info@decentralizedwatches.com</p>
                    <p className='p-footer'>Phone: 555-555-5555</p>
                    <p className='p-footer'>Address: 123 Main St, Anytown USA</p>
                </div>
                <div className="footer-col">
                    <h3>About Us</h3>
                    <p className='p-footer'>Learn more about our company and mission.</p>
                </div>
                <div className="footer-col">
                    <h3>Newsletter</h3>
                    <p className='p-footer'>Sign up for our newsletter to stay updated on new releases and sales.</p>
                    <form>
                        <input type="email" placeholder="Enter email"/>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright &copy; 2022 Decentralized Watches</p>
            </div>
    </footer>
  )



}

export default Footer;