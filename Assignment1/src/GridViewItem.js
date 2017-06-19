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

    console.log("GridViewItem = " + this.props.movie);

    this.state = {
      movie: this.props.movie,
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
    var size = ((width)/2 - 10) * 900 / 600;
    return (
      <View style={{flex:1}} key={this.state.movie.id}>
        <TouchableHighlight
          onPress={() => this._onSelectMovie(this.state.movie)}
        >
          <View style={{flex:0.5, flexDirection: 'column'}}>
            <Image
              indicator={Progress.Pie}
              style={{ marginTop: 5, width: (width)/2 - 10, height: size }}
              source={{
                uri:
                  "https://image.tmdb.org/t/p/w342" +
                    this.state.movie.poster_path
              }}
            />
            <View>
              <Text style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10, fontSize: 15, fontWeight: 'bold'}} numberOfLines={1}>
                {this.state.movie.title}
              </Text>
              <Text style={{padding: 10}} numberOfLines={3}>
                {this.state.movie.overview}
              </Text>
            </View>
          </View>
        </TouchableHighlight>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <MovieDetail movie={this.state.movie} onTouchBackAction={this.closeModal} />
        </Modal>
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
