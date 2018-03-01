/**
 * Created by xiaoming on 2018/2/23.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import ToastUtil from '../../services/ToastUtil';

export default class SearchBar extends Component {
  static propTypes = {
    searchText:PropTypes.string,
    onCommit:PropTypes.func,
    onBackPress:PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      searchText:this.props.searchText ? this.props.searchText : ''
    };
  }

  onSubmitEditing(){
    let searchText = this.state.searchText.trim();
    if(!searchText){
      ToastUtil.show('请输入搜索关键字');
      return;
    }
    this.props.onCommit && this.props.onCommit(searchText);
  }

  onClose(){
    this.input && this.input.clear();
    this.setState({
      searchText:''
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.icon}
          onPress={()=>this.props.onBackPress()}>
          <Icon
            name={'arrow-back'}
            style={styles.backIcon}/>
        </TouchableOpacity>

        <TextInput
          ref={r=>this.input = r}
          onChangeText={(val)=>this.setState({searchText:val})}
          style={styles.input}
          placeholder={'搜索'}
          value={this.state.searchText}
          underlineColorAndroid={'transparent'}
          placeholderTextColor={COLOR.grayTextColor}
          onSubmitEditing={()=>this.onSubmitEditing()}/>

        {
          this.state.searchText
            ?
            <TouchableOpacity
              style={styles.icon}
              onPress={()=>this.onClose()}>
              <Icon
                name={'close'}
                style={styles.closeIcon}/>
            </TouchableOpacity>
            : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: Platform.OS === 'ios' ? 64 : 56,
    backgroundColor: COLOR.primaryColor,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:8,
  },
  backIcon:{
    fontSize:24,
    color:COLOR.whiteColor
  },
  input:{
    padding:0,
    flex:1,
    fontSize:FONTSIZE.primary,
    color:COLOR.whiteColor
  },
  closeIcon:{
    fontSize:24,
    color:COLOR.whiteColor
  }
});