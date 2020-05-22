import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/navigation/navigation";
import 'tachyons';
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imagelinkform/imagelinkform";
import Rank from "./components/rank/rank";
import Particles from "react-particles-js";
import Clarifai from 'clarifai';
import FaceRecognition from "./components/facerecognition/facerecognition";
import SignIn from "./components/sign_in/signIn";
import {HOME, REGISTER, SIGN_IN, SIGN_OUT} from "./components/constants";
import Register from "./components/register/register";

const clarifyApp = new Clarifai.App({
    apiKey: '25a758b409cb4a81a3232078fb9a3bce'
});

const particlesParams = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

class App extends Component {

    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: SIGN_IN,
            isSignedIn: false
        }
    }

    onRouteChange = (route) => {
        switch (route) {
            case SIGN_OUT:
                this.setState({isSignedIn: false});
                break;
            case HOME:
                this.setState({isSignedIn: true});
                break;
        }
        this.setState({route: route})
    };

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    };

    displayFaceBox = (box) => {
        this.setState({box: box});
        console.log('XXX', box);
    };

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    };

    onSubmit = async () => {
        this.setState({imageUrl: this.state.input});
        try {
            const result = await clarifyApp.models
                .predict(
                    Clarifai.FACE_DETECT_MODEL,
                    this.state.input
                );
            const box = this.calculateFaceLocation(result);
            this.displayFaceBox(box);
        } catch (e) {
            console.log(e);
        }
    };

    render() {
       const { isSignedIn, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesParams}/>
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
                {this.getViewForState(route, imageUrl, box)}
            </div>
        );
    }

    getViewForState(route, imageUrl, box) {
        switch (route) {
            case HOME:
                return (<div>
                    <Logo/>
                    <Rank/>
                    <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
                    <FaceRecognition
                        imageUrl={imageUrl}
                        box={box}
                    />
                </div>);
            case REGISTER:
                return (<Register onRouteChange={this.onRouteChange}/>);
            case SIGN_IN:
            case SIGN_OUT:
                return (<SignIn onRouteChange={this.onRouteChange}/>);
        }
    }
}

export default App;
