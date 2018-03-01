/**
 * Created by xiaoming on 2018/2/8.
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  WebView,
  Linking
} from 'react-native';
import NavButton from '../../components/NavButton';
import ToastUtil from '../../services/ToastUtil';
import ShareActionSheet from '../common/ShareActionSheet';



export default class DetailWebView extends Component {
  static navigationOptions =({navigation}) => {
    let {onBrowser,onShare,onCollect} = navigation.state.params;
    return{
      headerRight:(
        <View style={{flexDirection:'row'}}>
          <NavButton
            data={{
              type:'icon',
              name:'open-in-browser',
              onPress:()=>{
                onBrowser();
              }
            }}/>
          <NavButton
            data={{
              type:'icon',
              name:'star',
              onPress:()=>{
                onCollect();
              }
            }}/>
          <NavButton
            data={{
              type:'icon',
              name:'share',
              onPress:()=>{
                onShare();
              }
            }}/>
        </View>
      )
    }
  };

  constructor(props){
    super(props);
    this.state = {
      height:0
    };
  }

  componentDidMount(){
    this.props.navigation && this.props.navigation.setParams({
      onBrowser:()=>this.onBrowser(),
      onShare:()=>this.onShare(),
      onCollect:()=>this.onCollect()
    })
  }

  onBrowser(){
    let { uri } = this.props.navigation.state.params;
    Linking.canOpenURL(uri).then(supported => {
      if (!supported) {
        ToastUtil.show('系统不存在浏览器，请安装！');
      } else {
        return Linking.openURL(uri);
      }
    }).catch(e => {
      console.error(e);
      ToastUtil.show('打开系统浏览器失败');
    });
  }


  onShare(){
    this.shareActionSheet.show(
      {
        type: 'imageUrl',
        title: 'web image',
        description: 'share web image to time line',
        mediaTagName: 'email signature',
        imageUrl: 'http://www.ncloud.hk/email-signature-262x100.png'
      }
    );
  }

  onCollect(){

  }

  onMessage(event){
    console.log('调用了这个方法');
    try {
      const action = JSON.parse(event.nativeEvent.data);
      if (action.type === 'updateHeight' && action.height > 0) {
        this.setState({height: action.height})
      }
    } catch (error) {

    }
  }


  render() {
    let { uri } = this.props.navigation.state.params;
    let jsContent = `window.onload=function(){
      window.postMessage(JSON.stringify({
                type: 'updateHeight',
                height: 300,
      }));
    }`;

    return (
      <View style={{width:ScreenWidth,height:this.state.height}}>
        <WebView
          style={STYLE.BACKGROUND}
          domStorageEnabled={true}
          injectedJavaScript={jsContent}
          mediaPlaybackRequiresUserAction={true}
          javaScriptEnabled={true}
          source={{uri:uri}}
          onMessage={(event)=>this.onMessage(event)}/>
        <ShareActionSheet
          ref={r=>this.shareActionSheet = r}/>
      </View>
    )
  }
}