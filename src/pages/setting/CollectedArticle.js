/**
 * Created by xiaoming on 2018/2/7.
 */
import React, {Component} from 'react';
import BaseModel from '../../models/BaseModel';
import MyFlatList from '../../components/MyFlatList';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';
import EmptyView from '../../components/EmptyView';
import SeparatorItem from '../../components/SeparatorItem';
import HomeListItem from '../home/HomeListItem';
import Footer from '../../components/Footer';
import cookie from '../../services/cookie';
import ToastUtil from '../../services/ToastUtil';
import Filter from '../../services/filter';
import {
  DeviceEventEmitter
} from  'react-native';

export default class CollectedArticle extends Component {
  hasCancel = false;

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
  }

  componentWillUnmount() {
    if(this.hasCancel){
      DeviceEventEmitter.emit('onRefreshHome');
    }
  }

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
      let rst = await BaseModel.getCollectedList(path);
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
  async cancelCollect(item,index) {
    try {
      let user = await cookie.getUser();
      //取消收藏文章
      let path = {id: item.id};
      let params = {
        originId:item.originId ? item.originId : -1
      };
      let res = await BaseModel.unCollect(path,params);
      user.collectIds = user.collectIds.filter((collectId)=> collectId !== item.originId);
      let list = this.state.dataList.filter((listItem)=> listItem.originId !== item.originId);
      ToastUtil.show("取消收藏成功");
      cookie.setUser(user,true);
      this.hasCancel = true;

      /*获取取消收藏当前页面的数据*/
      /*设置取消收藏成功了*/
      let requestPath = {
        pageSize:this.state.pageSize
      };
      let rst = await BaseModel.getCollectedList(requestPath);

      let { datas,over} = rst.data;
      if(datas && datas.length > 0){
        list = Filter.concatFilterDuplicate(list,datas);
      }

      this.setState({
        isEmpty: list.length === 0,
        dataList: list,
        hasMore: !over,
      });
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
        let rst = await BaseModel.getCollectedList(path);
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
        style={STYLE.BACKGROUND}
        refreshing={this.state.isRefreshing}
        onRefresh={()=>this.onRefresh()}
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
          <HomeListItem
            item={item}
            onItemPress={()=>this.goToDetail(item.title,item.link)}
            onCollect={()=>{
              this.cancelCollect(item,index);
            }}
          />
        }/>
    )
  }

}
