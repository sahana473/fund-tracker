import { Stack, Typography } from "@mui/material";
import "./App.css";
import ProjectTable from "./ProjectTable.jsx";

function App() {
  return (
    <div className="App">
      <Stack className="mt-20">
        <Typography
          variant="h4"
          className="text-3xl font-bold text-center animate-fade-in mb-2 text-blue-600"
        >
          Fund Tracker
        </Typography>
        <div className="mt-0">
          <ProjectTable />
        </div>
      </Stack>
    </div>
  );
}

export default App;
