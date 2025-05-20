"use client";

import { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Dummy data: 4 weeks of usage (in minutes)
const usageData = [
  { date: "Apr 15", Facebook: 34, Instagram: 29, YouTube: 41 },
  { date: "Apr 16", Facebook: 31, Instagram: 27, YouTube: 42 },
  { date: "Apr 17", Facebook: 29, Instagram: 26, YouTube: 40 },
  { date: "Apr 18", Facebook: 30, Instagram: 25, YouTube: 39 },
  { date: "Apr 19", Facebook: 28, Instagram: 24, YouTube: 37 },
  { date: "Apr 20", Facebook: 27, Instagram: 24, YouTube: 36 },
  { date: "Apr 21", Facebook: 28, Instagram: 23, YouTube: 35 },
  { date: "Apr 22", Facebook: 26, Instagram: 22, YouTube: 33 },
  { date: "Apr 23", Facebook: 23, Instagram: 21, YouTube: 32 },
  { date: "Apr 24", Facebook: 22, Instagram: 20, YouTube: 30 },
  { date: "Apr 25", Facebook: 21, Instagram: 19, YouTube: 29 },
  { date: "Apr 26", Facebook: 21, Instagram: 18, YouTube: 28 },
  { date: "Apr 27", Facebook: 20, Instagram: 18, YouTube: 28 },
  { date: "Apr 28", Facebook: 19, Instagram: 17, YouTube: 27 },
];

// Dummy table data for demonstration
const beforeAfterTableData = [
  ["Facebook", 28, 6.3, 22, 5.1, "↓ 21%", "↓ 19%"],
  ["Instagram", 35, 7.4, 31, 6.8, "↓ 11%", "↓ 8%"],
  ["YouTube", 52, 8.2, 45, 7.4, "↓ 13%", "↓ 10%"],
  ["Overall", 115, 7.3, 98, 6.4, "↓ 15%", "↓ 12%"],
];

const interventionMetricsData = [
  ["Facebook", 14, 4, "28.6%", "1.4"],
  ["Instagram", 12, 5, "41.7%", "2.1"],
  ["YouTube", 10, 2, "20.0%", "1.2"],
  ["Overall", 36, 11, "30.6%", "1.6"],
];

type ParticipantStatus = "Not ready" | "Ready" | "Healthy" | "Error";

const participants = [
  { id: "P001", battery: 87, status: "Healthy" },
  { id: "P002", battery: 52, status: "Ready" },
  { id: "P003", battery: 31, status: "Not ready" },
  { id: "P004", battery: 76, status: "Error" },
];

function StatusBadge({ status }: { status: ParticipantStatus }) {
  const colors = {
    Healthy: "bg-green-700 text-white",
    Ready: "bg-green-300 text-green-800",
    "Not ready": "bg-yellow-300 text-yellow-800",
    Error: "bg-red-500 text-white",
  };
  return (
    <span className={`px-2 py-1 text-sm rounded font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded p-6 space-y-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-red-600">↓ 11%</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Average change in overall phone usage
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {beforeAfterTableData.slice(0, 3).map(([app], i) => (
              <div key={app} className="border rounded p-4">
                <p className="text-xl font-bold text-red-600">
                  ↓ {i === 0 ? 9 : i === 1 ? 13 : 11}%
                </p>
                <p className="text-gray-700 dark:text-gray-300">{app}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded p-6 flex flex-col items-center justify-center">
          <p className="text-5xl font-bold text-green-600">100%</p>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-lg">
            Healthy Phones
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Participant Devices</h2>
        {participants.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-800 border rounded shadow"
          >
            <button
              className="w-full text-left px-4 py-3 flex justify-between items-center"
              onClick={() => setOpen(open === p.id ? null : p.id)}
            >
              <span className="font-medium text-black dark:text-white">
                {p.id} —{" "}
                <span className="text-gray-700 dark:text-gray-300">
                  🔋 {p.battery}%
                </span>{" "}
                —
                <span className="text-gray-600 dark:text-gray-400 italic">
                  {" "}
                  ⏱ Last sync: Today @ 9:14 AM
                </span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  Connection Status:
                </span>
                <StatusBadge status={p.status as ParticipantStatus} />
              </div>
            </button>
            {open === p.id && (
              <div className="border-t py-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="w-full h-[320px] flex items-center">
                  <div className="w-full">
                    <h3 className="font-semibold mb-2 text-center">
                      Daily Screen Time History
                    </h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={usageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis
                          label={{
                            value: "Minutes",
                            angle: -90,
                            position: "insideLeft",
                            offset: 10,
                          }}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="Facebook"
                          stroke="#3b82f6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="Instagram"
                          stroke="#ec4899"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="YouTube"
                          stroke="#facc15"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">
                      Before vs After App Usage (Daily Avg & Session Avg)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border rounded overflow-hidden">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                            <th className="p-2 align-bottom" rowSpan={2}>
                              App
                            </th>
                            <th className="p-2 text-center" colSpan={2}>
                              Before
                            </th>
                            <th className="p-2 text-center" colSpan={2}>
                              After
                            </th>
                            <th className="p-2 text-center" colSpan={2}>
                              Change
                            </th>
                          </tr>
                          <tr className="bg-gray-200 dark:bg-gray-600 text-left">
                            <th className="p-2">Daily Avg</th>
                            <th className="p-2">Session Avg</th>
                            <th className="p-2">Daily Avg</th>
                            <th className="p-2">Session Avg</th>
                            <th className="p-2">Daily Δ</th>
                            <th className="p-2">Session Δ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {beforeAfterTableData.map(
                            ([
                              app,
                              beforeD,
                              beforeS,
                              afterD,
                              afterS,
                              changeD,
                              changeS,
                            ]) => (
                              <tr
                                key={app}
                                className={`border-t ${
                                  app === "Overall"
                                    ? "font-semibold bg-gray-50 dark:bg-gray-700"
                                    : ""
                                }`}
                              >
                                <td className="p-2">{app}</td>
                                <td className="p-2">{beforeD} min</td>
                                <td className="p-2">{beforeS} min</td>
                                <td className="p-2">{afterD} min</td>
                                <td className="p-2">{afterS} min</td>
                                <td className="p-2">{changeD}</td>
                                <td className="p-2">{changeS}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Intervention Metrics</h3>
                    <table className="w-full text-sm border rounded overflow-hidden">
                      <thead>
                        <tr className="bg-gray-200 dark:bg-gray-600 text-left">
                          <th className="p-2">App</th>
                          <th className="p-2">Taps on App</th>
                          <th className="p-2">Gave Up During Delay</th>
                          <th className="p-2">Abandonment Rate</th>
                          <th className="p-2">Interruption to Exit Ratio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {interventionMetricsData.map(
                          ([app, taps, gaveUp, rate, ratio]) => (
                            <tr
                              key={app}
                              className={`border-t ${
                                app === "Overall"
                                  ? "font-semibold bg-gray-50 dark:bg-gray-700"
                                  : ""
                              }`}
                            >
                              <td className="p-2">{app}</td>
                              <td className="p-2">{taps}</td>
                              <td className="p-2">{gaveUp}</td>
                              <td className="p-2">{rate}</td>
                              <td className="p-2">{ratio}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
