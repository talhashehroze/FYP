import React from 'react';
import { 
    BarChart, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer,
    Legend, 
    Bar
} from './../../../../components/recharts';

import colors from './../../../../colors';

const data = [
      {name: '10-18', male: 4000, female: 2400, amt: 2400},
      {name: '19-27', male: 3000, female: 1398, amt: 2210},
      {name: '28-36', male: 2000, female: 9800, amt: 2290},
      {name: '37-44', male: 2780, female: 3908, amt: 2000},
      {name: '45-53', male: 1890, female: 4800, amt: 2181},
      {name: '54-62', male: 2390, female: 3800, amt: 2500},
      {name: '>63', male: 3490, female: 4300, amt: 2100},
];

const SimpleBarChart = () => (
    <ResponsiveContainer width='100%' aspect={6.0/3.0}>
        <BarChart 
            data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
                contentStyle={{
                    background: colors['900'],
                    border: `1px solid ${colors['900']}`,
                    color: colors['white']
                }}
            />
            <Legend wrapperStyle={{ color: colors['900'] }}/>
            <Bar dataKey="female" fill={ colors['primary'] } barSize={ 5 } />
            <Bar dataKey="male" fill={ colors['purple'] } barSize={ 5 } />
        </BarChart>
    </ResponsiveContainer>

)

export { SimpleBarChart };
