/* @flow */

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  NativeModules,
  Platform,
  Animated
} from 'react-native';
import * as WeChat from 'react-native-wechat';


const ShareType = {
  /*微信朋友圈*/
  Timeline: 1,
  /*微信好友*/
  Session: 2,
}

const BottonHeight = 180;
const styles = StyleSheet.create({
  center:{
    alignItems:'center',
    justifyContent:'center',
  },
  fill:{
    flex:1,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  absolute:{
    position: 'absolute',
  },
  fillAbsolute:{
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
  content: {
    backgroundColor: '#0009'
  },
  bottom: {
    width: ScreenWidth,
    height: BottonHeight,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  topBar: {
    height: 60,
    width: ScreenWidth,
  },
  title: {
    fontSize: 16,
    color: COLOR.normalColor,
  },
  shareTitle: {
    fontSize: 13,
    color: 'gray',
    paddingTop: 10,
  },
  shareIcon: {
    width: 50,
    height: 50,
    // backgroundColor: 'lightgray',
  }
});

const ShareBtn = ({title='title',onPress,source}) => (
  <View style={[styles.fill,styles.center,styles.column]}>
    <TouchableOpacity style={[styles.fill,styles.center]} onPress={onPress}>
      <Image resizeMode='contain' style={styles.shareIcon} source={source}/>
      <Text style={styles.shareTitle}>{title}</Text>
    </TouchableOpacity>
  </View>
)

export default class ShareActionSheet extends React.Component{

  static defaultProps = {};
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      translateY: new Animated.Value(BottonHeight)
    };
  }

  componentWillMount() {}
  componentDidMount() {
    WeChat.registerApp('wx342c05ba8b66b136');
  }
  componentWillUnmount(){

  }

  /*显示*/
  async show(shareData) {
    try {
      this.setState({visible:true,shareData:shareData});
      Animated.spring(this.state.translateY,{
        toValue: 0,
        duration: 250,
        delay: 150,
      }).start();
    } catch(e) {}
  }

  /*隐藏*/
  dismiss() {
    this.setState({
      visible:false,
      translateY: new Animated.Value(BottonHeight)
    });
  }

  async share(shareType) {
    let {shareData} =  this.state;
    let data = {
      ...shareData
    };
    console.log(data);

    try {
      if (shareType==ShareType.Session) {
        if (await WeChat.isWXAppInstalled()) {
          await WeChat.shareToSession(data);
        } else {

        }
      } else if (shareType==ShareType.Timeline) {
        if (await WeChat.isWXAppInstalled()) {
          await WeChat.shareToTimeline(data);
        } else {

        }
      }
      this.dismiss();
    } catch (error) {
      this.dismiss();
    }

  }

  render() {
    let {visible} = this.state;
    return(
      <Modal visible={visible} transparent={true} animationType="none"
        onRequestClose={()=>{
          this.setState({
            visible:false
          })
        }}>
        <View style={{flex:1,justifyContent:'flex-end'}}>
          <View style={[styles.content,styles.fillAbsolute]}>
            <TouchableOpacity style={styles.fill} onPress={()=>{this.dismiss()}}/>
          </View>
          <Animated.View style={[styles.bottom,{transform:[{translateY: this.state.translateY}]}]}>
            <View style={[styles.topBar,styles.center]}>
              <Text style={styles.title}>分享</Text>
            </View>
            <View style={[styles.fill,styles.row]}>
              <ShareBtn title="微信朋友圈"
                source={require('../../resources/icon/share_friend.png')}
                onPress={()=>{this.share(ShareType.Timeline)}}/>
              <ShareBtn title="微信好友"
                source={require('../../resources/icon/share_wx.png')}
                onPress={()=>{this.share(ShareType.Session)}}/>
            </View>
          </Animated.View>
        </View>
      </Modal>
    )
  }
}
