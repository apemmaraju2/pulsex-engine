import axios from "axios";

const API_BASE = "http://127.0.0.1:9000";

export async function fetchLatestSignal() {
  const res = await fetch(`${API_BASE}/signals/latest`);
  const raw = await res.json();

  console.log("API RAW:", raw);

  // ✅ Always normalize into array
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === "object") return [raw];
  return [];
}

export const fetchSignalHistory = async () => {
  const res = await axios.get(`${API_BASE}/signals/history`);
  return res.data;
};
