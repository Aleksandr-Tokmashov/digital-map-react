import React from 'react';
import Plot from 'react-plotly.js';

export const IncidentGrowthChart = () => {
  const values = [5, 9]; // [2024, 2025]
  const years = ['2024', '2025'];

  const delta = values[1] - values[0];
  const percentChange = values[0] === 0 ? 100 : Math.round((delta / values[0]) * 100);
  const color = percentChange > 0 ? 'red' : percentChange < 0 ? 'green' : 'gray';
  const sign = percentChange > 0 ? '+' : percentChange < 0 ? '−' : '';

  return (
    <Plot
      data={[
        {
          x: years,
          y: values,
          type: 'bar',
          text: values.map(String),
          textposition: 'outside',
          name: 'Инциденты',
          marker: { color: ['#90CAF9', '#1E88E5'] },
        },
      ]}
      layout={{
        title: 'Инциденты по годам',
        xaxis: {
          title: 'Год',
          type: 'category',
        },
        yaxis: {
          title: 'Количество',
        },
        annotations: [
          {
            x: 0, // '2025'
            y: (values[0] + values[1]) / 1.5,
            text: `<span style="color:${color}; font-size:16px;">${sign}${Math.abs(percentChange)}%</span>`,
            showarrow: false,
            xanchor: 'center',
            yanchor: 'middle',
            xshift: 320, // сдвиг влево между 2024 и 2025
          },
        ],
        showlegend: true,
        bargap: 0.5,
      }}
      config={{ displayModeBar: false }}
      style={{ width: '100%', height: '400px' }}
    />
  );
};
