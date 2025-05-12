import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const WeeklyIncidentsChart = () => {
  const labels = ['07.03–13.03.25', '14.03–21.03.25'];
  const values = [4, 4];

  // Рассчитываем изменения
  const delta = values[1] - values[0];
  const percentChange = values[0] === 0 ? 100 : Math.round((delta / values[0]) * 100);
  const color = delta > 0 ? '#ff4444' : delta < 0 ? '#00C851' : '#666';
  const sign = delta > 0 ? '+' : delta < 0 ? '−' : '';

  const data = {
    labels: labels,
    datasets: [{
      label: 'Инциденты',
      data: values,
      backgroundColor: '#4DB6AC',
      borderWidth: 0,
      barPercentage: 0.5,
      categoryPercentage: 0.6,
    }]
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '400px',
      position: 'relative',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Bar 
        data={data} 
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Инциденты по неделям',
              font: { size: 18 },
              padding: { bottom: 20 }
            },
            datalabels: {
              anchor: 'end',
              align: 'top',
              formatter: (v) => v,
              font: { size: 14, weight: 'bold' }
            }
          },
          scales: {
            x: {
              title: { 
                display: true, 
                text: 'Неделя', 
                font: { size: 14 } 
              },
              grid: { display: false }
            },
            y: {
              title: { 
                display: true, 
                text: 'Количество', 
                font: { size: 14 } 
              },
              beginAtZero: true,
              grid: { display: false },
              ticks: { stepSize: 1 }
            }
          }
        }} 
        plugins={[ChartDataLabels]}
      />
      
      {/* Блок с процентом всегда отображается */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: color,
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: '4px 8px',
        borderRadius: '4px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
      }}>
        {sign}{Math.abs(percentChange)}%
      </div>
    </div>
  );
};