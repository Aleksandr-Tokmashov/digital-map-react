import { WeeklyIncidentsChart } from "../Charts/WeeklyIncidentsChart";
import { IncidentTypePieChart } from "../Charts/IncidentTypePieChart";
import { IncidentGrowthChart } from "../Charts/IncindentBarChart";
import { IncidentTable } from "../IncidentTable/IncidentTable";
import { ComparativePieChart } from "../Charts/ComprativePieChart";
import { useEffect, useState } from "react";
import { fetchIncidents } from "../../utils/api";
import { getIncidentsByType, getIncidentsLastWeek, getIncidentsSlice } from "../../utils/utils";
import IncidentCards from "../IncidentCards/IncidentCards";
import Map from "../../assets/map.svg?react";
import "./App.css";

function App() {
  const [incidents, setIncidents] = useState([]);
  const [incidentsByTypeSlice, setIncidentsByTypeSlice] = useState([]);
  const typeColors = {
    "СХОДЫ В ПОЕЗДЕ": "#FDC07C",
    "СХОДЫ ПРИ МАНЕВРАХ": "#FFE699",
    "ИЗЛОМЫ РЕЛЬСОВ": "#2F87B6",
    "САМОРАСЦЕП АВТОСЦЕПОК": "#2F87B6",
  };

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const data = await fetchIncidents();
        const lastWeekIncidents = getIncidentsLastWeek(data, false)
        const incidentsByType = getIncidentsByType(lastWeekIncidents)
        setIncidents(data);
        setIncidentsByTypeSlice(getIncidentsSlice(incidentsByType));
      } catch (error) {
        console.error("Failed to load incidents:", error);
      }
    };

    loadIncidents();
  }, []);

  return (
    <div className="app-container">
      <div className="charts-container">
        <WeeklyIncidentsChart incidents={incidents}></WeeklyIncidentsChart>
        <IncidentTypePieChart incidents={incidents} typeColors={typeColors} is isTestData={true}></IncidentTypePieChart>
        <IncidentGrowthChart incidents={incidents} isTestData={true}></IncidentGrowthChart>
        <IncidentTable incidents={incidents}></IncidentTable>
        <ComparativePieChart incidents={incidents} typeColors={typeColors} isTestData={true}></ComparativePieChart>
        <div>
          <Map className="custom-map"  />
        </div>
      </div>
      <IncidentCards
        incidentsByType={incidentsByTypeSlice}
        typeColors={typeColors}
      ></IncidentCards>
    </div>
  );
}

export default App;
