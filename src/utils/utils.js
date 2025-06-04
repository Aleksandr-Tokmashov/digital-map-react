export function getIncidentsLastWeek(dataArray, isRealData = true) {
  let lastWeekStart, lastWeekEnd;

  if (isRealData) {
    const now = new Date();
    lastWeekEnd = new Date(now);
    lastWeekStart = new Date(now);
    lastWeekStart.setDate(lastWeekEnd.getDate() - 7);
  }

  const incidentds = dataArray.filter((item) => {
    const incidentDate = new Date(item.date.split(".").reverse().join("-"));
    return (
      !isRealData ||
      (incidentDate >= lastWeekStart && incidentDate <= lastWeekEnd)
    );
  });

  return incidentds;
}

export function getIncidentsByType(incidents) {
  let incidentsByType = {};

  incidents.forEach(incident => {
    const { type, ...incidentWithoutType } = incident;

    if (!incidentsByType[type]) {
      incidentsByType[type] = [];
    }

    incidentsByType[type].push(incidentWithoutType);
  });

  return incidentsByType;
}

export function getIncidentsSlice(incidentsByType, maxSize = 12) {
  let incidentsSlice = {};
  const types = Object.keys(incidentsByType);
  
  if (types.length >= maxSize) {
    for (const type of types) {
      incidentsSlice[type] = incidentsByType[type].slice(0, 1);
    }
    return incidentsSlice;
  }
  
  for (const type of types) {
    incidentsSlice[type] = incidentsByType[type].slice(0, 1);
  }
  
  let allocated = types.length;
  let remainingIncidents = {};
  
  for (const type of types) {
    if (incidentsByType[type].length > 1) {
      remainingIncidents[type] = incidentsByType[type].slice(1);
    }
  }
  
  while (allocated < maxSize && Object.keys(remainingIncidents).length > 0) {
    for (const type of types) {
      if (remainingIncidents[type] && remainingIncidents[type].length > 0) {
        incidentsSlice[type].push(remainingIncidents[type].shift());
        allocated++;
        
        if (allocated >= maxSize) break;
        if (remainingIncidents[type].length === 0) {
          delete remainingIncidents[type];
        }
      }
    }
  }
  
  return incidentsSlice;
}