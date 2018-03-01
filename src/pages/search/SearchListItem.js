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
import HTMLView from 'react-native-htmlview';

const SearchListItem = ({item,index,onItemPress,onCollect})=>{
  let {author,niceDate,title,collect=true} = item;
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
        <HTMLView
          value={title}
          style={styles.title}
          addLineBreaks={false}
          stylesheet={styles}/>
        <TouchableOpacity
          onPress={onCollect}
          style={styles.iconBtn}>
          <Icon
            style={[styles.icon,collect && {color:COLOR.primaryColor}]}
            name={'star'}/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

SearchListItem.propTypes = {
  onItemPress:PropTypes.func,
  onCollect:PropTypes.func,
  index:PropTypes.number,
  item:PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
  title:{
    flexDirection:'row',
    alignItems:'center'
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
  },
  em:{
    fontSize:FONTSIZE.primary,
    color:COLOR.primaryTextColor,
    marginVertical:8
  },
});


export default SearchListItem;