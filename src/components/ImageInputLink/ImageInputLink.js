import React from 'react';
import './ImageInputLink.css';

const ImageInputLink = () =>{
 return(
  <div className=''>
    <p className='f3'>
      {'This magic brain will detect faces. Give it a shot'}    
    </p>
    <div className='center'>
     <div className='form center pa4 br3 shadow-5'>
      <input className='f4 pa2 w-70 center' type='text'/>
      <button className='w-30 grow f4 ph3 pv2 dib white bg-blue'>Detect</button>
     </div>
    </div>
  </div>

 );
}

export default ImageInputLink;