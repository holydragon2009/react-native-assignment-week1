import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  // Image,
  Dimensions,
  Alert,
  RefreshControl,
  TouchableHighlight,
  Button
} from 'react-native';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import Icon from 'react-native-vector-icons/FontAwesome';
// import SearchBar from 'react-native-search-bar'
import Search from 'react-native-search-box';

import Styles from './Style';
import moment from 'moment';
import GridView from 'react-native-grid-view'
import GridViewItem from "./GridViewItem";

const MOVIES_PER_ROW = 2;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const { screenWidth, screenHeight } = Dimensions.get('window');

export default class MyListView extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        dataSource: ds.cloneWithRows([]),
        refreshing: false,
        selectedMovie: null,
        page: 0,
        totalData: null,
        text: '',
      };
    }

    componentWillMount() {
      this.fetchData();
    }

    loadMore(page){
      return fetch(this.props.url + '&page=' + page)
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log('debug load more = ' + JSON.stringify(responseJson));
          var newData = this.state.totalData.concat(responseJson.results)
          this.setState({
            dataSource: ds.cloneWithRows(newData),
            screenWidth: screenWidth,
            page: responseJson.page,
            totalData: newData
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    fetchData() {
      return fetch(this.props.url)
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log('debug = ' + JSON.stringify(responseJson));
          this.setState({
            dataSource: ds.cloneWithRows(responseJson.results),
            screenWidth: screenWidth,
            page: responseJson.page,
            totalData: responseJson.results
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    onRefresh() {
      this.setState({refreshing: true});
      this.fetchData().then(() => {
        this.setState({refreshing: false});
      });
    }

    renderItem(item, screenWidth, navigator){
      return (
        <Movie movie={item} dimen={screenWidth} navigator={navigator} />
      );
    }

    renderGridItem(item) {
      return <GridViewItem rowData={item} />;
    }

    onEndReached = () => {
        // alert("onEndReached !!!");
        this.loadMore();
    }

    onChangeText = (text) => {
      return new Promise((resolve, reject) => {
          console.log('onChangeText text = ' + text);
          this.onFilter(text);
          resolve();
      });
    }

    onFilter(text){
      let filteredData = []
      for (var i = 0; i < this.state.totalData.length; i++) {
        if(this.isMatching(this.state.totalData[i], text)){
          filteredData.push(this.state.totalData[i]);
        }
      }
      // console.log('filter data = ' + JSON.stringify(filteredData))
      this.setState({
        dataSource: ds.cloneWithRows(filteredData),
      });
    }

    isMatching(item, text){
      var searchText = text.toLowerCase();
      var title = item.title.toLowerCase();
      var desc = item.overview.toLowerCase();
      // console.log('title.match(searchText) = ' + JSON.stringify(title.match(searchText)))
      if(title.match(searchText) || desc.match(searchText)){
        return true
      }
      return false
    }

    onButtonPress = () => {
      this.props.navigator && this.props.navigator.push({id:'MovieGrid', passProps: {
        // movie: movie
      }})
    }

    render() {
      var screenWidth = this.state.screenWidth;
      return (
        <View style={{flex:1, flexDirection: 'column', marginTop:20, backgroundColor: '#009588', justifyContent:'space-around'}}>
          <Search
            ref="search_box"
            onChangeText={this.onChangeText}
          />
          <Icon name="bars" size={30} color="black" onPress={this.onButtonPress} style={{margin:5}} />
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderItem(rowData, screenWidth, this.props.navigator)}
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

  class Movie extends Component {
    constructor(props){
      super(props)
      // console.log('log photo: ' + this.props.movie.photos[0].caption)
      this.state = ({
        dimen: Dimensions.get('window'),
      });
    }

    _onSelectMovie(movie){
      this.setState({selectedMovie: movie});
      this.props.navigator && this.props.navigator.push({id:'MovieDetail', passProps: {
        movie: movie
      }})
    }

    render (){
      var size = (this.state.dimen.width)/3 * 900 / 600;
      var title = this.props.movie.title
      // var tags = ''
      // for(let s of this.props.movie.tags){
      //   tags += "#" + s + " "
      // }
      // var time = moment.unix(this.props.movie.timestamp).fromNow();
      // var imageUrl = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + this.props.movie.poster_path
      var imageUrl = "https://image.tmdb.org/t/p/w150/" + this.props.movie.poster_path
      return (
        <TouchableHighlight 
          onPress={()=>this._onSelectMovie(this.props.movie)}>
          <View style={{flex:1, flexDirection:'row', borderBottomColor: 'black',
                        borderBottomWidth: 1, padding: 10, backgroundColor: '#009588'}}>
            <Image source={{uri: imageUrl}} indicator={ProgressBar} 
                style={{width: (this.state.dimen.width/3), height: size, flex: 3}} />
            <View style={{flex: 7}}>
              <Text style={{padding: 10, fontSize: 15, fontWeight: 'bold'}}>{this.props.movie.title}</Text>     
              <Text style={{padding: 10}} numberOfLines={5} >{this.props.movie.overview}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
  }