import React, { FunctionComponent, useState, useEffect } from 'react';
import  Comment  from '../models/comment';

type Props = {
    comment: Comment,
  };

  

  const CommentaireCard: FunctionComponent<Props> = ({comment}) => {


    return(
            <div className='comment'>
                <p className='text-comment'>{comment.comment}</p>
                <p className='text-comment'>Adresse : {comment.author}</p>
            </div>
         
    );

} 

  export default CommentaireCard;