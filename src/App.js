import './App.css';
import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageInputLink from './components/ImageInputLink/ImageInputLink';



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) =>{
    console.log(event.target.value);
  }

  render() {
  return (
    <div className="App">
      <ParticlesBg color="#eefad3" type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageInputLink onInputChange={this.onInputChange} />
      {/*<FaceRecognition />}*/}
    </div>
  );
  } 
}

export default App;
