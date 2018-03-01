/**
 * Created by xiaoming on 2018/2/7.
 */
import React, {Component} from 'react';
import {
  DeviceEventEmitter
} from 'react-native';
import Banner from './Banner';
import BaseModel from '../../models/BaseModel';
import MyFlatList from '../../components/MyFlatList';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';
import EmptyView from '../../components/EmptyView';
import SeparatorItem from '../../components/SeparatorItem';
import HomeListItem from './HomeListItem';
import Footer from '../../components/Footer';
import cookie from '../../services/cookie';
import ToastUtil from '../../services/ToastUtil';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing:false,
      isLoading:false,
      isEmpty:false,
      isError:false,
      isLoadingMore:false,
      hasMore:false,
      dataList:[],
      bannerList:[],
      pageSize:0,
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
   this.onRefresh(true);
   DeviceEventEmitter.addListener('onRefreshHome',this.onRefreshList);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('onRefreshHome',this.onRefreshList);
  }

  onRefreshList =()=>{
    this.myFlatList && this.myFlatList.scrollToOffset({animated:false, offset:0});
    this.onRefresh();
  };

  async onRefresh(isInit){
    try {
      if(isInit){
        this.setState({
          isLoading:true
        });
      }else{
        this.setState({
          isRefreshing:true
        });
      }
      let path = {
        pageSize:0
      };
      let rst = await BaseModel.getFeedList(path);
      let res = await BaseModel.getBanner();
      let { datas,over} = rst.data;
      console.log(res.data);
      this.setState({
        isRefreshing: false,
        isLoading: false,
        isEmpty: !datas || datas.length === 0,
        dataList: datas ? datas : [],
        hasMore: !over,
        bannerList:res.data,
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
        let rst = await BaseModel.getFeedList(path);
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

    if(this.state.isLoading){
      return <LoadingView/>
    }

    if(this.state.isEmpty){
      return <EmptyView onClick={()=>this.onRefresh(true)}/>
    }

    if(this.state.isError){
      return <ErrorView onClick={()=>this.onRefresh(true)}/>
    }

    return (
      <MyFlatList
        ref={list=>this.myFlatList= list}
        style={STYLE.BACKGROUND}
        refreshing={this.state.isRefreshing}
        onRefresh={()=>this.onRefresh()}
        onEndReached={()=>this.onLoadMore()}
        onEndReachedThreshold={0.1}
        keyExtractor={(item,index)=>index}
        ItemSeparatorComponent={()=>
          <SeparatorItem height={8}/>
        }
        ListHeaderComponent={()=>
          <Banner
            onPress={(banner)=>this.goToDetail(banner.title,banner.url)}
            bannerList={this.state.bannerList}/>
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
          <HomeListItem
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
