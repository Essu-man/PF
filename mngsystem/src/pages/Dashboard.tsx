import { AlertTriangle, Package, Wheat } from 'lucide-react';
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
  const eggProductionData = [
    { date: '2024-03-01', eggs: 450, target: 500 },
    { date: '2024-03-02', eggs: 475, target: 500 },
    { date: '2024-03-03', eggs: 520, target: 500 },
  ];

  const feedInventoryData = [
    { type: 'Layer Feed', current: 500, low: 200, icon: Wheat },
    { type: 'Starter Feed', current: 350, low: 150, icon: Package },
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
      <h1 className={styles.pageTitle}>Farm Dashboard</h1>

      {/* Egg Production Card */}
      <Card className={styles.chartContainer}>
        <CardHeader>
          <CardTitle className={styles.cardTitle}>Egg Production Trends</CardTitle>
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

      {/* Feed Inventory Cards */}
      <div className={styles.inventoryCardContainer}>
        {feedInventoryData.map((feed) => {
          const Icon = feed.icon;
          const isLowStock = feed.current < feed.low;

          return (
            <Card
              key={feed.type}
              className={`${styles.inventoryItem} ${isLowStock ? styles.lowStockCard : ''}`}
              data-status={isLowStock ? 'low' : 'sufficient'}
            >
              <CardHeader className={styles.inventoryCardHeader}>
                <div className={styles.inventoryIconContainer}>
                  <Icon
                    className={`${styles.inventoryIcon} ${isLowStock ? styles.lowStockIcon : ''}`}
                    size={40}
                  />
                </div>
                <CardTitle className={styles.inventoryCardTitle}>{feed.type}</CardTitle>
              </CardHeader>
              <CardContent className={styles.inventoryCardContent}>
                <div className={styles.stockInfo}>
                  <p className={styles.stockQuantity}>Current Stock: {feed.current} kg</p>
                  {isLowStock && (
                    <div className={styles.lowStockAlert}>
                      <AlertTriangle className={styles.alertIcon} size={20} />
                      <span className={styles.lowStockPulse}>Low Stock Alert!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Medication Tracking Card */}
      <Card>
        <CardHeader>
          <CardTitle className={styles.cardTitle}>Medication Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <table className={`w-full ${styles.medicationTable}`}>
            <thead>
              <tr>
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