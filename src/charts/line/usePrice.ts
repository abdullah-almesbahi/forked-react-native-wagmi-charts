import { useDerivedValue } from 'react-native-reanimated';

import { formatPrice } from '../../utils';
import type { TFormatterFn } from '../candle/types';
import { useLineChart } from './useLineChart';

export function useLineChartPrice({
  format,
  precision = 2,
  index,
}: { format?: TFormatterFn<string>; precision?: number; index?: number } = {}) {
  const { currentIndex, data } = useLineChart();

  const float = useDerivedValue(() => {
    if (
      (typeof currentIndex.value === 'undefined' ||
        currentIndex.value === -1) &&
      index == null
    )
      return '';
    let price = 0;
    price = data[Math.min(index ?? currentIndex.value, data.length - 1)].value;
    return price.toFixed(precision).toString();
  });
  const formatted = useDerivedValue(() => {
    let value = float?.value || '';
    const formattedPrice = value ? formatPrice({ value }) : '';
    if (
      typeof format != 'undefined' &&
      typeof format == 'function' &&
      value != '' &&
      formattedPrice != ''
    ) {
      return format({ value, formatted: formattedPrice });
    } else {
      return formattedPrice;
    }
  });
  return { value: float, formatted };
}
