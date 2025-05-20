"use client";

import { useState } from "react";

export default function ConfigurationPage() {
  const [settings, setSettings] = useState({
    initialInterventionLength: 5,
    secondInterventionLength: 10,
    watchTimeIncrease: 3,
    timeBetweenInterventions: 5,
    waitTimeDecrease: 2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving settings:", settings);
    // Add save logic here (e.g. API call or localStorage)
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Configuration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          {
            label: "Length of initial intervention (seconds)",
            name: "initialInterventionLength",
          },
          {
            label: "Length of second intervention (seconds)",
            name: "secondInterventionLength",
          },
          {
            label:
              "Increase in required watch time after each intervention (seconds)",
            name: "watchTimeIncrease",
          },
          {
            label:
              "Time between initial intervention and second intervention (minutes)",
            name: "timeBetweenInterventions",
          },
          {
            label: "Decrease in wait time after each intervention (seconds)",
            name: "waitTimeDecrease",
          },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block font-medium mb-1" htmlFor={name}>
              {label}
            </label>
            <input
              type="number"
              name={name}
              id={name}
              value={settings[name as keyof typeof settings]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min={0}
            />
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
