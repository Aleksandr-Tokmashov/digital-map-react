import React from "react";
import "./IncidentCards.css";

const IncidentCards = ({ incidents, typeColors }) => {
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
                style={{ "--type-color": typeColors[type] || "#FFE699" }}
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