/**
 * Created by xiaoming on 2017/7/19.
 * 和SectionList的用法一样，只是修改了刷新框在android端的颜色
 */
import React, {Component} from 'react';
import {
  SectionList,
  RefreshControl,
  ScrollView
} from 'react-native';

export default class MySectionList extends Component {

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

  render() {
    return (
      <SectionList
        {...this.props}
        renderScrollComponent={(props)=>this.renderScrollComponent(props)}/>
    )
  }
}
