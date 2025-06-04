import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
        weight: "bold",
      },
      padding: { bottom: 20 },
    },
    datalabels: {
      anchor: "end",
      align: "top",
      formatter: (v) => v,
      font: {
        size: 14,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: xTitle,
        font: {
          size: 14,
          weight: "bold",
        },
      },
      grid: { display: false },
    },
    y: {
      title: {
        display: true,
        text: "Количество",
        font: {
          size: 14,
          weight: "bold",
        },
      },
      beginAtZero: true,
      grid: { display: false },
      ticks: {
        stepSize: 1,
        font: {
          size: 12,
        },
      },
    },
  },
});

export const deltaLabelStyle = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "rgba(255,255,255,0.9)",
  padding: "4px 8px",
  borderRadius: "4px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
};

// Цветовая палитра для графиков
export const chartColors = {
  weekly: ["#4DB6AC", "#009688"], // два оттенка зеленого для недельного графика
  yearly: ["#90CAF9", "#1E88E5"], // два оттенка синего для годового графика
  positive: "#ff4444", // для положительных изменений
  negative: "#00C851", // для отрицательных изменений
  neutral: "#666", // для нулевых изменений
};

export const WeeklyIncidentsChart = ({ incidents }) => {
  // Преобразуем объект инцидентов обратно в плоский массив
  const flattenIncidents = () => {
    if (!incidents) return [];
    return Object.values(incidents).flat();
  };

  // Группировка инцидентов по неделям
  const groupByWeek = (incidentsArray) => {
    const weeks = {};
    
    incidentsArray.forEach(incident => {
      const dateParts = incident.date.split('.');
      const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      const weekNumber = getWeekNumber(date);
      
      if (!weeks[weekNumber]) {
        weeks[weekNumber] = [];
      }
      weeks[weekNumber].push(incident);
    });
    
    return weeks;
  };

  // Остальные функции остаются без изменений
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const formatWeekLabel = (weekNumber, year) => {
    const firstDay = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);
    
    return `${formatDate(firstDay)}–${formatDate(lastDay)}`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).replace(/\s/g, '');
  };

  // Получаем данные
  const allIncidents = flattenIncidents();
  const weeklyData = groupByWeek(allIncidents);
  const weekNumbers = Object.keys(weeklyData).sort();
  const currentYear = new Date().getFullYear().toString().slice(-2);
  
  // Формируем labels и values для последних 2 недель
  const lastTwoWeeks = weekNumbers.slice(-2);
  const labels = lastTwoWeeks.map(week => 
    formatWeekLabel(parseInt(week), currentYear)
  );
  const values = lastTwoWeeks.map(week => weeklyData[week].length);

  // Расчет дельты (если есть данные для двух недель)
  const delta = values.length > 1 ? values[1] - values[0] : 0;
  const percentChange = values.length > 1 
    ? (values[0] === 0 ? 100 : Math.round((delta / values[0]) * 100))
    : 0;
  const color = percentChange > 0 ? chartColors.positive : 
               percentChange < 0 ? chartColors.negative : chartColors.neutral;
  const sign = percentChange > 0 ? '+' : percentChange < 0 ? '−' : '';

  const data = {
    labels: labels,
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
    <div style={{ position: 'relative', height: "10%" }}>
      <Bar 
        data={data} 
        options={commonChartOptions('Инциденты по неделям', 'Неделя')} 
        plugins={[ChartDataLabels]}
      />
      
      {values.length > 1 && (
        <div style={{ ...deltaLabelStyle, color }}>
          {sign}{Math.abs(percentChange)}%
        </div>
      )}
    </div>
  );
};