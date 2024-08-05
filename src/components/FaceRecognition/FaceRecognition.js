import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) =>{
 return(
  <div className='center ma'>
   <div className='absolute ma'>
    <img id='inputImage' alt='' src={imageUrl} width='500' height='auto' />
    <div className='bonding-box' style= {{top: box.topRow, bottom: box.bottomRow, left: box.leftColumn, right: box.rightColumn}}></div>
   </div>
  </div>
 );
}

export default FaceRecognition;