import './watch-form.css';
import React, { FunctionComponent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import WatchModels from '../models/watch';
import Watch from '../artifacts/contracts/Watch.sol/Watch.json';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const WatchAddress : any = process.env.REACT_APP_CONTRACT_ADDRESS;

type Props = {
  watch: WatchModels;
};


  type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
}

type Form = {   
  name: Field,
  description: Field,
  price: Field,
  quantity: Field,
}

const WatchForm: FunctionComponent<Props> = ({watch}) => {
  
  const [form, setForm] = useState({
    name: { value: watch.name, isValid: true},
    description: { value: watch.description, isValid: true},
    price: { value: watch.price, isValid: true},
    quantity: { value: watch.quantity, isValid: true}
  })

  const navigate = useNavigate();
    const {id} = useParams()
    const[error, setError] = useState<String>();
    const [imageUpload, setImageUpload] = useState<any>(null);

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newField = {[fieldName]: { value: fieldValue }};
    
    setForm({...form, ...newField});
  }

  async function uploadImageToFirebase() {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    const uploadTask = await uploadBytesResumable(imageRef, imageUpload);
         await getDownloadURL(uploadTask.ref).then((url) => {
         watch.image = url;
      });
  }

  const addWatch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      if(typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum); 
          const signer = provider.getSigner();
          const contract = new ethers.Contract(WatchAddress, Watch.abi, signer);
          try{
          await uploadImageToFirebase();
          const add = await contract.addWatch(form.name.value, form.description.value, form.price.value, watch.image, form.quantity.value);
          await add.wait();
          navigate('/');
          } catch(err){
            setError('The watch could not be added')//par exemple si ce n est pas owner
          }
      }
  }

    return (
        <form className='add' onSubmit={ e => addWatch(e) }>
          {error && <p className="error">{error}</p>}
          <label htmlFor="name">Watch model : </label>
          <input type="text" id='name' name='name' 
          value={form.name.value} onChange={e => handleInputChange(e)}></input>
          <label htmlFor="price" className="form-label">Watch price : </label>
          <input type="text" className="form-control" id='price' name='price' 
          value={form.price.value} onChange={e => handleInputChange(e)}></input>
          <label htmlFor="image" className="form-label">Image : </label>
          <input type="file" className="form-control" id='image' name='image' 
          onChange={e => {setImageUpload(e.target.files![0])}}></input>
          <label htmlFor="desciption" className="form-label">Description : </label>
          <input type="text" className="form-textarea" id='description' name='description' 
          value={form.description.value} onChange={e => handleInputChange(e)}></input>
          <label htmlFor="quantity" className="form-label">Quantity : </label>
          <input type="text" className="form-control" id='quantity' name='quantity' 
          value={form.quantity.value} onChange={e => handleInputChange(e)}></input>
          <button type="submit">Submit</button>
        </form>

    );
  }
  
  export default WatchForm;