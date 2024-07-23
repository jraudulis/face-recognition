import './App.css';
import React, { Component } from 'react';
import Clarifai from 'clarifai';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageInputLink from './components/ImageInputLink/ImageInputLink';

/*const returnClarifaiRequestOptions = (imageUrl) =>{

  const PAT = '1376e912774845f093ca0507ae3d202c';
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
// return requestOptions;
}



// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => {

        const regions = result.outputs[0].data.regions;

        regions.forEach(region => {
            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);

            region.data.concepts.forEach(concept => {
                // Accessing and rounding the concept value
                const name = concept.name;
                const value = concept.value.toFixed(4);

                console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                
            });
        });

    })
    .catch(error => console.log('error', error));
*/

const app = new.Clarifai.App({
  apikey: '1376e912774845f093ca0507ae3d202c'
});

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

  onButtonSubmit = () =>{
    console.log('click');
  }




  render() {
  return (
    <div className="App">
      <ParticlesBg color="#eefad3" type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageInputLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
      {/*<FaceRecognition />}*/}
    </div>
  );
  } 
}

export default App;
