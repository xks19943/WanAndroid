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
  StyleSheet,
  Platform
} from 'react-native';

export default class MainNavigatinBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>

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
    justifyContent: 'center',
    position:'relative',
  },
  left: {
    bottom: 0,
    left: 0,
    position:'absolute',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  right: {
    bottom: 0,
    right: 0,
    position:'absolute',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  title: {
  },
  text: {
    fontSize:FONTSIZE.large,
    color:COLOR.whiteColor,
  },
  shadow: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  }
});