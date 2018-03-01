/**
 * Created by xiaoming on 2017/6/11.
 */
import React,{Component} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
} from 'react-native';


export default class BasePopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  render() {
    return (
      <Modal
        transparent={true}
        animationType={'fade'}
        {...this.props}
        visible={this.state.visible}
        onRequestClose={() => {
          if (this.state.visible) {
            this.close();
          }
        }}>

        <View style={{flex: 1, backgroundColor: '#0009'}}>
          <TouchableOpacity
            activeOpacity={1}
            style={{flex:1}}
            onPress={()=>this.close()}>
            <View style={{flex:1}}/>
          </TouchableOpacity>
            {this.props.children}
        </View>
      </Modal>
    );
  }

  open() {
    this.setState({
        visible: true
    });
  }

  close() {
    this.setState({
        visible: false
    });
  }
}
