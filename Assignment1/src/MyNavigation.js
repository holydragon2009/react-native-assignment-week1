import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

import { Navigator } from "react-native-deprecated-custom-components";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";

import MovieDetail from "./MovieDetail";
import MyListView from "./MyListView";
import MyGridView from "./MyGridView";

export default class MyNavigation extends Component {
    
  constructor() {
    super();
    this.state = {
      movie: null
    };
  }

  render() {
    return (
      <Navigator
        initialRoute={{ id: "MovieList", title: "MovieList", index: 0 }}
        avigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                return (
                  index > 0 &&
                  <TouchableHighlight
                    onPress={() => {
                      navigator.pop();
                    }}
                  >
                    <Text style={{ color: "white" }}>{"< Back"} </Text>
                  </TouchableHighlight>
                );
              },

              RightButton: (route, navigator, index, navState) => null,
              Title: (route, navigator, index, navState) => null
            }}
            style={{ backgroundColor: "#459288" }}
          />
        }
        renderScene={(route, navigator) => {
          switch (route.id) {
            case "MovieList":
              return (
                <MyListView
                  url={this.props.url}
                  navigator={navigator}
                  {...route.passProps}
                />
              );

            case "MovieDetail":
              return (
                <MovieDetail
                  url={this.props.url}
                  navigator={navigator}
                  {...route.passProps}
                />
              );

            case "MovieGrid":
              return (
                <MyGridView
                  url={this.props.url}
                  navigator={navigator}
                  {...route.passProps}
                />
              );
          }
        }}
      />
    );
  }
}
