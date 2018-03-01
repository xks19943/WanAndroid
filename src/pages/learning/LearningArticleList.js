/**
 * Created by xiaoming on 2018/2/8.
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

import BaseModel from '../../models/BaseModel';
import MyFlatList from '../../components/MyFlatList';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';
import EmptyView from '../../components/EmptyView';
import SeparatorItem from '../../components/SeparatorItem';
import LearningArticleListItem from './LearningArticleListItem';
import Footer from '../../components/Footer';

export default class LearningTabViewList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing:false,
      isLoading:true,
      isEmpty:false,
      isError:false,
      hasMore:true,
      isLoadingMore:false,
      pageSize:0,
      dataList:[],
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.onRefresh(true);
  }

  async onRefresh(isInit){
    try {
      if(isInit){
        this.setState({
          isLoading:true
        })
      }else{
        this.setState({
          isRefreshing:true
        });
      }
      let path = {
        pageSize:0
      };
      let param = {
        cid:this.props.id
      };
      let rst = await BaseModel.getLearningArticles(path,param);
      let { datas } = rst.data;
      this.setState({
        isRefreshing: false,
        isLoading: false,
        isEmpty: !datas || datas.length === 0,
        dataList: datas ? datas : [],
        hasMore: datas.length !== 0,
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

  goToDetail(title,link){
    this.props.navigation && this.props.navigation.navigate(
      'DetailWebView',
      {
        name:title,
        uri:link
      }
    );
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
          <LearningArticleListItem
            item={item}
            onItemPress={()=>this.goToDetail(item.title,item.link)}


            onCollect={()=>{

            }}
          />
        }/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});