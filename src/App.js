
import './App.css';
import React, { Component } from 'react';
import Clarifai from 'clarifai';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageInputLink from './components/ImageInputLink/ImageInputLink';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

  const returnClarifaiRequestOptions = (imageUrl) =>{

  const PAT = '1376e912774845f093ca0507ae3d202c';
  const USER_ID = 'jr291092';
  const APP_ID = 'main';
  const MODEL_ID = 'color-recognition';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": imageUrl
                    // "base64": IMAGE_BYTES_STRING
                }
            }
        }
    ]
});

const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
};
 return requestOptions;
}



// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id


/*const clarifaiApp = new Clarifai.App({
  apiKey: 'eeed0b6733a644cea07cf4c60f87ebb7'
});*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
    console.log(event.target.value);
  }

  onButtonSubmit = () =>{
   this.setState({imageUrl: this.state.input});
    fetch("https://api.clarifai.com/v2/models/"+ 'color-recognition' + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


    /*this.setState({imageUrl: this.state.input});
    clarifaiApp.models.predict(Clarifai.COLOR_MODEL, this.state.input)
    .then(response =>{
      console.log(response);
    },
    function (err){
      // Possible error
    }

   );*/
  }




  render() {
  return (
    <div className="App">
      <ParticlesBg color="#eefad3" type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageInputLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );
  } 
}

export default App;
