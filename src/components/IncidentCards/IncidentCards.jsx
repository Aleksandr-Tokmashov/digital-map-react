import React from "react";
import "./IncidentCards.css"; // Подключаем CSS для стилей

const incidents = [
  {
    date: "15.03.2025",
    location: "Чалганы-Ушумун",
    railway: "ЗАБ",
    status: "расследуется",
    cause: "Неправильное ведение поезда",
    type: "СХОДЫ В ПОЕЗДЕ",
    image: "path_to_image_1.jpg", // Добавьте путь к изображению
  },
  {
    date: "15.03.2025",
    location: "Чебаково-Ваулово",
    railway: "СЕВ",
    status: "расследован, отнесен не за ЦДИ",
    cause: "нарушение ПДД",
    responsible: "водитель ТС",
    type: "СХОДЫ В ПОЕЗДЕ",
    image: "path_to_image_2.jpg", // Добавьте путь к изображению
  },
  {
    date: "21.03.2025",
    location: "Кизилюрт",
    railway: "С-КАВ",
    status: "расследуется",
    cause: "Наезд на тормозной башмак",
    responsible: "ПЧ-16 Махачкала",
    type: "СХОДЫ В ПОЕЗДЕ",
    image: "path_to_image_3.jpg", // Добавьте путь к изображению
  },
  {
    date: "14.03.2025",
    location: "Храпуново",
    railway: "МОСК",
    status: "расследован, отнесен за ЦДИ",
    cause: "нарушение при складировании плит настила",
    responsible: "ПЧ-2 Моск-Горьковская",
    type: "НАЕЗД",
    image: "path_to_image_4.jpg", // Добавьте путь к изображению
  },
  {
    date: "15.03.2025",
    location: "Курдюм",
    railway: "ПРИВ",
    status: "расследован, отнесен за ЦДИ",
    cause: "Отступления по геометри рельсовой колеи",
    responsible: "ПЧ-2 Аткарская",
    type: "СХОДЫ ПРИ МАНЕВРАХ",
    image: "path_to_image_5.jpg", // Добавьте путь к изображению
  },
  {
    date: "15.03.2025",
    location: "Магнитогорск",
    railway: "Ю-УР",
    status: "расследован, отнесен не за ЦДИ",
    cause: "Не запирание стрелки на закладку и навесной замок",
    responsible: "ТЧЭ-5 Карталы I",
    type: "СХОДЫ ПРИ МАНЕВРАХ",
    image: "path_to_image_6.jpg", // Добавьте путь к изображению
  },
  {
    date: "16.03.2025",
    location: "Новосибирск",
    railway: "З-СИБ",
    status: "расследован, отнесен не за ЦДИ",
    cause: "Нарушение порядка маневровой работы",
    responsible: "ДС Новосибирск",
    type: "СХОДЫ ПРИ МАНЕВРАХ",
    image: "path_to_image_7.jpg", // Добавьте путь к изображению
  },
  {
    date: "17.03.2025",
    location: "Плавск",
    railway: "МОСК",
    status: "расследован, отнесен за ЦДИ",
    cause: "Кустовая негодность деревянных шпал",
    responsible: "ПЧ-21 Тульская",
    type: "СХОДЫ ПРИ МАНЕВРАХ",
    image: "path_to_image_8.jpg", // Добавьте путь к изображению
  },
  {
    date: "17.03.2025",
    location: "Оренбург",
    railway: "Ю-УР",
    status: "расследован, отнесен за ЦДИ",
    cause: "Уширение рельсовой колеи",
    responsible: "ПЧ-21 Оренбургская",
    type: "СХОДЫ ПРИ МАНЕВРАХ",
    image: "path_to_image_9.jpg", // Добавьте путь к изображению
  },
  {
    date: "19.03.2025",
    location: "Московка",
    railway: "З-СИБ",
    status: "расследуется",
    cause: "Заклинивание тележки вагона",
    type: "СХОДЫ ПРИ МАНЕВРАХ",
    image: "path_to_image_10.jpg", // Добавьте путь к изображению
  },
  {
    date: "17.03.2025",
    location: "Уссурийск",
    railway: "ДВОСТ",
    status: "расследуется",
    cause: "Вмешательство посторонних лиц",
    type: "САМОРАСЦЕП АВТОСЦЕПОК",
    image: "path_to_image_11.jpg", // Добавьте путь к изображению
  },
];

const IncidentCards = () => {
  const typeColors = {
    "СХОДЫ В ПОЕЗДЕ": "yellow",
    "СХОДЫ ПРИ МАНЕВРАХ": "orange",
    "НАЕЗД": "blue",
    "САМОРАСЦЕП АВТОСЦЕПОК": "green",
  };

  const getResponsibleColor = (status) => {
    return status === "расследован, отнесен за ЦДИ" ? "red" : "black";
  };

  const getCardBackgroundColor = (status) => {
    return status === "расследован, отнесен за ЦДИ" ? "white" : "#f0f0f0";
  };

  const groupIntoRows = () => {
    const rows = [];
    let currentRow = [];
    let currentTypesInRow = new Set();
    let currentWidth = 0;
    const maxWidth = 4;

    incidents.forEach((incident) => {
      if (
        currentWidth >= maxWidth ||
        (currentTypesInRow.has(incident.type) && currentTypesInRow.size > 1)
      ) {
        rows.push(currentRow);
        currentRow = [];
        currentTypesInRow = new Set();
        currentWidth = 0;
      }

      currentRow.push(incident);
      currentTypesInRow.add(incident.type);
      currentWidth++;
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  const rows = groupIntoRows();

  return (
    <div className="incidents-container">
      {rows.map((row, rowIndex) => {
        const typeGroups = row.reduce((groups, incident) => {
          if (!groups[incident.type]) {
            groups[incident.type] = [];
          }
          groups[incident.type].push(incident);
          return groups;
        }, {});

        return (
          <div key={rowIndex} className="incident-row">
            {Object.entries(typeGroups).map(([type, typeIncidents]) => (
              <div
                key={type}
                className="incident-type-group"
                style={{ "--type-color": typeColors[type] || "#ccc" }}
              >
                <h2 className="incident-type-header">{type}</h2>
                <div className="incident-cards-group">
                  {typeIncidents.map((incident, index) => (
                    <div
                      key={index}
                      className="incident-card"
                      style={{
                        backgroundColor: getCardBackgroundColor(
                          incident.status
                        ),
                      }}
                    >
                      <div className="incident-date">{incident.date}</div>
                      <div className="incident-location">
                        {incident.location}
                      </div>
                      <div className="incident-railway">{incident.railway}</div>

                      <div className="image-frame-container"></div>

                      {incident.status !== "расследуется" &&
                        incident.responsible && (
                          <div
                            className="incident-responsible"
                            style={{
                              color: getResponsibleColor(incident.status),
                            }}
                          >
                            {incident.responsible}
                          </div>
                        )}

                      {incident.status === "расследуется" && (
                        <div className="incident-status">расследуется</div>
                      )}

                      <div className="incident-cause">
                        <strong>
                          {incident.status === "расследуется"
                            ? "Причина:"
                            : "Предв. причина:"}
                        </strong>{" "}
                        {incident.cause}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default IncidentCards;