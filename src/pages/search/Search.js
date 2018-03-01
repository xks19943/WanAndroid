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
  StyleSheet
} from 'react-native';
import SearchBar from './SearchBar';
import BaseModel from '../../models/BaseModel';
import MyFlatList from '../../components/MyFlatList';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';
import EmptyView from '../../components/EmptyView';
import SeparatorItem from '../../components/SeparatorItem';
import SearchListItem from './SearchListItem';
import Footer from '../../components/Footer';
import ToastUtil from '../../services/ToastUtil';
import cookie from '../../services/cookie';


export default class Search extends Component {
  searchText = '';
  static navigationOptions = {
    header:null
  };

  constructor(props) {
    super(props);
    let {searchText} = props.navigation.state.params ? props.navigation.state.params : '';
    this.searchText = searchText ? searchText : '';
    this.state = {
      isRefreshing:false,
      isLoading:false,
      isEmpty:false,
      isError:false,
      isLoadingMore:false,
      hasMore:false,
      dataList:[],
      pageSize:0,
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    if(this.searchText){
      this.onRefresh(true);
    }else{
      this.setState({
        isEmpty:true
      });
    }
  }

  onSearch(text){
    this.searchText = text;
    this.onRefresh(false)
  }

  onBackPress(){
    this.props.navigation && this.props.navigation.goBack();
  }

  async onRefresh(isInit){
    try {
      if(isInit){
        this.setState({
          isLoading:true
        });
      } else {
        this.setState({
          isRefreshing:true
        });
      }

      let path = {
        pageSize:0
      };
      let params = {
        k:this.searchText
      };
      let rst = await BaseModel.searchArticles(path,params);
      console.log(rst);
      let { datas,over} = rst.data;
      this.setState({
        isRefreshing: false,
        isLoading: false,
        isEmpty: !datas || datas.length === 0,
        dataList: datas ? datas : [],
        hasMore: !over,
        pageSize: 0
      });
    }catch (e){
      this.setState({
        isRefreshing:false,
        isEmpty:false,
        isLoading:false,
        isError:true
      });
    }
  }

  goToDetail(title,link){
    this.props.navigation && this.props.navigation.navigate(
      'DetailWebView',
      {
        name:title,
        uri:link
      }
    );
  }

  /*收藏或者取消收藏文章*/
  async onToggleCollect(item,index) {
    try {
      let user = await cookie.getUser();
      if (user) {
        let message = "";
        if (item.collect) {
          //取消收藏文章
          let path = {id: item.id};
          let res = await BaseModel.unCollectArticle(path);
          user.collectIds = user.collectIds.filter((collectId)=> collectId !== item.id);
          message = "取消收藏成功";
        } else {
          //添加收藏
          let path = {id: item.id};
          let res = await BaseModel.collectOnSiteArticle(path);
          user.collectIds.push(item.id);
          message = "收藏成功";
        }
        console.log(user);
        ToastUtil.show(message);
        cookie.setUser(user,true);

        let list = [];
        this.state.dataList.forEach((data, i) => {
          if (i === index) {
            data.collect = !data.collect;
          }
          list.push(data);
        });
        this.setState({
          dataList: list
        });
      } else {
        this.props.navigation && this.props.navigation.navigate('Login');
      }
    } catch (e){
      console.log(e);
    }
  }

  async onLoadMore(){
    if(this.state.hasMore){
      try {
        this.setState({
          isLoadingMore:true
        });

        let path = {
          pageSize:this.state.pageSize + 1
        };
        let params = {
          k:this.searchText
        };
        let rst = await BaseModel.searchArticles(path,params);
        let { datas,over} = rst.data;
        let dataList = this.state.dataList.concat(datas);
        this.setState({
          isRefreshing: false,
          isLoading: false,
          isLoadingMore:false,
          dataList: dataList ? dataList : [],
          hasMore: !over,
          pageSize: datas ? path.pageSize : this.state.pageSize
        });
      }catch (e){
        this.setState({
          isRefreshing:false,
          isEmpty:false,
          isLoading:false,
          isError:false
        });
      }
    }
  }

  render() {
    return (
      <View style={STYLE.BACKGROUND}>
        <SearchBar
          searchText={this.searchText}
          onBackPress={()=>this.onBackPress()}
          onCommit={(text)=>this.onSearch(text)}/>
        {this.renderSearchList()}
      </View>
    )
  }

  renderSearchList(){
    if(this.state.isLoading){
      return <LoadingView/>
    }

    if(this.state.isEmpty){
      return <EmptyView disabled={true}/>
    }

    if(this.state.isError){
      return <ErrorView onClick={()=>this.onRefresh(true)}/>
    }

    return (
      <MyFlatList
        ref={list=>this.myFlatList= list}
        style={STYLE.BACKGROUND}
        refreshing={this.state.isRefreshing}
        onRefresh={()=>this.onRefresh(false)}
        onEndReached={()=>this.onLoadMore()}
        onEndReachedThreshold={0.1}
        keyExtractor={(item,index)=>index}
        ItemSeparatorComponent={()=>
          <SeparatorItem height={8}/>
        }
        ListFooterComponent={()=>{
          return (
            this.state.hasMore
              ? this.state.isLoadingMore
                ? <Footer/>
                : null
              : null
          )
        }}
        data={this.state.dataList}
        renderItem={({item,index})=>
          <SearchListItem
            item={item}
            onItemPress={()=>this.goToDetail(item.title,item.link)}
            onCollect={()=>{
              this.onToggleCollect(item,index);
            }}
          />
        }/>
    )
  }
}

const styles = StyleSheet.create({

});