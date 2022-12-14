function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { LineChartPriceText } from './PriceText';
import { LineChartDimensionsContext } from './Chart';
import { CursorContext } from './Cursor';
import { useLineChart } from './useLineChart';
import { getYForX } from 'react-native-redash';
import { useMemo } from 'react';
LineChartTooltip.displayName = 'LineChartTooltip';
export function LineChartTooltip({
  children,
  xGutter = 8,
  yGutter = 8,
  cursorGutter = 48,
  position = 'top',
  textProps,
  textStyle,
  at,
  ...props
}) {
  const {
    width,
    height,
    parsedPath,
    pointWidth
  } = React.useContext(LineChartDimensionsContext);
  const {
    type
  } = React.useContext(CursorContext);
  const {
    currentX,
    currentY,
    isActive
  } = useLineChart();
  const x = useSharedValue(0);
  const elementWidth = useSharedValue(0);
  const elementHeight = useSharedValue(0);
  const handleLayout = React.useCallback(event => {
    x.value = event.nativeEvent.layout.x;
    elementWidth.value = event.nativeEvent.layout.width;
    elementHeight.value = event.nativeEvent.layout.height;
  }, [elementHeight, elementWidth, x]); // When the user set a `at` index, get the index's y & x positions

  const atXPosition = useMemo(() => at == null ? undefined : pointWidth * at, [at, pointWidth]);
  const atYPosition = useDerivedValue(() => {
    var _getYForX;

    return atXPosition == null ? undefined : (_getYForX = getYForX(parsedPath, atXPosition)) !== null && _getYForX !== void 0 ? _getYForX : 0;
  }, [atXPosition]);
  const animatedCursorStyle = useAnimatedStyle(() => {
    var _atYPosition$value;

    let translateXOffset = elementWidth.value / 2; // the tooltip is considered static when the user specified an `at` prop

    const isStatic = atYPosition.value != null; // Calculate X position:

    const x = atXPosition !== null && atXPosition !== void 0 ? atXPosition : currentX.value;

    if (x < elementWidth.value / 2 + xGutter) {
      const xOffset = elementWidth.value / 2 + xGutter - x;
      translateXOffset = translateXOffset - xOffset;
    }

    if (x > width - elementWidth.value / 2 - xGutter) {
      const xOffset = x - (width - elementWidth.value / 2 - xGutter);
      translateXOffset = translateXOffset + xOffset;
    } // Calculate Y position:


    let translateYOffset = 0;
    const y = (_atYPosition$value = atYPosition.value) !== null && _atYPosition$value !== void 0 ? _atYPosition$value : currentY.value;

    if (position === 'top') {
      translateYOffset = elementHeight.value / 2 + cursorGutter;

      if (y - translateYOffset < yGutter) {
        translateYOffset = y - yGutter;
      }
    } else if (position === 'bottom') {
      translateYOffset = -(elementHeight.value / 2) - cursorGutter / 2;

      if (y - translateYOffset + elementHeight.value > height - yGutter) {
        translateYOffset = y - (height - yGutter) + elementHeight.value;
      }
    } // determine final translateY value


    let translateY;

    if (type === 'crosshair' || isStatic) {
      translateY = y - translateYOffset;
    } else {
      if (position === 'top') {
        translateY = yGutter;
      } else {
        translateY = height - elementHeight.value - yGutter;
      }
    }

    let opacity = isActive.value ? 1 : 0;

    if (isStatic) {
      // Only show static when there is no active cursor
      opacity = withTiming(isActive.value ? 0 : 1);
    }

    return {
      transform: [{
        translateX: x - translateXOffset
      }, {
        translateY: translateY
      }],
      opacity: opacity
    };
  });
  return /*#__PURE__*/React.createElement(Animated.View, _extends({
    onLayout: handleLayout
  }, props, {
    style: [{
      position: 'absolute',
      padding: 4,
      alignSelf: 'flex-start'
    }, animatedCursorStyle, props.style]
  }), children || /*#__PURE__*/React.createElement(LineChartPriceText, _extends({
    style: [textStyle]
  }, textProps)));
}
//# sourceMappingURL=Tooltip.js.map