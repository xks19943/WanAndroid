/**
 * Created by clude on 1/11/16.
 */

import {
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';

const COLOR = {
  primaryDarkColor:'#00796B',
  primaryColor:'#009688',
  secondaryColor:'#4db6ac',
  normalColor:'#1976d2',
  grayColor:'#868686',
  primaryTextColor:'#212121',
  normalTextColor:'#535353',
  grayTextColor:'#757575',
  bgColor:'#f2f2f2',
  diverColor:'#bdbdbd',
  whiteColor:'#fff',
};

const FONTSIZE = {
  bigger:20,
  large:18,
  primary:16,
  normal:14,
  small:12,
};

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const GlobalPixelRatio = PixelRatio.get();



const STYLE = {
  BACKGROUND: {
    flex: 1,
    backgroundColor: COLOR.bgColor,
  }
};

const CONST = { COLOR, STYLE, FONTSIZE, ScreenWidth, ScreenHeight, GlobalPixelRatio};

module.exports = CONST;
