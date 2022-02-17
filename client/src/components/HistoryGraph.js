import React from 'react';
import {
  BarChart,
  Bar,
  Brush,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { date: '01/01/22', count: '10' },
  { date: '01/02/22', count: '11' },
  { date: '01/03/22', count: '9' },
  { date: '01/04/22', count: '10' },
  { date: '01/05/22', count: '9' },
  { date: '01/06/22', count: '8' },
  { date: '01/07/22', count: '10' },
  { date: '01/08/22', count: '11' },
  { date: '01/09/22', count: '9' },
  { date: '01/10/22', count: '10' },
  { date: '01/11/22', count: '9' },
  { date: '01/12/22', count: '8' },
];
const HistoryGraph = () => {
  return (
    <section className='section history-card'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={150}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: -40,
            bottom: 0,
          }}
        >
          <XAxis dataKey='date' />
          <YAxis />
          <Brush dataKey='date' height={20} stroke='#3F9AE0' endIndex={6} />
          <Bar dataKey='count' fill='#3F9AE0' />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default HistoryGraph;
