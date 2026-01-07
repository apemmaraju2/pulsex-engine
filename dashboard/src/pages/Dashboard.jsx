import { useEffect, useState } from "react";
import { fetchLatestSignal, fetchSignalHistory } from "../api/signals";
import SignalChart from "../components/SignalChart";

export default function Dashboard() {
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);

  const load = async () => {
    try {
      const latestData = await fetchLatestSignal();
      const historyData = await fetchSignalHistory();
      setLatest(latestData);
      setHistory(historyData.reverse());
    } catch (err) {
      console.error("API error", err);
    }
  };

  useEffect(() => {
    load();
    const timer = setInterval(load, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>⚡ PulseX Live Dashboard</h1>

      {latest && (
        <div style={{ display: "flex", gap: 30, marginBottom: 30 }}>
          <Metric label="Tx Count" value={latest.tx_count} />
          <Metric label="Gas Spike" value={latest.gas_spike_index} />
          <Metric label="Velocity" value={latest.tx_velocity} />
          <Metric label="Pressure" value={latest.mempool_pressure} />
        </div>
      )}

      <SignalChart data={history} />
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        background: "#111",
        color: "white",
        minWidth: 150,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 14, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: "bold" }}>{value}</div>
    </div>
  );
}
