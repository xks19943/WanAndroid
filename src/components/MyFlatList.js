/**
 * Created by xiaoming on 2017/7/19.
 * 和flatList的用法一样，只是修改了RefreshControl在android端的颜色
 */
import React, {Component} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView
} from 'react-native';


export default class MyFlatList extends Component {

  renderScrollComponent(props){
      if (props.onRefresh) {
        return (
          <ScrollView
            {...props}
            refreshControl={
              <RefreshControl
                refreshing={props.refreshing}
                onRefresh={props.onRefresh}
                colors={[COLOR.primaryColor]}
                progressBackgroundColor={COLOR.whiteColor}
              />
            }
          />
        );
      } else {
        return <ScrollView {...props} />;
      }
  }

  /**
    params: {
     animated?: ?boolean,
     index: number,
     viewOffset?: number,
     viewPosition?: number,
     }
  */
  scrollToOffset(params){
    this.list && this.list.scrollToOffset(params);
  }

  render() {
    return (
      <FlatList
        {...this.props}
        ref={r=>this.list = r}
        renderScrollComponent={(props)=>this.renderScrollComponent(props)}/>
    )
  }
}
