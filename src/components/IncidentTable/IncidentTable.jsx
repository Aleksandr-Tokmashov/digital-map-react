import React from 'react';
import './IncidentTable.css';

export const IncidentTable = ({ incidents, isTestData = false }) => {
  // Функция для форматирования даты (день.месяц.год)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('.');
    return `${day}.${month}.${year.slice(-2)}`;
  };

  // Функция для получения типа инцидента в читаемом формате
  const getIncidentType = (type) => {
    const typeMap = {
      'СХОДЫ В ПОЕЗДЕ': 'Сход в поезде',
      'СХОДЫ ПРИ МАНЕВРАХ': 'Сход при маневрах',
      'ИЗЛОМЫ РЕЛЬСОВ': 'Излом рельса',
      'САМОРАСЦЕП АВТОСЦЕПОК': 'Саморасцеп автосцепок',
      'НАЕЗД': 'Наезд'
    };
    return typeMap[type] || type;
  };

  // Подготовка данных
  let tableData = [];
  
  if (isTestData) {
    // Тестовые данные
    tableData = [
      { date: '14.03.25', region: 'МОСК', station: 'ХРАПУНОВО', type: 'Наезд' },
      { date: '15.03.25', region: 'ПРИВ', station: 'КУРДЮМ', type: 'Сход при маневрах' },
      { date: '16.03.25', region: 'МОСК', station: 'ПЛАВСК', type: 'Сход при маневрах' },
      { date: '17.03.25', region: 'Ю-УР', station: 'ОРЕНБУРГ', type: 'Сход при маневрах' },
    ];
  } else {
    // Преобразование реальных данных
    tableData = incidents ? Object.values(incidents).flat().map(incident => ({
      date: formatDate(incident.date),
      region: incident.railway,
      station: incident.location,
      type: getIncidentType(incident.type)
    })) : [];
  }

  // Ограничиваем количество строк (например, последние 10 инцидентов)
  const displayedData = tableData.slice(0, 10);

  return (
    <div className="incident-table">
      <h3>Последние инциденты</h3>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Дорога</th>
            <th>Станция</th>
            <th>Тип инцидента</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.length > 0 ? (
            displayedData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.date}</td>
                <td>{row.region}</td>
                <td>{row.station}</td>
                <td>{row.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                Нет данных об инцидентах
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};