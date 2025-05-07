import React from 'react';
import './IncidentTable.css';

export const IncidentTable = () => {
  const data = [
    { date: '14.03.25', region: 'МОСК', station: 'ХРАПУНОВО', type: 'Наезд' },
    { date: '15.03.25', region: 'ПРИВ', station: 'КУРДЮМ', type: 'Сход при маневрах' },
    { date: '16.03.25', region: 'МОСК', station: 'ПЛАВСК', type: 'Сход при маневрах' },
    { date: '17.03.25', region: 'Ю-УР', station: 'ОРЕНБУРГ', type: 'Сход при маневрах' },
  ];

  return (
    <div className="incident-table">
      <h3>Инциденты за неделю</h3>
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
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.date}</td>
              <td>{row.region}</td>
              <td>{row.station}</td>
              <td>{row.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};