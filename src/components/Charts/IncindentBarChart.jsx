import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const IncidentGrowthChart = () => {
  const values = [5, 9]; // [2024, 2025]
  const years = ['2024', '2025'];

  const delta = values[1] - values[0];
  const percentChange = values[0] === 0 ? 100 : Math.round((delta / values[0]) * 100);
  const color = percentChange > 0 ? '#ff4444' : percentChange < 0 ? '#00C851' : '#666';
  const sign = percentChange > 0 ? '+' : percentChange < 0 ? '−' : '';

  const data = {
    labels: years,
    datasets: [{
      label: 'Инциденты',
      data: values,
      backgroundColor: ['#90CAF9', '#1E88E5'],
      borderWidth: 0,
      barPercentage: 0.5,
      categoryPercentage: 0.6,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Инциденты по годам',
        font: {
          size: 18
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => value,
        font: {
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Год',
          font: {
            size: 14
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Количество',
          font: {
            size: 14
          }
        },
        beginAtZero: true,
        grid: {
          display: false
        }
      }
    }
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
        options={options} 
        plugins={[ChartDataLabels]}
      />
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
        borderRadius: '4px'
      }}>
        {sign}{Math.abs(percentChange)}%
      </div>
    </div>
  );
};