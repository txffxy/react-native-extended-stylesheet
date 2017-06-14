/**
 * Calculation of px strings
 */
import {Dimensions, Platform} from 'react-native';

const isAndroid = Platform.OS === 'android';
const {width: deviceWidthDp} = Dimensions.get('window');
const SUFFIX = 'px';
const DEFAULT_UI_EIDTH_PX = 750;
const INT_PROPS = [
  'lineheight'
];

export default {
  isPx,
  calc,
};

/**
 * Is string contains px
 * @param {String} str
 * @returns {Boolean}
 */
function isPx(str) {
  return str.substr(-SUFFIX.length) === SUFFIX;
}
/**
 * 判断是否需要转换为整数
 * @param  {String} prop
 * @return {Boolean}
 */
function needInt(prop) {
  if (isAndroid) {
    prop = prop.toLowerCase();
    return INT_PROPS.some(p => prop.indexOf(p) >= 0);
  }
  return false;
}

/**
 * Calculate px to pixels: '1.2px' => 1.2 * deviceWidthDp / uiWidthPx
 * @param {String} str
 * @param {String} prop
 * @param {Number} uiWidthPx
 * @returns {number}
 */
function calc(str, prop, uiWidthPx = DEFAULT_UI_EIDTH_PX) {
  let koefStr = str.substr(0, str.length - SUFFIX.length);
  let koef = koefStr === '' ? 1 : parseFloat(koefStr);
  if (isNaN(koef)) {
    throw new Error('Invalid px value: ' + str);
  }
  let result = deviceWidthDp / uiWidthPx * koef;
  if (needInt(prop)) {
    result = Math.round(result);
  }
  return result;
}
