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
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import LearningTabViewList from './LearningArticleList';
import NavButton from '../../components/NavButton';
import ShareActionSheet from '../common/ShareActionSheet';

export default class LearningTabView extends Component {

  static navigationOptions =({navigation}) => {
    let {onShare} = navigation.state.params;
    return{
      headerRight:(
        <View style={{flexDirection:'row'}}>
          <NavButton
            data={{
              type:'icon',
              name:'search',
              onPress:()=>{
                navigation.navigate('Search');
              }
            }}/>
          <NavButton
            data={{
              type:'icon',
              name:'share',
              onPress:()=>{
                onShare()
              }
            }}/>
        </View>
      )
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.navigation && this.props.navigation.setParams({
      onShare:()=>{
       this.shareActionSheet.show(
         {
           type: 'imageUrl',
           title: 'web image',
           description: 'share web image to time line',
           mediaTagName: 'email signature',
           imageUrl: 'http://www.ncloud.hk/email-signature-262x100.png'
         }
       )
      }
    });
  }



  render() {
    let { childrenList} = this.props.navigation.state.params;
    let TabViewList = childrenList.map((children,index)=>{
      return (
        <LearningTabViewList
          id={children.id}
          key={index}
          tabLabel={children.name}
          navigation={this.props.navigation}/>
      )
    });
    return (
      <View style={styles.container}>
        <ScrollableTabView
          renderTabBar={() => <ScrollableTabBar />}
          style={{flex:1}}
          tabBarBackgroundColor={COLOR.primaryColor}
          tabBarActiveTextColor={COLOR.whiteColor}
          tabBarInactiveTextColor={COLOR.diverColor}
          tabBarTextStyle={{fontSize:FONTSIZE.primary}}
          tabBarUnderlineStyle={{backgroundColor:COLOR.whiteColor}}>
          {TabViewList}
        </ScrollableTabView>
        <ShareActionSheet
          ref={r=>this.shareActionSheet = r}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});