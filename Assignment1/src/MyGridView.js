import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  Dimensions,
  Alert,
  RefreshControl,
  TouchableHighlight,
  Button
} from "react-native";

import GridView from "react-native-grid-view";
import Search from 'react-native-search-box';
import GridViewItem from "./GridViewItem";

const MOVIES_PER_ROW = 2;

export default class MyGridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onTouchBackAction: this.props.onTouchBackAction,
      dataSource: null,
      refreshing: false,
      selectedMovie: null,
      page: 0,
      totalData: null,
      text: "",
      loaded: false,
    };
  }

  _onTouchBack = () => {
    if (this.state.onTouchBackAction) {
      this.state.onTouchBackAction();
    } else {
      this.props.navigator && this.props.navigator.pop();
    }
  };

  componentWillMount() {
    this.fetchData();
  }

  loadMore(page) {
    return fetch(this.props.url + "&page=" + page)
      .then(response => response.json())
      .then(responseJson => {
        // console.log('debug load more = ' + JSON.stringify(responseJson));
        var newData = this.state.totalData.concat(responseJson.results);
        this.setState({
          dataSource: newData,
          page: responseJson.page,
          totalData: newData,
					loaded: true,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchData() {
    return fetch(this.props.url)
      .then(response => response.json())
      .then(responseJson => {
        // console.log('debug = ' + JSON.stringify(responseJson));
        this.setState({
          dataSource: responseJson.results,
          page: responseJson.page,
          totalData: responseJson.results,
					loaded: true,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onEndReached = () => {
      alert("onEndReached !!!");
      this.loadMore();
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  }

  // renderItem(item, screenWidth, navigator) {
  //   return <Movie movie={item} dimen={screenWidth} navigator={navigator} />;
  // }

	renderItem(item) {
			return <GridViewItem movie={item} />
	}

	renderLoadingView() {
    return (
      <View>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  render() {
		if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginTop: 20,
          backgroundColor: "#009588",
          justifyContent: "space-around",
          marginLeft:5, marginRight:5,
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
        <Search ref="search_box" onChangeText={this.onChangeText} />
        <GridView
					style={{backgroundColor: '#009588'}}
          items={this.state.dataSource}
          itemsPerRow={MOVIES_PER_ROW}
          renderItem={item => this.renderItem(item)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          onEndReached={this.onEndReached}
        />
      </View>
    );
  }
}
