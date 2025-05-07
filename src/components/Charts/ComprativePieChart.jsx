import React from 'react';
import Plot from 'react-plotly.js';

export const ComparativePieChart = () => {
  const currentValues = [21, 5, 2, 3]; // 2025
  const prevYearValues = [22, 1, 2, 1]; // 2024

  const total2025 = currentValues.reduce((a, b) => a + b, 0);
  const total2024 = prevYearValues.reduce((a, b) => a + b, 0);
  const deltaTotal = total2025 - total2024;
  const deltaPercent = total2024 === 0 ? 100 : Math.round((deltaTotal / total2024) * 100);

  const deltaColor = deltaPercent > 0 ? 'red' : deltaPercent < 0 ? 'green' : 'gray';
  const sign = deltaPercent > 0 ? '+' : deltaPercent < 0 ? '−' : '';

  const labelsRaw = [
    'Излом рельса',
    'Сход при поездной работе',
    'Самораздел автосцепок',
    'Прочее',
  ];

  const labels = currentValues.map((val, i) => {
    const prev = prevYearValues[i];
    const change = prev === 0 ? 100 : Math.round(((val - prev) / prev) * 100);
    const color = change > 0 ? 'red' : change < 0 ? 'green' : 'gray';
    const sign = change > 0 ? '+' : change < 0 ? '−' : '';
    return `${labelsRaw[i]} ${val}/${prev} <span style="color:${color}">(${sign}${Math.abs(change)}%)</span>`;
  });

  return (
    <Plot
      data={[
        {
          type: 'pie',
          values: currentValues,
          labels: labels,
          textinfo: 'percent',
          hoverinfo: 'label+value+percent',
          hole: 0.5,
          marker: {
            colors: ['#1976D2', '#FFECB3', '#E0E0E0', '#B0BEC5'],
          },
        },
      ]}
      layout={{
        title: {
          text: `Инциденты:<br> 2024 / 2025`,
          font: { size: 10 },
          x: 0.42,
          y: 0.55,
          xanchor: 'center',
          yanchor: 'middle',
        },
        annotations: [
          {
            text: `<b>${total2024}</b> / <b>${total2025}</b><br><span style="color:${deltaColor}">(${sign}${Math.abs(deltaPercent)}%)</span>`,
            x: 0.505,
            y: 0.5,
            showarrow: false,
            font: {
              size: 10,
            },
            align: 'center',
            xanchor: 'center',
            yanchor: 'middle',
          },
        ],
        showlegend: true,
        legend: {
          font: { size: 12 },
          orientation: 'v',
        },
      }}
      config={{ displayModeBar: false }}
      style={{ width: '100%', height: '450px' }}
    />
  );
};
