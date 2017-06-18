import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Image } from "react-native";

export default class FadeImage extends Component {
    
  constructor(props) {
    super(props);

    this.state = {
      smallImage: props.smallImage,
      largeImage: props.largeImage,
      isLoadedLargeImage: false
    };
  }

  _onLargeImageLoaded = () => {
    this.setState({
      isLoadedLargeImage: true
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 0,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start"
        }}
      >

        <Image
          style={{ width: "100%", height: "100%" }}
          source={{ uri: this.state.largeImage }}
          onLoad={this._onLargeImageLoaded}
        />

        {this.state.isLoadedLargeImage == false &&
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: this.state.smallImage }}
          />}
      </View>
    );
  }
}
