import './App.css';
import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageInputLink from './components/ImageInputLink/ImageInputLink';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'Signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email:data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  detectFaceLocation = (data) =>{
    const FaceDataRegions = (data.outputs[0].data.regions[0].region_info.bounding_box);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
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
    fetch('https://facerecapi-h3rd.onrender.com/imageUrl', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: this.state.input })
        })
    .then(response => response.json())
    .then(result => {
      if (result) {
        fetch('https://facerecapi-h3rd.onrender.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: this.state.user.id })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log);

        this.displayFaceBox(this.detectFaceLocation(result));
      }
    })
    .catch(error => console.log('error', error));
}

  onRouteChange = (route)=>{
    if (route === 'signout'){
      this.setState(initialState)
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {

    const {isSignedIn, imageUrl, box, route} = this.state;

  return (
    <div className="App">
      <ParticlesBg color="#eefad3" type="cobweb" bg={true}/>

      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      { route === 'home' 
       ? <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageInputLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
         </div>
         :(
           route === 'Signin'
          ? <Signin loadUser = { this.loadUser } onRouteChange={this.onRouteChange}/>
          : <Register loadUser = { this.loadUser } onRouteChange={this.onRouteChange}/>
          )
            
      } 
    </div>
  );
  } 
}

export default App;
