import Stats from "../components/dashboard/statdata";

function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {/* Just render the Stats component */}
      <div className="grid grid-cols-2 gap-4">
        <Stats />
      </div>
    </div>
  );
}

export default Dashboard;
