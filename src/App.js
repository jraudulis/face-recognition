
import './App.css';
import React, { Component } from 'react';
import Clarifai from 'clarifai';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageInputLink from './components/ImageInputLink/ImageInputLink';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

/* clarifaiApp = new Clarifai.App ({
  apiKey: '36108aa38dd744aa9d67c46f6c47a3eb'
});*/

  const returnClarifaiRequestOptions = (imageUrl) =>{

  const PAT = '36108aa38dd744aa9d67c46f6c47a3eb';
  const USER_ID = 'jr291092';
  const APP_ID = 'face-recognition';
  const MODEL_ID = 'face-detection';
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
                    "url": IMAGE_URL
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


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  detectFaceLocation = (data) =>{
    const FaceDataRegions = (data.outputs[0].data.regions[0].region_info.bounding_box);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log (width, height);
      return{
        bottomRow: height - (FaceDataRegions.bottom_row * height),
        leftColumn: FaceDataRegions.left_col * width,
        rightColumn: width - (FaceDataRegions.right_col * width),
        topRow: FaceDataRegions.top_row * height
    }
  }
 
  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
   this.setState({imageUrl: this.state.input});
    fetch("https://api.clarifai.com/v2/models/"+ 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(result => this.displayFaceBox(this.detectFaceLocation(result)))
    .catch(error => console.log('error', error));


   /* this.setState({imageUrl: this.state.input});
    clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.detectFaceLocation(response))
    .catch(err => console.log(err));*/
  }




  render() {
  return (
    <div className="App">
      <ParticlesBg color="#eefad3" type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageInputLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>
  );
  } 
}

export default App;
