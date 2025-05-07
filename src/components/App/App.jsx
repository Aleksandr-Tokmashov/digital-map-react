import { WeeklyIncidentsChart } from "../Charts/WeeklyIncidentsChart";
import { IncidentTypePieChart } from "../Charts/IncidentTypePieChart";
import { IncidentGrowthChart } from "../Charts/IncindentBarChart";
import { IncidentTable } from "../IncidentTable/IncidentTable";
import { ComparativePieChart } from "../Charts/ComprativePieChart";
import IncidentCards from "../IncidentCards/IncidentCards";
import Map from "../../assets/map.svg?react";
import "./App.css";

function App() {
  return (
    <>
      <WeeklyIncidentsChart></WeeklyIncidentsChart>
      <IncidentTypePieChart></IncidentTypePieChart>
      <IncidentGrowthChart></IncidentGrowthChart>
      <IncidentTable></IncidentTable>
      <ComparativePieChart></ComparativePieChart>
      <IncidentCards></IncidentCards>
      <div>
        <Map className="custom-map" />
      </div>
    </>
  );
}

export default App;
