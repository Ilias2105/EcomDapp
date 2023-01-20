import React, {FunctionComponent, useState } from "react";
import WatchForm from "../components/watch-form";
import  WatchModels  from '../models/watch';

const Add: FunctionComponent = () => {

  const [watch] = useState<WatchModels>(new WatchModels());


    return (
        <div>
            <h1>Add watch <img className="logo-watch" src='/logowatch.png'/></h1> 
            <WatchForm watch={watch}></WatchForm> 
        </div>
    );
  }
  
  export default Add;