/**
 * Created by xiaoming on 2018/2/7.
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
import LearningListItem from './LearningListItem';

export default class Learning extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing:false,
      isLoading:true,
      isEmpty:false,
      isError:false,
      dataList:[],
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.onRefresh(true);
  }

  goToDetail(name,childrenList){
    this.props.navigation.navigate('LearningTabView',
      {
        name:name,
        childrenList:childrenList
      });
  }

  onRefresh(isInit){
    if(isInit){
      this.setState({
        isLoading:true
      })
    }else{
      this.setState({
        isRefreshing:true
      });
    }
    this.getLearningTree();
  }

  async getLearningTree(){
    try {
      let rst = await BaseModel.getLearningTree();
      let dataList = rst.data;
      this.setState({
        isRefreshing: false,
        isLoading: false,
        isEmpty: !dataList || dataList.length === 0,
        dataList: dataList ? dataList : []
      });
    }catch (e){
      this.setState({
        isRefreshing:false,
        isEmpty:false,
        isLoading:false,
        isError:true
      })
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
        keyExtractor={(item,index)=>index}
        ItemSeparatorComponent={()=>
          <SeparatorItem height={8}/>
        }
        data={this.state.dataList}
        renderItem={({item,index})=>
          <LearningListItem
            item={item}
            index={index}
            onPress={()=>this.goToDetail(item.name,item.children)}
          />
        }/>
    )
  }
}

