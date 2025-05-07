import React from 'react';
import Plot from 'react-plotly.js';

export const IncidentTypePieChart = () => {
  const currentValues = [3, 0, 1, 0, 5]; // 2025
  const prevYearValues = [2, 1, 0, 1, 3]; // 2024

  const total2025 = currentValues.reduce((a, b) => a + b, 0);
  const total2024 = prevYearValues.reduce((a, b) => a + b, 0);
  const deltaTotal = total2025 - total2024;
  const deltaPercent = total2024 === 0 ? 100 : Math.round((deltaTotal / total2024) * 100);

  const deltaColor = deltaPercent > 0 ? 'red' : deltaPercent < 0 ? 'green' : 'gray';
  const sign = deltaPercent > 0 ? '+' : deltaPercent < 0 ? '−' : '';

  const labelsRaw = [
    'Излом рельса',
    'Сход при маневрах',
    'Самораздел автосцепок',
    'Прочее',
    'Прочие инциденты',
  ];

  // убираем HTML и используем только текст
  const labels = currentValues.map((val, i) => {
    const prev = prevYearValues[i];
    const change = prev === 0 ? (val === 0 ? 0 : 100) : Math.round(((val - prev) / prev) * 100);
    const sign = change > 0 ? '+' : change < 0 ? '−' : '';
    return `${labelsRaw[i]} ${val}/${prev} (${sign}${Math.abs(change)}%)`;
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
            colors: ['#42A5F5', '#FF7043', '#9CCC65', '#AB47BC', '#FFCA28'],
          },
        },
      ]}
      layout={{
        title: {
          text: 'Инциденты: <br> 2024 / 2025',
          font: { size: 10 },
          x: 0.425,
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
