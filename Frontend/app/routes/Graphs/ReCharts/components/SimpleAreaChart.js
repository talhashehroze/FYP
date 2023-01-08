// import axios from "axios";
import React from "react";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "./../../../../components/recharts";

import colors from "./../../../../colors";

// const data = [
//   { name: "Monday", nooftweets: 16, pv: 2400, amt: 2400 },
//   { name: "Tuesday", nooftweets: 14, pv: 1398, amt: 2210 },
//   { name: "Wednesday", nooftweets: 18, pv: 9800, amt: 2290 },
//   { name: "Thrusday", nooftweets: 11, pv: 3908, amt: 2000 },
//   { name: "Friday", nooftweets: 22, pv: 4800, amt: 2181 },
//   { name: "Saturday", nooftweets: 0, pv: 3800, amt: 2500 },
//   { name: "Sunday", nooftweets: 0, pv: 4300, amt: 2100 },
// ];

const tweetdaydatacount = require("../../../../../../Backend/Data/json_dnamecount.json");

// const chart_data = tweetdaydatacount;
// var count_tt = Object.keys(chart_data).length;
// // console.log(count_tt);

// var arr_d = [];

// for (let i = 0; i < count_tt; i++) {
//   const s = chart_data[i]; // reads string
//   const d = new Date(s); // convert the string to datetime
//   var now = d.toLocaleDateString();
//   arr_d.push(now); // adds that into an array
// }

const SimpleAreaChart = (props) => (
  // console.log(
  //   "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  //   props.data
  // )
  // return;
  // <React.Fragment>
  <ResponsiveContainer width="100%" aspect={6.0 / 3.0}>
    <AreaChart
      data={props.data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        dataKey="nooftweets"
        stroke={colors["primary"]}
        fill={colors["primary-02"]}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export { SimpleAreaChart };
