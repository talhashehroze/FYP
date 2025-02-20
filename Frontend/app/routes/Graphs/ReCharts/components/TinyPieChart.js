import React from "react";
import { PieChart, Pie, Cell } from "./../../../../components/recharts";

import colors from "./../../../../colors";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = [
  colors["primary"],
  colors["purple"],
  colors["success"],
  colors["yellow"],
];

const TinyPieChart = () => (
  <PieChart width={30} height={30}>
    <Pie
      data={data}
      dataKey="value"
      fill="#8884d8"
      stroke={colors["white"]}
      outerRadius={15}
    >
      {data.map((entry, index) => (
        <Cell key={index} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
);

export { TinyPieChart };
