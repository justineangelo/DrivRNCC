import React, { Component, ReactNode } from "react";
import Svg, { Defs, LinearGradient, Stop } from "react-native-svg";
import { StyleProp, ViewStyle } from "react-native";

interface SVGProps {
  svg: { element: JSX.Element; viewBox: string };
  x?: number;
  y?: number;
  height?: string | number;
  width?: string | number;
  strokeWidth?: number;
  fill?: string | string[];
  style?: StyleProp<ViewStyle>;
  fillRule?: "nonzero" | "evenodd";
  stroke?: string | number;
  enabled?: boolean;
  onPress?: () => void;
}

class SVG extends Component<SVGProps> {
  render(): ReactNode {
    const {
      svg,
      x,
      y,
      height,
      width,
      fill,
      style,
      fillRule,
      stroke,
      enabled,
      onPress,
    } = this.props;
    const strokeWidth = (this.props.strokeWidth || 1).toString();
    let fillColor = fill ?? "#FFF";
    let fillColorCount = 0;

    if (Array.isArray(fill) && fill.length > 0) {
      fillColorCount = fill.length;
      if (fillColorCount > 1) {
        fillColor = "url(#gradient)";
      } else {
        fillColor = fill[0];
      }
    }

    return (
      <Svg
        x={x}
        y={y}
        height={height}
        width={width}
        viewBox={svg.viewBox}
        style={style}
        disabled={!enabled}
        onPress={onPress}
      >
        <LinearGradientComponent fill={fill} fillCount={fillColorCount} />
        {React.cloneElement(svg.element, {
          fill: fillColor,
          fillRule: fillRule,
          stroke: stroke,
          strokeWidth: strokeWidth,
        })}
      </Svg>
    );
  }
}

const LinearGradientComponent = (props: {
  fill?: string[] | string;
  fillCount: number;
}) => {
  if (Array.isArray(props.fill) && props.fillCount > 1) {
    const increment = 1 / (props.fillCount - 1);

    return (
      <Defs>
        <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
          {props.fill.map((color, index) => {
            return (
              <Stop
                key={index}
                offset={(increment * index).toString()}
                stopColor={color}
                stopOpacity="1"
              />
            );
          })}
        </LinearGradient>
      </Defs>
    );
  } else {
    return null;
  }
};

export default SVG;
