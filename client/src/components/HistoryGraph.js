import React from 'react';
import {
  BarChart,
  Bar,
  Brush,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const HistoryGraph = ({ history }) => {
  return (
    <section className='section history-card'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={150}
          height={200}
          data={history}
          margin={{
            top: 5,
            right: 0,
            left: -40,
            bottom: 0,
          }}
        >
          <XAxis dataKey='date' />
          <YAxis />
          {history.length > 6 && (
            <Brush dataKey='date' height={20} stroke='#3F9AE0' endIndex={6} />
          )}

          <Bar dataKey='amount' fill='#3F9AE0' />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default HistoryGraph;
