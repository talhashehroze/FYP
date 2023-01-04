import React from 'react';
import { 
    AreaChart, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer,
    Area
} from './../../../../components/recharts';

import colors from './../../../../colors';

const data = [
      {name: 'Monday', nooftweets: 4000, pv: 2400, amt: 2400},
      {name: 'Tuesday', nooftweets: 3000, pv: 1398, amt: 2210},
      {name: 'Wednesday', nooftweets: 2000, pv: 9800, amt: 2290},
      {name: 'Thrusday', nooftweets: 2780, pv: 3908, amt: 2000},
      {name: 'Friday', nooftweets: 1890, pv: 4800, amt: 2181},
      {name: 'Saturday', nooftweets: 2390, pv: 3800, amt: 2500},
      {name: 'Sunday', nooftweets: 3490, pv: 4300, amt: 2100},
];

const SimpleAreaChart = () => (
    <ResponsiveContainer width='100%' aspect={6.0/3.0}>
        <AreaChart data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Area dataKey='nooftweets' stroke={ colors['primary'] } fill={ colors['primary-02'] } />
      </AreaChart>
    </ResponsiveContainer>

)

export { SimpleAreaChart };
