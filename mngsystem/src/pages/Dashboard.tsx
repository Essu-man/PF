
import { Package, Wheat } from 'lucide-react';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import Header from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import styles from '../pages/styles/Dashboard.module.css';

const Dashboard: React.FC = () => {
  // Egg Size Production Data
  const eggSizeData = [
    { size: 'Small', count: 50, color: '#2ecc71' },
    { size: 'Medium', count: 200, color: '#2ecc71' },
    { size: 'Large', count: 350, color: '#2ecc71' },
    { size: 'Extra Large', count: 250, color: '#2ecc71' },
    { size: 'Jumbo', count: 100, color: '#2ecc71' }
  ];

  // Animal Mortality Data
  const mortalityData = [
    { name: 'Healthy', value: 650, color: '#2ecc71'},
    { name: 'Sick', value: 150, color: '#f39c12' },
    { name: 'Dead', value: 100, color: '#e74c3c'}
  ];

  const feedInventoryData = [
    { type: 'Layer Feed', current: 500, low: 200, icon: Wheat },
    { type: 'Starter Feed', current: 350, low: 150, icon: Package },
  ];

  // Updated medication data with status colors
  const medicationData = [
    {
      medication: 'Newcastle Vaccine',
      type: 'Viral Prevention',
      lastAdministered: '2024-02-15',
      nextDue: '2024-04-15',
      dosage: '0.5 mL',
      status: 'Upcoming',
      statusColor: '#22c55e'
    },
    {
      medication: 'Coccidiosis Treatment',
      type: 'Parasitic Control',
      lastAdministered: '2024-01-20',
      nextDue: '2024-05-20',
      dosage: '1 mL',
      status: 'Pending',
      statusColor: '#f59e0b'
    },
    {
      medication: 'Deworming',
      type: 'Parasite Prevention',
      lastAdministered: '2024-03-01',
      nextDue: '2024-06-01',
      dosage: '2 mL',
      status: 'Current',
      statusColor: '#3b82f6'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">

      <div className="flex-1 flex flex-col overflow-hidden pl-64">
        {/* Optional: Add Header component here if needed */}
         <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className={`space-y-6 ${styles.dashboardContainer}`}>
            <h1 className={styles.pageTitle}>Dashboard</h1>

            {/* Egg Production Charts */}
            <div className={styles.chartContainer}>
              <Card className={styles.halfChart}>
                <CardHeader>
                  <CardTitle className={`text-center ${styles.chartTitle}`}>Egg Size Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={eggSizeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="size" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#8884d8"
                        radius={[10, 10, 0, 0]}
                      >
                        {eggSizeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className={styles.halfChart}>
                <CardHeader>
                  <CardTitle className={`text-center ${styles.chartTitle} mb-8`}>Animal Mortality</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={mortalityData}
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={{
                          strokeWidth: 1,
                          stroke: '#555555'
                        }}
                      >
                        {mortalityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        position={{ x: 250, y: 150 }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
                                <p className="font-semibold text-gray-800" style={{ color: data.color }}>
                                  {data.name}
                                </p>
                                <p className="text-gray-600">Count: {data.value}</p>
                                <p className="text-gray-600">
                                  Percentage: {((data.value / mortalityData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}%
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend
                        verticalAlign="middle"
                        align="right"
                        layout="vertical"
                        wrapperStyle={{
                          paddingLeft: "20px"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>



            {/* Remove the feedInventoryData mapping section */}

            {/* Updated Medication Tracking Card */}
            <Card className={styles.medicationCard}>
              <CardHeader>
                <CardTitle className={styles.medicationTitle}>
                  Medication Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.medicationTableWrapper}>
                  <table className={styles.medicationTable}>
                    <thead>
                      <tr>
                        <th>Medication</th>
                        <th>Type</th>
                        <th>Last Administered</th>
                        <th>Next Due</th>
                        <th>Dosage</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicationData.map((med) => (
                        <tr key={med.medication}>
                          <td className={styles.medicationName}>{med.medication}</td>
                          <td>{med.type}</td>
                          <td>{med.lastAdministered}</td>
                          <td className={styles.nextDue}>{med.nextDue}</td>
                          <td>{med.dosage}</td>
                          <td>
                            <span
                              className={styles.statusBadge}
                              style={{ backgroundColor: `${med.statusColor}15`, color: med.statusColor }}
                            >
                              {med.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;