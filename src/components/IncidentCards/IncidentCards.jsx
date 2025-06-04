import React from "react";
import "./IncidentCards.css";

const IncidentCards = ({ incidentsByType = {}, typeColors = {} }) => {
  const getResponsibleColor = (status) => {
    return status === "расследован, отнесен за ЦДИ" ? "red" : "black";
  };

  const getCardBackgroundColor = (status) => {
    return status === "расследован, отнесен за ЦДИ" ? "white" : "#f0f0f0";
  };

  if (Object.keys(incidentsByType).length === 0) {
    return <div className="no-incidents">Нет данных об инцидентах</div>;
  }

  // Создаем массив групп карточек по типам
  const typeGroups = Object.entries(incidentsByType).map(([type, incidents]) => ({
    type,
    incidents,
    color: typeColors[type] || "#BFC5CE"
  }));

  // Создаем плоский массив всех карточек с информацией о группе
  const allCards = [];
  typeGroups.forEach(group => {
    group.incidents.forEach((incident, index) => {
      allCards.push({
        ...incident,
        groupType: group.type,
        groupColor: group.color,
        isFirstInGroup: index === 0
      });
    });
  });

  // Разбиваем на строки по 4 карточки
  const rows = [];
  for (let i = 0; i < allCards.length; i += 4) {
    rows.push(allCards.slice(i, i + 4));
  }

  // Функция для определения, нужно ли показывать заголовок группы в этой строке
  const shouldShowHeader = (row, groupType) => {
    // Находим первую карточку этой группы в строке
    const firstInRow = row.find(card => card.groupType === groupType);
    if (!firstInRow) return false;
    
    // Проверяем, является ли она первой в группе или предыдущая карточка группы в другой строке
    return firstInRow.isFirstInGroup || 
           !rows.some(r => r.includes(firstInRow) && r.indexOf(firstInRow) > 0);
  };

  return (
    <div className="incidents-container">
      {rows.map((row, rowIndex) => {
        // Создаем массив ячеек заголовков с учетом отступов
        const headerCells = [];
        let currentGroup = null;
        let groupStartIndex = 0;

        row.forEach((card, index) => {
          if (currentGroup !== card.groupType) {
            // Если предыдущая группа существует, добавляем ее заголовок
            if (currentGroup !== null) {
              const groupColor = typeColors[currentGroup] || "#BFC5CE";
              headerCells.push(
                <div
                  key={`${currentGroup}-${groupStartIndex}`}
                  className="header-cell"
                  style={{
                    width: `calc(${(index - groupStartIndex) * 25}% `,
                    marginRight: index < row.length ? "10px" : "0",
                    boxSizing: 'c'
                  }}
                >
                  {shouldShowHeader(row, currentGroup) && (
                    <h2 className="incident-type-header" style={{ "--type-color": groupColor }}>
                      {currentGroup}
                    </h2>
                  )}
                </div>
              );
            }
            currentGroup = card.groupType;
            groupStartIndex = index;
          }
        });

        // Добавляем последнюю группу
        if (currentGroup !== null) {
          const groupColor = typeColors[currentGroup] || "#BFC5CE";
          headerCells.push(
            <div
              key={`${currentGroup}-${groupStartIndex}-end`}
              className="header-cell"
              style={{
                width: `calc(${(row.length - groupStartIndex) * 25}% - ${(row.length - groupStartIndex - 1) * 10}px)`
              }}
            >
              {shouldShowHeader(row, currentGroup) && (
                <h2 className="incident-type-header" style={{ "--type-color": groupColor }}>
                  {currentGroup}
                </h2>
              )}
            </div>
          );
        }

        return (
          <React.Fragment key={rowIndex}>
            {/* Строка заголовков с правильными отступами */}
            <div className="headers-row">{headerCells}</div>
            
            {/* Строка карточек (остается без изменений) */}
            <div className="cards-row">
              {row.map((card, cardIndex) => (
                <div
                  key={`${card.groupType}-${cardIndex}-${rowIndex}`}
                  className="incident-card"
                  style={{
                    backgroundColor: getCardBackgroundColor(card.status),
                    flex: "1",
                    minWidth: "0",
                    marginRight: cardIndex < row.length - 1 ? "10px" : "0"
                  }}
                >
                  <div className="incident-date">{card.date}</div>
                  <div className="incident-location">{card.location}</div>
                  <div className="incident-railway">{card.railway}</div>
                  <div className="image-frame-container"></div>
                  {card.status !== "расследуется" && card.responsible && (
                    <div
                      className="incident-responsible"
                      style={{ color: getResponsibleColor(card.status) }}
                    >
                      {card.responsible}
                    </div>
                  )}
                  {card.status === "расследуется" && (
                    <div className="incident-status">расследуется</div>
                  )}
                  <div className="incident-cause">
                    <strong>
                      {card.status === "расследуется"
                        ? "Причина:"
                        : "Предв. причина:"}
                    </strong>{" "}
                    {card.cause}
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default IncidentCards;