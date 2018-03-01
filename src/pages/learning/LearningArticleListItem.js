/**
 * Created by xiaoming on 2018/2/7.
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
const LearningArticleListItem = ({item,index,onItemPress,onCollect})=>{
  let {author,niceDate,title,zan} = item;
  return(
    <TouchableOpacity onPress={onItemPress}>
      <View style={styles.item}>
        <View style={styles.titleItem}>
          <View style={styles.descItem}>
            <Image
              style={styles.img}
              source={require('../../resources/icon/ic_launcher.png')}/>
            <Text style={styles.normalText}>
              {author}
            </Text>
          </View>
          <Text style={styles.grayText}>{niceDate}</Text>
        </View>
        <Text style={styles.title}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={onCollect}
          style={styles.iconBtn}>
          <Icon
            style={[styles.icon,zan && {color:COLOR.primaryColor}]}
            name={'star'}/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

LearningArticleListItem.propTypes = {
  onItemPress:PropTypes.func,
  onCollect:PropTypes.func,
  index:PropTypes.number,
  item:PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
  title:{
    fontSize:FONTSIZE.primary,
    color:COLOR.primaryTextColor,
    marginVertical:8
  },
  normalText:{
    fontSize:FONTSIZE.normal,
    color:COLOR.normalTextColor,
    marginRight:8
  },
  item:{
    elevation:1,
    paddingHorizontal:16,
    paddingVertical:10,
    backgroundColor:COLOR.whiteColor
  },
  grid:{
    flexDirection:'row',
    flexWrap:'wrap',
  },
  titleItem:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  grayText:{
    fontSize:FONTSIZE.normal,
    color:COLOR.grayTextColor,
  },
  img:{
    width:32,
    height:32,
    marginRight:8
  },
  descItem:{
    flexDirection:'row',
    alignItems:'center'
  },
  icon:{
    fontSize:24,
    color:COLOR.grayColor
  },
  iconBtn:{
    alignSelf:'flex-end'
  }
});


export default LearningArticleListItem;