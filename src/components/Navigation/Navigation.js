import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) =>{

  if (isSignedIn){
   return(
    <nav>
     <p onClick={ ()=> onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>sign out</p>
    </nav>
    );
   
  }else{
   return(
    <nav>
     <p onClick={ ()=> onRouteChange('Signin')} className='f3 link dim black underline pa3 pointer'>sign in</p>
     <p onClick={ ()=> onRouteChange('Register')} className='f3 link dim black underline pa3 pointer'>register</p>
    </nav>
    );
   
  }
}

export default Navigation;