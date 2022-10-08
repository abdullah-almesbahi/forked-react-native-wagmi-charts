"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLineChartPrice = useLineChartPrice;

var _reactNativeReanimated = require("react-native-reanimated");

var _utils = require("../../utils");

var _useLineChart = require("./useLineChart");

function useLineChartPrice({
  format,
  precision = 2,
  index
} = {}) {
  const {
    currentIndex,
    data
  } = (0, _useLineChart.useLineChart)();
  const float = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if ((typeof currentIndex.value === 'undefined' || currentIndex.value === -1) && index == null) return '';
    let price = 0;
    price = data[Math.min(index !== null && index !== void 0 ? index : currentIndex.value, data.length - 1)].value;
    return price.toFixed(precision).toString();
  });
  const formatted = (0, _reactNativeReanimated.useDerivedValue)(() => {
    let value = (float === null || float === void 0 ? void 0 : float.value) || '';
    const formattedPrice = value ? (0, _utils.formatPrice)({
      value
    }) : '';

    if (typeof format != 'undefined' && typeof format == 'function' && value != '' && formattedPrice != '') {
      return format({
        value,
        formatted: formattedPrice
      });
    } else {
      return formattedPrice;
    }
  });
  return {
    value: float,
    formatted
  };
}
//# sourceMappingURL=usePrice.js.map