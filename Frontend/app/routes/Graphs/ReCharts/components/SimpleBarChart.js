import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Bar,
} from "./../../../../components/recharts";

import colors from "./../../../../colors";



const SimpleBarChart = (props) => (
  <ResponsiveContainer width="100%" aspect={6.0 / 3.0}>
    <BarChart data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip
        contentStyle={{
          background: colors["900"],
          border: `1px solid ${colors["900"]}`,
          color: colors["white"],
        }}
      />
      <Legend wrapperStyle={{ color: colors["900"] }} />
      <Bar dataKey="Bot" fill={colors["primary"]} barSize={5} />
      <Bar dataKey="Human" fill={colors["purple"]} barSize={5} />
    </BarChart>
  </ResponsiveContainer>
);

export { SimpleBarChart };
