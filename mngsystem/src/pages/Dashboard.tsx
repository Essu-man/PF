
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
  const eggSizeData = [
    { size: 'Small', count: 50, color: '#2ecc71' },
    { size: 'Medium', count: 200, color: '#2ecc71' },
    { size: 'Large', count: 350, color: '#2ecc71' },
    { size: 'Extra Large', count: 250, color: '#2ecc71' },
    { size: 'Jumbo', count: 100, color: '#2ecc71' }
  ];

  const mortalityData = [
    { name: 'Healthy', value: 650, color: '#2ecc71'},
    { name: 'Sick', value: 150, color: '#f39c12' },
    { name: 'Dead', value: 100, color: '#e74c3c'}
  ];

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
    <>
      <Header />
      <div className={styles.dashboardContainer}>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>
        <div className={styles.chartContainer}>
          <Card className={styles.halfChart}>
            <CardHeader>
              <CardTitle className={styles.chartTitle}>Egg Size Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={eggSizeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="size" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" radius={[10, 10, 0, 0]}>
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
              <CardTitle className={styles.chartTitle}>Animal Mortality</CardTitle>
            </CardHeader>
            <CardContent>
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
                  >
                    {mortalityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className={styles.medicationCard}>
          <CardHeader>
            <CardTitle className={styles.medicationTitle}>Medication Schedule</CardTitle>
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
    </>
  );
};

export default Dashboard;