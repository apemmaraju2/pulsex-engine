import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function SignalChart({ data, visible }) {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="timestamp" hide />
        <YAxis stroke="#aaa" />
        <Tooltip />

        {visible.pressure && (
          <Line
            type="monotone"
            dataKey="mempool_pressure"
            stroke="#2ef2c8"
            dot={false}
            strokeWidth={2}
          />
        )}

        {visible.gas && (
          <Line
            type="monotone"
            dataKey="gas_spike_index"
            stroke="#f5c84b"
            dot={false}
            strokeWidth={2}
          />
        )}

        {visible.velocity && (
          <Line
            type="monotone"
            dataKey="tx_velocity"
            stroke="#4da3ff"
            dot={false}
            strokeWidth={2}
          />
        )}

        {visible.tx && (
          <Line
            type="monotone"
            dataKey="tx_count"
            stroke="#ff5c5c"
            dot={false}
            strokeWidth={2}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
