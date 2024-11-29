import { Analytics } from "@vercel/analytics/react";
import KanbanBoard from "./components/KanbanBoard";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <div>
      <KanbanBoard />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
