import * as React from 'react';
import Animated from 'react-native-reanimated';
export declare type LineChartTooltipProps = Animated.AnimateProps<any> & {
    children?: React.ReactNode;
    xGutter?: number;
    yGutter?: number;
    cursorGutter?: number;
    position?: 'top' | 'bottom';
    textProps?: any;
    textStyle?: any;
    /**
     * When specified the tooltip is considered static, and will
     * always be rendered at the given index, unless there is interaction
     * with the chart (like interacting with a cursor).
     *
     * @default undefined
     */
    at?: number;
};
export declare function LineChartTooltip({ children, xGutter, yGutter, cursorGutter, position, textProps, textStyle, at, ...props }: LineChartTooltipProps): JSX.Element;
export declare namespace LineChartTooltip {
    var displayName: string;
}
