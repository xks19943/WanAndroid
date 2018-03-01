/**
 * Created by xiaoming on 2018/2/23.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native';
import TitleCell from './TitleCell';
import BaseModel from '../../models/BaseModel';
import ContentView from './ContentView';


export default class HotWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing:false,
      hotWordList:[],
      websiteList:[]
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.initData();
  }

  goToSearch(item){
    this.props.navigation && this.props.navigation.navigate('Search',{searchText:item.name});
  }

  goToWebsite(item){
    this.props.navigation && this.props.navigation.navigate(
      'DetailWebView',
      {
        name:item.name,
        uri:item.link
      }
    );
  }

  async initData() {
    this.setState({isRefreshing:true});
    try {
      let res = await BaseModel.getHotKey();
      let rst = await BaseModel.getCommonWebsite();
      this.setState({
        isRefreshing:false,
        hotWordList:res.data,
        websiteList:rst.data
      });
    }catch (e){
      this.setState({
        isRefreshing:false
      })
    }
  }

  render() {
    return (
      <ScrollView
        style={STYLE.BACKGROUND}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            colors={[COLOR.primaryColor]}
            progressBackgroundColor={COLOR.whiteColor}
            onRefresh={()=>this.initData()}/>
        }>
        <TitleCell title={'我的书签'}/>
        <View style={styles.space}/>
        <TitleCell title={'大家都在搜'}/>
        <ContentView
          onItemClick={(item)=>this.goToSearch(item)}
          list={this.state.hotWordList}/>
        <TitleCell title={'常用网站'}/>
        <ContentView
          onItemClick={(item)=>this.goToWebsite(item)}
          list={this.state.websiteList}/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  space:{
    height:10,
    backgroundColor:COLOR.bgColor
  }
});



