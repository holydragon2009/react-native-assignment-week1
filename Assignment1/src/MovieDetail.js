import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";

import moment from "moment";
import FadeImage from "./FadeImage";

export default class MovieDetail extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: this.props.movie,
      height: 200,
      line: 1,
      marginScroll: 500,
      onTouchBackAction: this.props.onTouchBackAction
    };
  }

  clickToOpen() {
    var height = this.state.height;
    var line = this.state.line;
    var marginScroll = this.state.marginScroll;
    if (height == 200) {
      height = 50;
      line = 1;
      marginScroll = 100;
    } else {
      height = 200;
      line = 4;
      marginScroll = 500;
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({
      height,
      line: this.state.line == 0 ? 1 : 0,
      marginScroll
    });
  }

  _onTouchBack = () => {
    if (this.state.onTouchBackAction) {
      this.state.onTouchBackAction();
    } else {
      this.props.navigator && this.props.navigator.pop();
    }
  };

  render() {
    return (
      <View>
        <FadeImage
          style={{ width: "100%", height: "100%" }}
          smallImage={
            "https://image.tmdb.org/t/p/w45/" +
            this.state.selectedMovie.poster_path
          }
          largeImage={
            "https://image.tmdb.org/t/p/original" +
            this.state.selectedMovie.poster_path
          }
        />

        <ScrollView
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#03030266"
          }}
        >
          <TouchableOpacity onPress={() => this.clickToOpen()}>
            <View style={{ marginLeft: 8, marginRight: 8 }}>
              <Text style={styles.title}>{this.state.selectedMovie.title}</Text>

              <View style={{ flex: 1, flexDirection: "row" }}>
                <Image
                  source={require("./icon/public.png")}
                  style={{ width: 15, height: 15 }}
                />
                <Text style={{ paddingLeft: 3, color: "white" }}>
                  {moment(this.state.selectedMovie.release_date).format(
                    "MMMM Do YYYY"
                  )}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ width: 50, flex: 1, flexDirection: "row" }}>
                  <Image
                    source={require("./icon/heart.png")}
                    style={{ width: 15, height: 15 }}
                  />
                  <Text style={{ color: "white" }}>
                    {" "}{this.state.selectedMovie.popularity.toFixed(0)}
                    {" "}
                  </Text>
                </View>
                <View
                  style={{
                    width: 50,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={require("./icon/vote.png")}
                    style={{ width: 15, height: 15 }}
                  />
                  <Text style={{ color: "white" }}>
                    {" "}{this.state.selectedMovie.vote_average}
                    {" "}
                  </Text>
                </View>

              </View>
              <Text
                style={{ textAlign: "justify", color: "grey" }}
                numberOfLines={this.state.line}
              >
                {this.state.selectedMovie.overview}
                {" "}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 64,
            backgroundColor: "#459288AA"
          }}
        >
          <TouchableHighlight onPress={this._onTouchBack}>
            <View
              style={{
                marginTop: 20,
                height: 44,
                flex: 0,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <Image
                source={require("./icon/arrow_left.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text style={{ paddingLeft: 2, width: 60, fontSize: 20 }}>
                Back
              </Text>
            </View>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white"
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    margin: 2,
    borderColor: "#2a4944",
    borderWidth: 1,
    backgroundColor: "#d2f7f1"
  }
});
