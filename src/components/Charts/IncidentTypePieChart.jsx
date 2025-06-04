import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const IncidentTypePieChart = ({ incidents, isTestData = false, typeColors }) => {
  // Группировка инцидентов по типам
  const groupByType = (incidentsArray) => {
    const types = {};
    
    incidentsArray.forEach(incident => {
      if (!types[incident.type]) {
        types[incident.type] = 0;
      }
      types[incident.type]++;
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
  const currentYearData = groupByType(allIncidents);
  
  // Определяем категории на основе реальных данных
  const categories = Object.keys(currentYearData);
  const otherCategories = ['СХОДЫ В ПОЕЗДЕ', 'СХОДЫ ПРИ МАНЕВРАХ', 'ИЗЛОМЫ РЕЛЬСОВ', 'САМОРАСЦЕП АВТОСЦЕПОК', 'НАЕЗД', 'ПРОЧЕЕ'];
  
  // Объединяем реальные категории с базовыми
  const allCategories = [...new Set([...categories, ...otherCategories])];

  // Подготавливаем данные для текущего года
  const currentValues = allCategories.map(cat => currentYearData[cat] || 0);
  
  // Для тестовых данных создаем фиктивные значения прошлого года
  const prevYearValues = isTestData 
    ? allCategories.map(() => Math.floor(Math.random() * 3) + 1)
    : allCategories.map(() => 0);

  // Рассчитываем изменения
  const changes = currentValues.map((val, i) => {
    const prev = prevYearValues[i];
    if (prev === 0) return val === 0 ? 0 : 100;
    return Math.round(((val - prev) / prev) * 100);
  });

  const totalCurrent = currentValues.reduce((a, b) => a + b, 0);
  const totalPrev = prevYearValues.reduce((a, b) => a + b, 0);
  const deltaTotal = totalCurrent - totalPrev;
  const deltaPercent = totalPrev === 0 ? 100 : Math.round((deltaTotal / totalPrev) * 100);

  const deltaColor = deltaPercent > 0 ? '#ff4444' : deltaPercent < 0 ? '#00C851' : '#666';

  // Используем цвета из typeColors с fallback значениями
  const backgroundColors = allCategories.map(cat => 
    typeColors[cat] || 
    (cat === 'СХОДЫ В ПОЕЗДЕ' ? '#FDC07C' :
     cat === 'СХОДЫ ПРИ МАНЕВРАХ' ? '#FFE699' :
     cat === 'ИЗЛОМЫ РЕЛЬСОВ' ? '#2F87B6' :
     cat === 'САМОРАСЦЕП АВТОСЦЕПОК' ? '#2F87B6' :
     cat === 'НАЕЗД' ? '#FF7043' : '#AB47BC')
  );

  const data = {
    labels: allCategories,
    datasets: [
      {
        data: currentValues,
        backgroundColor: backgroundColors,
        borderWidth: 1,
        borderColor: '#fff'
      },
    ],
  };

  const options = {
    animation: {
      animateScale: true,
      animateRotate: true
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        },
        callbacks: {
          label: (tooltipItem) => {
            const val = currentValues[tooltipItem.dataIndex];
            const prev = prevYearValues[tooltipItem.dataIndex];
            const percentage = ((val / totalCurrent) * 100).toFixed(1);
            return [
              `${allCategories[tooltipItem.dataIndex]}:`,
              `2025: ${val} (${percentage}%)`,
              `2024: ${prev}`,
              `Изменение: ${changes[tooltipItem.dataIndex]}%`
            ];
          },
        },
      },
      datalabels: {
        color: '#fff',
        font: {
          size: 12,
          weight: 'bold',
        },
        formatter: (value) => (value > 0 ? ((value / totalCurrent) * 100).toFixed(1) + '%' : ''),
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        anchor: 'center',
        align: 'center'
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
    cutout: '65%'
  };

  const getLegendLabels = () => {
    return allCategories.map((label, index) => {
      const change = changes[index];
      const changeColor = change > 0 ? '#ff4444' : change < 0 ? '#00C851' : '#666';
      const changeSign = change > 0 ? '+' : '';
      
      return (
        <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
          <div style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: backgroundColors[index],
            marginRight: '8px'
          }} />
          <div style={{ color: '#333', fontSize: '14px' }}>
            {label}: {currentValues[index]}/{prevYearValues[index]} (
            <span style={{ color: changeColor, fontSize: '13px' }}>
              {changeSign}{change}%
            </span>)
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ 
      position: 'relative', 
      display: 'flex',
      height: "16%",
    }}>
      <div style={{ flex: 1 }}>
        <Pie 
          data={data} 
          options={options} 
          plugins={[ChartDataLabels]}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{ 
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            {totalCurrent}
          </div>
          <div style={{ 
            fontSize: '14px',
            color: deltaColor,
            marginTop: '4px'
          }}>
            {deltaTotal > 0 ? '+' : ''}{deltaTotal} ({deltaPercent}%)
          </div>
          <div style={{
            fontSize: '12px',
            color: '#666',
            marginTop: '4px'
          }}>
            vs {totalPrev} в 2024
          </div>
        </div>
      </div>
      
      <div style={{
        width: '350px',
        padding: '10px',
        overflowY: 'auto',
        marginLeft: '20px'
      }}>
        <div style={{ 
          fontWeight: 'bold', 
          marginBottom: '10px',
          fontSize: '16px'
        }}>
          Статистика по типам инцидентов
        </div>
        {getLegendLabels()}
      </div>
    </div>
  );
};