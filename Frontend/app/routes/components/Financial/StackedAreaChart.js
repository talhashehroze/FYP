import React from "react";
import { map } from "lodash";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  Dot,
  Rectangle,
  Polygon,
} from "./../../../components/recharts";

import colors from "./../../../colors";

const generateDot =
  ({ diameter, fill, stroke }) =>
  /* eslint-disable */
  ({ cx, cy }) =>
    (
      <Dot
        cx={cx}
        cy={cy}
        r={diameter / 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={2}
        strokeOpacity={1}
        fillOpacity={1}
      />
    );
/* eslint-enable */

const generateSquare =
  ({ height, fill, stroke }) =>
  /* eslint-disable */
  ({ cx, cy }) =>
    (
      <Rectangle
        x={cx - height / 2}
        y={cy - height / 2}
        fill={fill}
        stroke={stroke}
        strokeOpacity={1}
        strokeWidth={2}
        fillOpacity={1}
        width={height}
        height={height}
      />
    );
/* eslint-enable */

const generateTriangle =
  ({ height, fill, stroke }) =>
  // eslint-disable-next-line react/prop-types
  ({ cx, cy }) => {
    const halfSide = height / Math.sqrt(3);
    const points = [
      { x: 0, y: -((height * 2) / 3) },
      { x: -halfSide, y: height / 3 },
      { x: halfSide, y: height / 3 },
    ];
    const vertices = map(points, ({ x, y }) => ({ x: cx + x, y: cy + y }));

    return (
      <Polygon
        points={vertices}
        fill={fill}
        fillOpacity={1}
        stroke={stroke}
        strokeWidth={2}
      />
    );
  };

const data = [{'name': 'Hour 1', 'human': 12, 'bot': 4}, {'name': 'Hour 2', 'human': 157, 'bot': 10}, 
{'name': 'Hour 3', 'human': 32, 'bot': 40}, {'name': 'Hour 4', 'human': 16, 'bot': 13}, 
{'name': 'Hour 5', 'human': 19, 'bot': 61}, {'name': 'Hour 6', 'human': 16, 'bot': 70}]


const StackedAreaChart = (props) => (
  <ResponsiveContainer width="100%" aspect={6.0 / 3.0}>
    <AreaChart data={props.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        dataKey="human"
        stackId="1"
        stroke={colors["purple"]}
        fill={colors["purple-04"]}
        dot={generateTriangle({
          height: 5,
          stroke: colors["purple"],
          fill: colors["purple"],
        })}
        activeDot={generateTriangle({
          height: 7,
          stroke: colors["purple"],
          fill: colors["purple"],
        })}
      />
      <Area
        dataKey="bot"
        stackId="1"
        stroke={colors["primary"]}
        fill={colors["primary-04"]}
        dot={generateSquare({
          height: 5,
          stroke: colors["primary"],
          fill: colors["primary"],
        })}
        activeDot={generateSquare({
          height: 7,
          stroke: colors["primary"],
          fill: colors["primary"],
        })}
      />
    
    </AreaChart>
  </ResponsiveContainer>
);

export { StackedAreaChart };
