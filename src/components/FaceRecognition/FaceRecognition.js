import React from 'react';

const FaceRecognition = ({imageUrl}) =>{
 return(
  <div className='center ma'>
   <div className='absolute ma'>
    <img alt='' src={imageUrl} width='500' height='auto' />
   </div>
  </div>
 );
}

export default FaceRecognition;