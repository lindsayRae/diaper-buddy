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
      {history.length === 0 && (
        <p>
          No used diaper history yet. Remove a diaper from above to start
          tracking!
        </p>
      )}
      {history.length > 0 && (
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
            <XAxis dataKey='entryDate' />
            <YAxis />
            {history.length > 6 && (
              <Brush
                dataKey='entryDate'
                height={20}
                stroke='#3F9AE0'
                endIndex={6}
              />
            )}

            <Bar dataKey='count' fill='#3F9AE0' />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
};

export default HistoryGraph;
