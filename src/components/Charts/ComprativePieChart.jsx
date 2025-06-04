import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const ComparativePieChart = ({ incidents, isTestData = false, typeColors }) => {
  // Группировка инцидентов по типам для текущего года
  const groupIncidentsByType = (incidentsArray) => {
    const types = {
      'Излом рельса': 0,
      'Сход при поездной работе': 0,
      'Прочее': 0,
      'Самораздел автосцепок': 0
    };

    incidentsArray.forEach(incident => {
      if (incident.type === 'ИЗЛОМЫ РЕЛЬСОВ') {
        types['Излом рельса']++;
      } else if (incident.type === 'СХОДЫ В ПОЕЗДЕ') {
        types['Сход при поездной работе']++;
      } else if (incident.type === 'САМОРАСЦЕП АВТОСЦЕПОК') {
        types['Самораздел автосцепок']++;
      } else {
        types['Прочее']++;
      }
    });

    return types;
  };

  // Преобразуем объект инцидентов в плоский массив
  const flattenIncidents = () => {
    if (!incidents) return [];
    return Object.values(incidents).flat();
  };

  // Получаем данные
  const allIncidents = flattenIncidents();
  const currentYearData = groupIncidentsByType(allIncidents);
  
  // Подготавливаем данные для текущего года
  const currentValues = [
    currentYearData['Излом рельса'],
    currentYearData['Сход при поездной работе'],
    currentYearData['Прочее'],
    currentYearData['Самораздел автосцепок']
  ];

  // Для тестовых данных создаем фиктивные значения прошлого года
  const prevYearValues = isTestData 
    ? [22, 1, 2, 1] // Тестовые данные
    : [ // Можно заменить на реальные данные прошлого года
        Math.max(0, currentYearData['Излом рельса'] - 3),
        Math.max(0, currentYearData['Сход при поездной работе'] - 2),
        Math.max(0, currentYearData['Прочее'] - 1),
        Math.max(0, currentYearData['Самораздел автосцепок'] - 1)
      ];

  const total2025 = currentValues.reduce((a, b) => a + b, 0);
  const total2024 = prevYearValues.reduce((a, b) => a + b, 0);
  const deltaTotal = total2025 - total2024;
  const deltaPercent = total2024 === 0 ? 100 : Math.round((deltaTotal / total2024) * 100);

  const deltaColor = deltaTotal < 0 ? 'green' : deltaTotal > 0 ? 'red' : 'gray';
  const sign = deltaPercent > 0 ? '+' : deltaPercent < 0 ? '−' : '';

  const labelsRaw = [
    'Излом рельса',
    'Сход при поездной работе',
    'Прочее',
    'Самораздел автосцепок',
  ];

  // Используем цвета из typeColors
  const backgroundColors = [
    typeColors['ИЗЛОМЫ РЕЛЬСОВ'] || '#2F87B6', // Излом рельса
    typeColors['СХОДЫ В ПОЕЗДЕ'] || '#FDC07C', // Сход при поездной работе
    '#B0BEC5', // Прочее (цвет по умолчанию)
    typeColors['САМОРАСЦЕП АВТОСЦЕПОК'] || '#2F87B6' // Самораздел автосцепок
  ];

  const data = {
    labels: labelsRaw,
    datasets: [
      {
        data: currentValues,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    animation: false,
    cutout: '70%',
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
              const change = prev === 0 ? (val === 0 ? 0 : 100) : Math.round(((val - prev) / prev) * 100);
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
            const change = prev === 0 ? (val === 0 ? 0 : 100) : Math.round(((val - prev) / prev) * 100);
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
        formatter: (value) => {
          const percent = ((value / total2025) * 100).toFixed(1) + '%';
          return value > 0 ? percent : '';
        },
      },
    },
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: "20%", 
      position: 'relative',
      padding: '20px'
    }}>
      <Doughnut 
        data={data} 
        options={options} 
        plugins={[ChartDataLabels]} 
      />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '40%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        color: deltaColor,
      }}>
        <div>2024: {total2024}</div>
        <div>2025: {total2025}</div>
        <div style={{ marginTop: '5px', fontSize: '14px' }}>
          {sign}{Math.abs(deltaPercent)}%
        </div>
      </div>
    </div>
  );
};