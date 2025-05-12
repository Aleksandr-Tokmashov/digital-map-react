import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const IncidentTypePieChart = () => {
  const currentValues = [3, 0, 1, 0, 5];
  const prevYearValues = [2, 1, 0, 1, 3];

  // Рассчитываем изменения для каждой категории
  const changes = currentValues.map((val, i) => {
    const prev = prevYearValues[i];
    if (prev === 0) return val === 0 ? 0 : 100;
    return Math.round(((val - prev) / prev) * 100);
  });

  const total2025 = currentValues.reduce((a, b) => a + b, 0);
  const total2024 = prevYearValues.reduce((a, b) => a + b, 0);
  const deltaTotal = total2025 - total2024;
  const deltaPercent = total2024 === 0 ? 100 : Math.round((deltaTotal / total2024) * 100);

  const deltaColor = deltaPercent > 0 ? '#ff4444' : deltaPercent < 0 ? '#00C851' : '#666';
  const sign = deltaPercent > 0 ? '+' : deltaPercent < 0 ? '−' : '';

  const labelsRaw = [
    'Излом рельса',
    'Сход при маневрах',
    'Самораздел автосцепок',
    'Прочее',
    'Прочие инциденты',
  ];

  const data = {
    labels: labelsRaw,
    datasets: [
      {
        data: currentValues,
        backgroundColor: ['#42A5F5', '#FF7043', '#9CCC65', '#AB47BC', '#FFCA28'],
        borderWidth: 1,
      },
    ],
  };

  // Создаем кастомную легенду
  const getLegendLabels = () => {
    return labelsRaw.map((label, index) => {
      const change = changes[index];
      const changeColor = change > 0 ? '#ff4444' : change < 0 ? '#00C851' : '#666';
      const changeSign = change > 0 ? '+' : '';
      
      return (
        <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
          <div style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: data.datasets[0].backgroundColor[index],
            marginRight: '8px'
          }} />
          <div style={{ color: '#333', fontSize: '19px' }}>
            {label}: {currentValues[index]}/{prevYearValues[index]} (
            <span style={{ color: changeColor }}>
              {changeSign}{change}%
            </span>)
          </div>
        </div>
      );
    });
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Отключаем стандартную легенду
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const val = currentValues[tooltipItem.dataIndex];
            const prev = prevYearValues[tooltipItem.dataIndex];
            return `${labelsRaw[tooltipItem.dataIndex]}: ${val} (2025) / ${prev} (2024)`;
          },
        },
      },
      datalabels: {
        color: '#000',
        font: {
          size: 10,
          weight: 'bold',
        },
        formatter: (value) => ((value / total2025) * 100).toFixed(1) + '%',
        anchor: 'end',
        align: 'end',
        offset: 20,
        clip: false
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '600px',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex'
    }}>
      <div style={{ flex: 1 }}>
        <Pie 
          data={data} 
          options={options} 
          plugins={[ChartDataLabels]}
        />
        
        {/* Центральная подпись с общими цифрами */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{ 
            fontSize: '14px',
            fontWeight: 'bold',
            color: deltaColor,
            lineHeight: '1.4'
          }}>
            
          </div>
        </div>
      </div>
      
      {/* Кастомная легенда */}
      <div style={{
        width: '350px',
        padding: '10px',
        overflowY: 'auto',
        marginLeft: '20px'
      }}>
        <div style={{ 
          fontWeight: 'bold', 
          marginBottom: '10px',
          fontSize: '20px'
        }}>
          Легенда (2025/2024)
        </div>
        {getLegendLabels()}
      </div>
    </div>
  );
};