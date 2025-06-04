import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const commonChartOptions = (title, xTitle) => ({
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: title,
      font: { 
        size: 18,
        weight: 'bold'
      },
      padding: { bottom: 20 }
    },
    datalabels: {
      anchor: 'end',
      align: 'top',
      formatter: (v) => v,
      font: { 
        size: 14, 
        weight: 'bold' 
      }
    }
  },
  scales: {
    x: {
      title: { 
        display: true, 
        text: xTitle, 
        font: { 
          size: 14,
          weight: 'bold'
        } 
      },
      grid: { display: false }
    },
    y: {
      title: { 
        display: true, 
        text: 'Количество', 
        font: { 
          size: 14,
          weight: 'bold'
        } 
      },
      beginAtZero: true,
      grid: { display: false },
      ticks: { 
        stepSize: 1,
        font: {
          size: 12
        }
      }
    }
  }
});

export const deltaLabelStyle = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: 'rgba(255,255,255,0.9)',
  padding: '4px 8px',
  borderRadius: '4px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
};

// Цветовая палитра для графиков
export const chartColors = {
  weekly: ['#4DB6AC', '#009688'], // два оттенка зеленого для недельного графика
  yearly: ['#90CAF9', '#1E88E5'], // два оттенка синего для годового графика
  positive: '#ff4444', // для положительных изменений
  negative: '#00C851', // для отрицательных изменений
  neutral: '#666' // для нулевых изменений
};

export const IncidentGrowthChart = ({ incidents, isTestData = false }) => {
  // Функция для группировки инцидентов по годам
  const groupByYear = (incidentsArray) => {
    const years = {};
    
    incidentsArray.forEach(incident => {
      const year = incident.date.split('.')[2]; // Получаем год из даты "DD.MM.YYYY"
      
      if (!years[year]) {
        years[year] = [];
      }
      years[year].push(incident);
    });
    
    return years;
  };

  // Преобразуем объект инцидентов в плоский массив
  const flattenIncidents = () => {
    if (!incidents) return [];
    return Object.values(incidents).flat();
  };

  // Получаем данные
  const allIncidents = flattenIncidents();
  const yearlyData = groupByYear(allIncidents);
  
  // Сортируем годы по возрастанию и берем последние 2 года
  const sortedYears = Object.keys(yearlyData).sort();
  const lastTwoYears = sortedYears.slice(-2);
  
  // Формируем данные для графика
  let years = lastTwoYears;
  let values = lastTwoYears.map(year => yearlyData[year].length);

  // Обработка тестовых данных
  if (isTestData) {
    const currentYear = new Date().getFullYear().toString();
    const prevYear = (parseInt(currentYear) - 1).toString();
    
    years = [prevYear, currentYear];
    values = [
      10, // Фиксированное значение для прошлого года в тестовом режиме
      values[0] || allIncidents.length || 0 // Текущие данные или 0
    ];
  }
  // Если данных за 2 года нет (и не тестовый режим)
  else if (years.length < 2) {
    const currentYear = new Date().getFullYear().toString();
    const prevYear = (parseInt(currentYear) - 1).toString();
    
    years[0] = years[0] || prevYear;
    years[1] = years[1] || currentYear;
    
    values[0] = values[0] || 0;
    values[1] = values[1] || 0;
  }

  // Расчет дельты
  const delta = values[1] - values[0];
  const percentChange = values[0] === 0 ? 100 : Math.round((delta / values[0]) * 100);
  const color = percentChange > 0 ? chartColors.positive : 
               percentChange < 0 ? chartColors.negative : chartColors.neutral;
  const sign = percentChange > 0 ? '+' : percentChange < 0 ? '−' : '';

  const data = {
    labels: years,
    datasets: [{
      label: 'Инциденты',
      data: values,
      backgroundColor: chartColors.yearly,
      borderWidth: 0,
      barPercentage: 0.5,
      categoryPercentage: 0.6,
    }]
  };

  return (
    <div style={{ position: 'relative', height: "20%" }}>
      <Bar 
        data={data} 
        options={commonChartOptions('Инциденты по годам', 'Год')} 
        plugins={[ChartDataLabels]}
      />
      
      <div style={{ ...deltaLabelStyle, color }}>
        {sign}{Math.abs(percentChange)}%
      </div>
    </div>
  );
};