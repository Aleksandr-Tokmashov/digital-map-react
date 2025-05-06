
import { PlotlyChart } from "./charts/PlotlyChart" 
import { WeeklyIncidentsChart } from "./charts/WeeklyIncidentsChart"
import { IncidentTypePieChart } from "./charts/IncidentTypePieChart"
import { IncidentGrowthChart } from "./charts/IncindentBarChart"
import { IncidentTable } from "./charts/IncidentTable"
import { ComparativePieChart } from "./charts/ComprativePieChart"

function App() {
  return (
    <>
      <PlotlyChart></PlotlyChart>
      <PlotlyChart></PlotlyChart>
      <WeeklyIncidentsChart></WeeklyIncidentsChart>
      <IncidentTypePieChart></IncidentTypePieChart>
      <IncidentGrowthChart></IncidentGrowthChart>
      <IncidentTable></IncidentTable>
      <ComparativePieChart></ComparativePieChart>
    </>
  )
}

export default App
