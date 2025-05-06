import React from 'react';
import Plot from 'react-plotly.js';

export const PlotlyChart = () => {
  const data = [
    {
      x: [1, 2, 3, 4, 5],
      y: [10, 15, 13, 17, 21],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'red' },
    },
  ];

  const layout = {
    title: 'Пример графика Plotly в React',
    xaxis: { title: 'Ось X' },
    yaxis: { title: 'Ось Y' },
  };

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: '100%', height: '400px' }}
    />
  );
};
