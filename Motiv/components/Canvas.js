import React, { Component } from 'react';
import { Image } from 'react-native';
import Canvas from 'react-native-canvas';

export default class CanvasImage extends Component {

  handleCanvas = async (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 100, 100); 
    
    // const image = new Image(canvas, height, width);
    // console.log(image);

    let data = await canvas.toDataURL('image/png');
    console.log(":::::::::::::::::::::::::::::::::::::::::");
    console.log(data);
    
  }

  render() {
    return (
      <Canvas ref={this.handleCanvas}/>
    )
  }
}