/**
 * Created by xiaoming on 2018/2/8.
 */
import React,{Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import Swiper from 'react-native-swiper';
import DetailWebView from '../common/DetailWebView';
import PropTypes from 'prop-types';

export default class Banner extends Component{
  static propTypes = {
    bannerList:PropTypes.array.isRequired,
    onPress:PropTypes.func
  };

  render(){
    if(this.props.bannerList && this.props.bannerList.length > 0 ){
      let BannerItem = this.props.bannerList.map((banner,index)=>{
        return(
          <TouchableOpacity
            key={index}
            onPress={()=>this.props.onPress(banner)}>
            <View>
              <Image
                style={styles.banner}
                source={{uri:banner.imagePath}}/>
              <View style={styles.titleItem}>
                <Text
                  style={styles.title}
                  numberOfLines={1}>
                  {banner.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      });
      return(
        <Swiper
          style={styles.banner}
          autoplay={true}
          showsPagination={false}>
          {BannerItem}
        </Swiper>
      )
    }else{
      return null
    }
  }
}

const styles = StyleSheet.create({
  banner:{
    width:ScreenWidth,
    height:ScreenWidth * 0.34
  },
  titleItem:{
    backgroundColor:'#0008',
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    paddingHorizontal:16,
    paddingVertical:8
  },
  title:{
    fontSize:FONTSIZE.normal,
    color:'#ffff',
  }
});