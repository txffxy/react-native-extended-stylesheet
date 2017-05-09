/**
 * Calculation of px strings
 */
import {Dimensions} from 'react-native';

const {width: deviceWidthDp} = Dimensions.get('window');
const SUFFIX = 'px';
const DEFAULT_UI_EIDTH_PX = 750;

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
 * Calculate px to pixels: '1.2px' => 1.2 * deviceWidthDp / uiWidthPx
 * @param {String} str
 * @param {Number} uiWidthPx
 * @returns {number}
 */
function calc(str, uiWidthPx = DEFAULT_UI_EIDTH_PX) {
  let koefStr = str.substr(0, str.length - SUFFIX.length);
  let koef = koefStr === '' ? 1 : parseFloat(koefStr);
  if (isNaN(koef)) {
    throw new Error('Invalid px value: ' + str);
  }
  return deviceWidthDp / uiWidthPx * koef;
}
