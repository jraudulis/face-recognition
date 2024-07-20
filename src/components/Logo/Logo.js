import React from 'react';
import Tilt from 'react-parallax-tilt';
import aibrain from './aibrain.png';

const Logo = () =>{
 return(
  <div className='ma4 mt0'>
    <Tilt style={{ height: '100px', width: '100px', backgroundColor: '' }}>
     <div>
      <img src={aibrain} alt='logo'/>
     </div>
    </Tilt>
  </div>
 );
}

export default Logo;