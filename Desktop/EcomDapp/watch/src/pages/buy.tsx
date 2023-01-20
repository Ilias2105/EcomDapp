import React, {FunctionComponent, useState, useEffect } from "react";
import  WatchModels  from '../models/watch'
import CommentModels from "../models/comment";
import CommentCard from "../components/comment-card";
import { ethers } from 'ethers';
import Watch from '../artifacts/contracts/Watch.sol/Watch.json';
import { useNavigate, useParams } from 'react-router';


const WatchAddress : any = process.env.REACT_APP_CONTRACT_ADDRESS

type Field = {
  value?: any,
  error?: string,
  isValid?: boolean
}

type Form = {   
  comment: Field,
}

const Buy: FunctionComponent = () => {

  const [commAdd] = useState<CommentModels>(new CommentModels());
  const [form, setForm] = useState<Form>({
    comment: { value: commAdd.comment}
  })

  const [watch, setWatch] = useState<WatchModels | null>(null);
  const [comments, setComments] = useState<CommentModels[]>([]);
  
  const [error, setError] = useState<String>();
  const [quantity, setQuantity] = useState<Number>();
  const {id} = useParams();
  const navigate = useNavigate();
  let button;
  let select;
  let input;
  let notAvailable;
 
  useEffect(() => {
    getWatch();
      }
  ,[comments]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: any = e.target.value;
    const newField: Field = {[fieldName]: { value: fieldValue }};
    
    setForm({...form, ...newField});
  }

  async function getWatch() {
    if(typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(WatchAddress, Watch.abi, provider);
        try {
          const data = await contract.getWatch(id);
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
          const dataComm = await contract.getComments(id);
          setComments([]);
          for(let i = 0; i < dataComm.length; i++){ 
            const comment = new CommentModels
            (
              Number(dataComm[i][0]), 
              String(dataComm[i][1]), 
              String(dataComm[i][2]), 
              Number(dataComm[i][3])
            );
            setComments(comments => [...comments, comment]);
          }
        }
        catch(err) {
          setError("The watch cannot be displayed")
        }
    }
  }

  async function buy(price : number) {
    if(!watch!.price) {
      return;
    }
    setError('');
    if(typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request!({method:'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum); 
      const signer = provider.getSigner();
      const contract = new ethers.Contract(WatchAddress, Watch.abi, signer);
      try {
        const totalPrice = price * Number(quantity);
        let overrides = {
          from: accounts[0],
          value: (ethers.utils.parseEther(String(totalPrice)))
        }
        const buy = await contract.buy(watch!.id, quantity, WatchAddress,overrides);
        await buy.wait();
        navigate('/myOrders');
      }
      catch(err) {
       setError("L'achat n'a pas pu etre réalisé.")
      }
    }
}

const addComm = async (e: React.FormEvent<HTMLFormElement>) => {
  setError('');
  e.preventDefault();
  setForm({
    comment: {
        value: ''
    }
  });
  if(typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request!({method:'eth_requestAccounts'});
    const provider = new ethers.providers.Web3Provider(window.ethereum); //le fournisseur qui va donner acces au fct
    const signer = provider.getSigner(); //signer la transaction
    const contract = new ethers.Contract(WatchAddress, Watch.abi, signer);
    try {
      let overrides = {
        from: accounts[0],
      }
      const comm = await contract.addComment(id, form.comment.value, overrides);
      await comm.wait(); 
    }
    catch(err) {
     setError("Le commentaire n'a pas pu être ajouté.")
    }
  }
}



    if(watch?.quantity == 0){
        notAvailable = <p>This watch is not available.</p>;
      }
      else{
          let i : number = 1;
          const numbers = []
          for(i; i <= watch?.quantity!; i++){
             numbers.push(i);
           }    
          select = <select className="form-select" name='quantity' onChange={e => {setQuantity(Number(e.target.value))}}>
              <option>...</option>
              {numbers.map(number => ( 
                    <option value={number}>{number}</option>
              ))}         
            </select>
          button = <button className="btnBuy" onClick={() => buy(watch!.price)}>Buy Now</button>;
      }

    return (
      <div className="App">
        {error && <p className="error">{error}</p>}
        { watch ? (
          <div>
            <div className="Buy">
                {notAvailable}
                <img src={`${watch.image}`} className="imgBuy" />
                <div className="elementBuy">
                    <h2>{watch.name}</h2>
                    <p> {watch.description}</p>
                    <p>Price : {watch.price} <img className="logo-eth" src='/logoeth.png'/> </p>
                    <p>Quantity : {watch.quantity}</p>
                    {input}
                    {select}
                    {button}
                </div>
            </div>
            <img className="ban-buy" src='/ban-buy.png'/>
            <div className='comments'> <h3>Comments</h3>
                          {comments.map(comment => ( 
                              <CommentCard key={comment.id} comment={comment} />
                            ))}
                          <form className="form-comment" onSubmit={ e => addComm(e) }>
                                <label htmlFor="comment" className="form-label"><h4>Add comment</h4></label>
                                <textarea className="add-comment" id='comment' name='comment' value={form.comment.value} onChange={e => handleInputChange(e)}></textarea>
                                <button type="submit">Submit</button>
                          </form>
              </div>
              </div>
              
          ) : ( <div></div> ) }
      </div>
    );
  }
  
  export default Buy;