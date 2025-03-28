import React from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import styles from '../styles/Dashboard.module.css';

const Dashboard: React.FC = () => {
  // Mock data - replace with actual data from backend/Redux
  const eggProductionData = [
    { date: '2024-03-01', eggs: 450, target: 500 },
    { date: '2024-03-02', eggs: 475, target: 500 },
    { date: '2024-03-03', eggs: 520, target: 500 },
  ];

  const feedInventoryData = [
    { type: 'Layer Feed', current: 500, low: 200 },
    { type: 'Starter Feed', current: 350, low: 150 },
  ];

  const medicationData = [
    {
      medication: 'Newcastle Vaccine',
      lastAdministered: '2024-02-15',
      nextDue: '2024-04-15'
    },
  ];

  return (
    <div className={`p-6 space-y-6 ${styles.dashboardContainer}`}>
      <h1 className="text-3xl font-bold">Farm Dashboard</h1>

      {/* Egg Production Card */}
      <Card className={styles.chartContainer}>
        <CardHeader>
          <CardTitle>Egg Production Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={eggProductionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="eggs" stroke="#8884d8" />
              <Line type="monotone" dataKey="target" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Feed Inventory Card */}
      <Card>
        <CardHeader>
          <CardTitle>Feed Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          {feedInventoryData.map((feed) => (
            <div
              key={feed.type}
              className={`p-4 mb-2 rounded ${styles.inventoryItem} ${feed.current < feed.low ? 'bg-red-100' : 'bg-green-100'}`}
            >
              <h3 className="font-semibold">{feed.type}</h3>
              <p>Current Stock: {feed.current} kg</p>
              {feed.current < feed.low && (
                <p className={`text-red-600 font-bold ${styles.lowStockPulse}`}>
                  Low Stock Alert!
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Medication Tracking Card */}
      <Card>
        <CardHeader>
          <CardTitle>Medication Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <table className={`w-full ${styles.medicationTable}`}>
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Medication</th>
                <th className="p-2 text-left">Last Administered</th>
                <th className="p-2 text-left">Next Due</th>
              </tr>
            </thead>
            <tbody>
              {medicationData.map((med) => (
                <tr key={med.medication} className="border-b">
                  <td className="p-2">{med.medication}</td>
                  <td className="p-2">{med.lastAdministered}</td>
                  <td className="p-2">{med.nextDue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;