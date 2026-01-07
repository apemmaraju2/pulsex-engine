import { useEffect, useState } from "react";
import SignalChart from "./components/SignalChart";
import "./index.css";

const API_URL = "http://127.0.0.1:9000/signals/latest";

export default function App() {
  const [signals, setSignals] = useState([]);
  const [latest, setLatest] = useState({});
  const [visible, setVisible] = useState({
    pressure: true,
    gas: true,
    velocity: true,
    tx: false,
  });

  async function loadSignals() {
    try {
      const res = await fetch(API_URL);
      const raw = await res.json();

      // Ensure array
      const data = Array.isArray(raw) ? raw : [raw];

      const formatted = data.map(d => ({
        ...d,
        timestamp: new Date(d.timestamp).toLocaleTimeString(),
      }));

      setSignals(formatted);
      setLatest(formatted[formatted.length - 1] || {});
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }

  useEffect(() => {
    loadSignals();
    const id = setInterval(loadSignals, 3000);
    return () => clearInterval(id);
  }, []);

  function toggle(key) {
    setVisible(v => ({ ...v, [key]: !v[key] }));
  }

  return (
    <div className="app">
      <h1>⚡ PulseX Live Dashboard</h1>

      <div className="cards">
        <Card
          label="Tx Count"
          value={latest.tx_count}
          active={visible.tx}
          onClick={() => toggle("tx")}
        />

        <Card
          label="Gas Spike"
          value={latest.gas_spike_index}
          active={visible.gas}
          onClick={() => toggle("gas")}
        />

        <Card
          label="Velocity"
          value={latest.tx_velocity}
          active={visible.velocity}
          onClick={() => toggle("velocity")}
        />

        <Card
          label="Pressure"
          value={latest.mempool_pressure}
          active={visible.pressure}
          onClick={() => toggle("pressure")}
        />
      </div>

      <div className="chart">
        <SignalChart data={signals} visible={visible} />
      </div>
    </div>
  );
}

function Card({ label, value, active, onClick }) {
  return (
    <div
      className={`card ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <p>{label}</p>
      <h2>{value ?? "--"}</h2>
    </div>
  );
}
