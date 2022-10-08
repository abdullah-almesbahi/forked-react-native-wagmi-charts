import { useDerivedValue } from 'react-native-reanimated';
import { formatPrice } from '../../utils';
import { useLineChart } from './useLineChart';
export function useLineChartPrice({
  format,
  precision = 2,
  index
} = {}) {
  const {
    currentIndex,
    data
  } = useLineChart();
  const float = useDerivedValue(() => {
    if ((typeof currentIndex.value === 'undefined' || currentIndex.value === -1) && index == null) return '';
    let price = 0;
    price = data[Math.min(index !== null && index !== void 0 ? index : currentIndex.value, data.length - 1)].value;
    return price.toFixed(precision).toString();
  });
  const formatted = useDerivedValue(() => {
    let value = (float === null || float === void 0 ? void 0 : float.value) || '';
    const formattedPrice = value ? formatPrice({
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