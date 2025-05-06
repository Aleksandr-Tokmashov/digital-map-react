import { WeeklyIncidentsChart } from "./charts/WeeklyIncidentsChart"
import { IncidentTypePieChart } from "./charts/IncidentTypePieChart"
import { IncidentGrowthChart } from "./charts/IncindentBarChart"
import { IncidentTable } from "./charts/IncidentTable"
import { ComparativePieChart } from "./charts/ComprativePieChart"
import IncidentCards from "./cards/IncidentCards"

function App() {
  return (
    <>
      <WeeklyIncidentsChart></WeeklyIncidentsChart>
      <IncidentTypePieChart></IncidentTypePieChart>
      <IncidentGrowthChart></IncidentGrowthChart>
      <IncidentTable></IncidentTable>
      <ComparativePieChart></ComparativePieChart>
      <IncidentCards></IncidentCards>
    </>
  )
}

export default App
