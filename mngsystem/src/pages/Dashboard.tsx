import { AlertTriangle, Package, Wheat } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import styles from '../styles/Dashboard.module.css';

const Dashboard: React.FC = () => {
  // Egg Size Production Data
  const eggSizeData = [
    { size: 'Small', count: 50, color: '#3498db' },
    { size: 'Medium', count: 200, color: '#2ecc71' },
    { size: 'Large', count: 350, color: '#f39c12' },
    { size: 'Extra Large', count: 250, color: '#e74c3c' },
    { size: 'Jumbo', count: 100, color: '#9b59b6' }
  ];

  // Animal Mortality Data
  const mortalityData = [
    { name: 'Chickens', value: 5, color: '#e74c3c' },
    { name: 'Healthy', value: 495, color: '#2ecc71' }
  ];

  const feedInventoryData = [
    { type: 'Layer Feed', current: 500, low: 200, icon: Wheat },
    { type: 'Starter Feed', current: 350, low: 150, icon: Package },
  ];

  // Expanded Medication Data
  const medicationData = [
    {
      medication: 'Newcastle Vaccine',
      type: 'Viral Prevention',
      lastAdministered: '2024-02-15',
      nextDue: '2024-04-15',
      dosage: '0.5 mL',
      status: 'Upcoming'
    },
    {
      medication: 'Coccidiosis Treatment',
      type: 'Parasitic Control',
      lastAdministered: '2024-01-20',
      nextDue: '2024-05-20',
      dosage: '1 mL',
      status: 'Pending'
    },
    {
      medication: 'Deworming',
      type: 'Parasite Prevention',
      lastAdministered: '2024-03-01',
      nextDue: '2024-06-01',
      dosage: '2 mL',
      status: 'Current'
    }
  ];

  return (
    <div className={`p-6 space-y-6 ${styles.dashboardContainer}`}>
      <h1 className={styles.pageTitle}>Poultry Farm</h1>

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
                <Bar dataKey="count" fill="#8884d8">
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
            <CardTitle className={`text-center ${styles.chartTitle}`}>Animal Mortality</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={mortalityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mortalityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

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
          <CardTitle className={`text-center ${styles.medicationTitle}`}>Medication Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <table className={`w-full ${styles.medicationTable}`}>
            <thead>
              <tr>
                <th className="p-2 text-center">Medication</th>
                <th className="p-2 text-center">Type</th>
                <th className="p-2 text-center">Last Administered</th>
                <th className="p-2 text-center">Next Due</th>
                <th className="p-2 text-center">Dosage</th>
                <th className="p-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {medicationData.map((med) => (
                <tr
                  key={med.medication}
                  className={`border-b ${
                    med.status === 'Upcoming' ? styles.upcomingMedication :
                    med.status === 'Current' ? styles.currentMedication :
                    styles.pendingMedication
                  }`}
                >
                  <td className="p-2 text-center">{med.medication}</td>
                  <td className="p-2 text-center">{med.type}</td>
                  <td className="p-2 text-center">{med.lastAdministered}</td>
                  <td className="p-2 text-center">{med.nextDue}</td>
                  <td className="p-2 text-center">{med.dosage}</td>
                  <td className="p-2 text-center">
                    <span className={`${styles.medicationStatusBadge} ${
                      med.status === 'Upcoming' ? styles.upcomingBadge :
                      med.status === 'Current' ? styles.currentBadge :
                      styles.pendingBadge
                    }`}>
                      {med.status}
                    </span>
                  </td>
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
