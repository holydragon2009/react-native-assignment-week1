import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  RefreshControl,
  Dimensions,
  Modal
} from "react-native";

import Image from "react-native-image-progress";
import Progress from "react-native-progress/Pie";

import MovieDetail from "./MovieDetail";

const { height, width } = Dimensions.get("window");

export default class GridViewItem extends Component {
    
  constructor(props) {
    super(props);

    console.log("GridViewItem = " + this.props.rowData);

    this.state = {
      rowData: this.props.rowData,
      modalVisible: false
    };
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  };
  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  _onSelectMovie = () => {
    this.openModal();
  };

  render() {
    return (
      <View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  defaultText: {
    color: "white"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "silver"
  }
});
