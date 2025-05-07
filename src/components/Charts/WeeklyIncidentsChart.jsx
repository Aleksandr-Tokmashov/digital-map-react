import React from 'react';
import Plot from 'react-plotly.js';

export const WeeklyIncidentsChart = () => {
  const xData = ['07.03–13.03.25', '14.03–21.03.25'];
  const yData = [4, 4];

  const data = [
    {
      x: xData,
      y: yData,
      type: 'bar',
      marker: { color: '#4DB6AC' },
      text: yData.map(String), // преобразуем числа в строки
      textposition: 'outside', // размещение текста над столбцами
    },
  ];

  const layout = {
    title: 'Инциденты по неделям',
    xaxis: { title: 'Неделя' },
    yaxis: { title: 'Количество' },
    margin: { t: 50 },
  };

  return (
    <Plot
      data={data}
      layout={layout}
      config={{ displayModeBar: false }}
      style={{ width: '100%', height: '400px' }}
    />
  );
};
