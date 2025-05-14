import { WeeklyIncidentsChart } from "../Charts/WeeklyIncidentsChart";
import { IncidentTypePieChart } from "../Charts/IncidentTypePieChart";
import { IncidentGrowthChart } from "../Charts/IncindentBarChart";
import { IncidentTable } from "../IncidentTable/IncidentTable";
import { ComparativePieChart } from "../Charts/ComprativePieChart";
import { fetchIncidents } from "../../api";
import { useEffect, useState } from "react";
import IncidentCards from "../IncidentCards/IncidentCards";
import Map from "../../assets/map.svg?react";
import "./App.css";

function App() {
  const [incidents, setIncidents] = useState([]);
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
        setIncidents(data);
      } catch (error) {
        console.error("Failed to load incidents:", error);
      }
    };

    loadIncidents();
  }, []);

  return (
    <div className="app-container">
      <div className="charts-container">
        <WeeklyIncidentsChart></WeeklyIncidentsChart>
        <IncidentTypePieChart></IncidentTypePieChart>
        <IncidentGrowthChart></IncidentGrowthChart>
        <IncidentTable></IncidentTable>
        <ComparativePieChart></ComparativePieChart>
        <div>
          <Map className="custom-map"  />
        </div>
      </div>
      <IncidentCards
        incidents={incidents}
        typeColors={typeColors}
      ></IncidentCards>
    </div>
  );
}

export default App;
