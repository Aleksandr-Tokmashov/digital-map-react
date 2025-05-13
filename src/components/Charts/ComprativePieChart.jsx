import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const ComparativePieChart = () => {
  const currentValues = [21, 5, 2, 3]; // 2025
  const prevYearValues = [22, 1, 2, 1]; // 2024

  const total2025 = currentValues.reduce((a, b) => a + b, 0);
  const total2024 = prevYearValues.reduce((a, b) => a + b, 0);
  const deltaTotal = total2025 - total2024;
  const deltaPercent = total2024 === 0 ? 100 : Math.round((deltaTotal / total2024) * 100);

  const deltaColor = total2025 < total2024 ? 'green' : 'red'; // Цвет меняется в зависимости от сравнении инцидентов
  const sign = deltaPercent > 0 ? '+' : deltaPercent < 0 ? '−' : '';

  const labelsRaw = [
    'Излом рельса',
    'Сход при поездной работе',
    'Прочее',
    'Самораздел автосцепок',
  ];

  const data = {
    labels: labelsRaw,
    datasets: [
      {
        data: currentValues,
        backgroundColor: ['#1976D2', '#FFECB3', '#B0BEC5', '#E0E0E0'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 12,
          },
          generateLabels: (chart) => {
            const dataset = chart.data.datasets[0];
            return chart.data.labels.map((label, i) => {
              const val = currentValues[i];
              const prev = prevYearValues[i];
              const change = prev === 0 ? 100 : Math.round(((val - prev) / prev) * 100);
              const sign = change > 0 ? '+' : change < 0 ? '−' : '';
              const color = change > 0 ? 'red' : change < 0 ? 'green' : 'gray';
              return {
                text: `${label} ${val}/${prev} (${sign}${Math.abs(change)}%)`,
                fillStyle: dataset.backgroundColor[i],
                strokeStyle: dataset.backgroundColor[i],
                fontColor: color,
              };
            });
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const val = currentValues[tooltipItem.dataIndex];
            const prev = prevYearValues[tooltipItem.dataIndex];
            const change = prev === 0 ? 100 : Math.round(((val - prev) / prev) * 100);
            const sign = change > 0 ? '+' : change < 0 ? '−' : '';
            return `${labelsRaw[tooltipItem.dataIndex]}: ${val}/${prev} (${sign}${Math.abs(change)}%)`;
          },
        },
      },
      datalabels: {
        color: '#000',
        font: {
          size: 12,
          weight: 'bold',
        },
        formatter: (value, context) => {
          const percent = ((value / total2025) * 100).toFixed(1) + '%';
          return `${percent}`;
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px', position: 'relative' }}>
      <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '41%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        color: deltaColor,  // Используем новый цвет для изменения
      }}>
        <div>2024: {total2024} событий</div>
        <div>2025: {total2025} событий</div>
        <div> </div>
        <div>{`${sign}${Math.abs(deltaPercent)}%`}</div>
      </div>
    </div>
  );
};
